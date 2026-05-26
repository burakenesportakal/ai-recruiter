const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const { protect } = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

const router = express.Router();

// CV dosyaları için upload klasörü
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cv_${req.user._id}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Sadece PDF kabul edilir.'));
    }
    cb(null, true);
  },
});

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

    // Profil yoksa otomatik oluştur
    if (!profile) {
      profile = await Profile.create({ user: req.user._id });
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Profil getirme hatası:', error.message);
    res.status(500).json({ error: 'Profil getirilemedi.' });
  }
});

// PUT /api/profile/me — profili güncelle (bio + linkler)
router.put('/me', protect, async (req, res) => {
  try {
    const { bio, github, linkedin, artbook, website } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        bio,
        links: { github, linkedin, artbook, website },
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Profil güncelleme hatası:', error.message);
    res.status(500).json({ error: 'Profil güncellenemedi.' });
  }
});

// POST /api/profile/upload-cv — CV yükle
router.post('/upload-cv', protect, upload.single('cvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF dosyası seçin.' });
    }

    // PDF'den metin çıkar
    const cvText = await extractTextFromPDF(req.file.path);

    if (!cvText || cvText.length === 0) {
      return res.status(400).json({ error: 'PDF okunamadı. Metin tabanlı PDF yükleyin.' });
    }

    // Eski CV dosyasını sil
    const oldProfile = await Profile.findOne({ user: req.user._id });
    if (oldProfile?.cvPath && fs.existsSync(oldProfile.cvPath)) {
      fs.unlinkSync(oldProfile.cvPath);
    }

    // Profili güncelle
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { cvPath: req.file.path, cvText },
      { new: true, upsert: true }
    );

    console.log(`✅ CV yüklendi: ${req.user.email}`);
    res.json({ success: true, message: 'CV başarıyla yüklendi.', profile });
  } catch (error) {
    console.error('CV yükleme hatası:', error.message);
    res.status(500).json({ error: 'CV yüklenemedi.' });
  }
});

// GET /api/profile/:userId — public profil (ziyaretçi görür)
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    const user = await User.findById(req.params.userId).select('name email');

    if (!profile || !user) {
      return res.status(404).json({ error: 'Profil bulunamadı.' });
    }

    // Ziyaret sayısını artır
    profile.profileViews += 1;
    await profile.save();

    res.json({
      success: true,
      user: { name: user.name, email: user.email },
      profile: {
        bio: profile.bio,
        links: profile.links,
        hasCV: !!profile.cvText,
        profileViews: profile.profileViews,
        chatCount: profile.chatCount,
      },
    });
  } catch (error) {
    console.error('Public profil hatası:', error.message);
    res.status(500).json({ error: 'Profil getirilemedi.' });
  }
});

module.exports = router;