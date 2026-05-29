const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const Profile = require('../models/Profile');
const User = require('../models/User');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const { ensureSuggestedQuestions, getFallbackQuestions } = require('../services/suggestedQuestions');

async function scrapeLink(url) {
  try {
    if (!url || url.trim() === '') return '';

    if (url.includes('github.com/')) {
      const username = url.split('github.com/')[1]?.split('/')[0];
      if (username) {
        const [userRes, reposRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`, { timeout: 5000 }),
          axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`, { timeout: 5000 }),
        ]);
        const u = userRes.data;
        const repos = reposRes.data.map(r =>
          `${r.name} (${r.language || 'N/A'}, ⭐${r.stargazers_count}): ${r.description || ''}`
        ).join('\n');
        return `GitHub: ${u.name}, Bio: ${u.bio || ''}, Takipçi: ${u.followers}, Repo: ${u.public_repos}\nPopüler Repolar:\n${repos}`;
      }
    }

    const res = await axios.get(url, {
      timeout: 5000,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const titleMatch = res.data.match(/<title>(.*?)<\/title>/i);
    return titleMatch ? `Sayfa başlığı: ${titleMatch[1]}` : '';
  } catch {
    return '';
  }
}

// GET /api/chat/:userId/suggested-questions — CV/profille uyumlu öneri sorular
router.get('/:userId/suggested-questions', async (req, res) => {
  try {
    const [profile, user] = await Promise.all([
      Profile.findOne({ user: req.params.userId }),
      User.findById(req.params.userId).select('name'),
    ]);

    if (!profile || !user) {
      return res.status(404).json({ error: 'Profil bulunamadı.' });
    }

    const { questions, cached } = await ensureSuggestedQuestions(profile, user.name);

    res.json({
      success: true,
      questions,
      hasCV: Boolean(profile.cvText?.trim()),
      cached,
    });
  } catch (error) {
    console.error('Öneri soru hatası:', error.message);
    const profile = await Profile.findOne({ user: req.params.userId });
    const user = await User.findById(req.params.userId).select('name');
    const questions = getFallbackQuestions(profile || {}, user?.name || 'Aday');
    res.json({ success: true, questions, hasCV: false, cached: false });
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'Mesaj gerekli.' });
    }

    const [profile, user] = await Promise.all([
      Profile.findOne({ user: req.params.userId }),
      User.findById(req.params.userId).select('name'),
    ]);

    if (!profile || !user) {
      return res.status(404).json({ error: 'Profil bulunamadı.' });
    }

    // Link içeriği: varsa DB'den al, yoksa scrape et ve kaydet
    let linkContext = profile.linkContext || '';

    if (!linkContext) {
      console.log('🔍 Linkler scrape ediliyor...');
      const linkContents = await Promise.all([
        scrapeLink(profile.links?.github),
        scrapeLink(profile.links?.linkedin),
        scrapeLink(profile.links?.artstation || profile.links?.artbook),
        scrapeLink(profile.links?.website),
      ]);
      linkContext = linkContents.filter(Boolean).join('\n\n');

      // DB'ye kaydet — bir daha scrape etme
      await Profile.findOneAndUpdate(
        { user: req.params.userId },
        { linkContext }
      );
      console.log('✅ Link içeriği kaydedildi.');
    } else {
      console.log('⚡ Link içeriği DB\'den alındı.');
    }

    const systemPrompt = `
Sen "${user.name}" adlı yazılım geliştiricinin AI asistanısın.
Sana bu kişinin CV'si ve portfolyo bilgileri verildi.
Seni ziyaret eden kişiler (işverenler, işe alım uzmanları vb.) bu kişi hakkında soru soracak.

GÖREVIN:
- Adayın yeteneklerini, deneyimini ve kapasitesini dürüstçe değerlendir
- "Bu kişi X görevini yapabilir mi?" gibi sorulara net cevap ver
- Güçlü yönleri ve gelişim alanlarını belirt
- Gerekirse "Bu konuyu öğrenmesi gerekir" gibi dürüst geri bildirim ver
- Türkçe konuş, profesyonel ama sıcak bir ton kullan

CV BİLGİLERİ:
${profile.cvText || 'CV henüz yüklenmemiş.'}

PORTFOLYO / LİNK BİLGİLERİ:
${linkContext || 'Portfolyo linki eklenmemiş.'}

BİYOGRAFİ:
${profile.bio || 'Biyografi eklenmemiş.'}

ÖNEMLİ: Sadece bu kişi hakkında konuş. Konu dışına çıkma.
    `.trim();

    // İlk model mesajlarını filtrele — Gemini user ile başlamalı
    const filteredMessages = [...messages];
    while (filteredMessages.length > 0 && filteredMessages[0].role === 'model') {
      filteredMessages.shift();
    }

    const lastMessage = filteredMessages[filteredMessages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return res.status(400).json({ error: 'Geçerli kullanıcı mesajı bulunamadı.' });
    }

    const history = filteredMessages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash',
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.text);
    const reply = result.response.text();

    await Profile.findOneAndUpdate(
      { user: req.params.userId },
      { $inc: { chatCount: 1 } }
    );

    res.json({ success: true, reply });
  } catch (error) {
    console.error('Chat hatası:', error.message);
    res.status(500).json({ error: 'Yanıt alınamadı.' });
  }
});

module.exports = router;