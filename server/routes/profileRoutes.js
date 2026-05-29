const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const { protect } = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { generateSuggestedQuestions, profileContextHash } = require('../services/suggestedQuestions');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cv_${req.user._id}_${Date.now()}${ext}`);
  },
});

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `avatar_${req.user._id}_${Date.now()}${ext}`);
  },
});

const uploadCV = multer({
  storage: cvStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Sadece PDF kabul edilir.'));
    }
    cb(null, true);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Sadece JPEG, PNG, WebP veya GIF kabul edilir.'));
    }
    cb(null, true);
  },
});

function normalizeLinks(links) {
  if (!links) return { github: '', linkedin: '', artstation: '', website: '' };
  const raw = links.toObject ? links.toObject() : { ...links };
  return {
    github: raw.github || '',
    linkedin: raw.linkedin || '',
    artstation: raw.artstation || raw.artbook || '',
    website: raw.website || '',
  };
}

function toPublicProfile(profile) {
  const links = normalizeLinks(profile.links);
  return {
    title: profile.title,
    bio: profile.bio,
    avatarPath: profile.avatarPath ? `/uploads/${path.basename(profile.avatarPath)}` : '',
    links,
    skills: profile.skills,
    experience: profile.experience,
    education: profile.education,
    projects: profile.projects,
    hasCV: !!profile.cvText,
    profileViews: profile.profileViews,
    chatCount: profile.chatCount,
  };
}

// PDF'den metin çıkar
async function extractTextFromPDF(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ') + '\n';
  }
  return text.trim();
}

// GET /api/profile/me — kendi profilini getir
router.get('/me', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = await Profile.create({ user: req.user._id });
    }

    const profileObj = profile.toObject();
    profileObj.links = normalizeLinks(profile.links);
    if (profileObj.avatarPath) {
      profileObj.avatarPath = `/uploads/${path.basename(profileObj.avatarPath)}`;
    }

    res.json({ success: true, profile: profileObj });
  } catch (error) {
    console.error('Profil getirme hatası:', error.message);
    res.status(500).json({ error: 'Profil getirilemedi.' });
  }
});

// PUT /api/profile/me — profili güncelle
router.put('/me', protect, async (req, res) => {
  try {
    const {
      bio, title, github, linkedin, artstation, artbook, website,
      skills, experience, education, projects,
    } = req.body;

    const updateData = {};

    if (bio !== undefined) updateData.bio = bio;
    if (title !== undefined) updateData.title = title;

    const linkFieldsProvided = [github, linkedin, artstation, artbook, website].some(v => v !== undefined);
    if (linkFieldsProvided) {
      const existing = await Profile.findOne({ user: req.user._id });
      const current = normalizeLinks(existing?.links);
      const artstationValue = artstation !== undefined ? artstation : (artbook !== undefined ? artbook : current.artstation);
      updateData.links = {
        github: github !== undefined ? github : current.github,
        linkedin: linkedin !== undefined ? linkedin : current.linkedin,
        artstation: artstationValue,
        website: website !== undefined ? website : current.website,
      };
    }

    if (skills !== undefined) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (education !== undefined) updateData.education = education;
    if (projects !== undefined) updateData.projects = projects;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    const profileObj = profile.toObject();
    profileObj.links = normalizeLinks(profile.links);
    if (profileObj.avatarPath) {
      profileObj.avatarPath = `/uploads/${path.basename(profileObj.avatarPath)}`;
    }

    res.json({ success: true, profile: profileObj });
  } catch (error) {
    console.error('Profil güncelleme hatası:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }

    res.status(500).json({ error: 'Profil güncellenemedi.' });
  }
});

// POST /api/profile/upload-avatar — profil fotoğrafı yükle
router.post('/upload-avatar', protect, uploadAvatar.single('avatarFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Bir görsel dosyası seçin.' });
    }

    const oldProfile = await Profile.findOne({ user: req.user._id });
    if (oldProfile?.avatarPath && fs.existsSync(oldProfile.avatarPath)) {
      fs.unlinkSync(oldProfile.avatarPath);
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { avatarPath: req.file.path },
      { new: true, upsert: true }
    );

    const profileObj = profile.toObject();
    profileObj.links = normalizeLinks(profile.links);
    profileObj.avatarPath = `/uploads/${path.basename(req.file.path)}`;

    res.json({ success: true, message: 'Profil fotoğrafı yüklendi.', profile: profileObj });
  } catch (error) {
    console.error('Avatar yükleme hatası:', error.message);
    res.status(500).json({ error: error.message || 'Profil fotoğrafı yüklenemedi.' });
  }
});

// POST /api/profile/upload-cv — CV yükle
router.post('/upload-cv', protect, uploadCV.single('cvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF dosyası seçin.' });
    }

    const cvText = await extractTextFromPDF(req.file.path);

    if (!cvText || cvText.length === 0) {
      return res.status(400).json({ error: 'PDF okunamadı. Metin tabanlı PDF yükleyin.' });
    }

    const oldProfile = await Profile.findOne({ user: req.user._id });
    if (oldProfile?.cvPath && fs.existsSync(oldProfile.cvPath)) {
      fs.unlinkSync(oldProfile.cvPath);
    }

    let profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { cvPath: req.file.path, cvText },
      { new: true, upsert: true }
    );

    const user = await User.findById(req.user._id).select('name');
    try {
      const questions = await generateSuggestedQuestions(profile, user?.name || 'Aday');
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          suggestedQuestions: questions,
          suggestedQuestionsHash: profileContextHash(profile),
        },
        { new: true }
      );
    } catch (err) {
      console.error('CV sonrası öneri soru üretimi:', err.message);
    }

    const profileObj = profile.toObject();
    profileObj.links = normalizeLinks(profile.links);
    if (profileObj.avatarPath) {
      profileObj.avatarPath = `/uploads/${path.basename(profileObj.avatarPath)}`;
    }

    console.log(`✅ CV yüklendi: ${req.user.email}`);
    res.json({ success: true, message: 'CV başarıyla yüklendi.', profile: profileObj });
  } catch (error) {
    console.error('CV yükleme hatası:', error.message);
    res.status(500).json({ error: 'CV yüklenemedi.' });
  }
});

// GET /api/profile/:userId — public profil
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    const user = await User.findById(req.params.userId).select('name email');

    if (!profile || !user) {
      return res.status(404).json({ error: 'Profil bulunamadı.' });
    }

    profile.profileViews += 1;
    await profile.save();

    res.json({
      success: true,
      user: { name: user.name, email: user.email },
      profile: toPublicProfile(profile),
    });
  } catch (error) {
    console.error('Public profil hatası:', error.message);
    res.status(500).json({ error: 'Profil getirilemedi.' });
  }
});

module.exports = router;
