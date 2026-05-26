const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Sadece PDF dosyaları kabul edilir.'));
    }
    cb(null, true);
  }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// PDF'den metin çıkaran yardımcı fonksiyon
async function extractTextFromPDF(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
}

router.post('/upload-cv', upload.single('cvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Lütfen bir PDF dosyası yükleyin." });
    }

    console.log("📄 Dosya alındı:", req.file.originalname);

    // 1. PDF → Metin
    const extractedText = await extractTextFromPDF(req.file.buffer);
    console.log("✅ Metin çıkarıldı, uzunluk:", extractedText.length);

    if (!extractedText || extractedText.length === 0) {
      return res.status(400).json({
        error: "PDF içeriği okunamadı. Taranmış (görüntü) PDF yerine metin tabanlı PDF yükleyin."
      });
    }

    // 2. Gemini'ye Gönder
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      Sen profesyonel bir Teknik İşe Alım Uzmanısın (IT Recruiter). 
      Aşağıda bir adayın özgeçmişinden/portfolyosundan çıkarılmış metin bulunuyor.
      Lütfen bu adayı incele ve bana şu formatta kısa bir geri bildirim ver:
      1. Adayın en güçlü teknik yetenekleri.
      2. Adayın uygun olduğu potansiyel pozisyonlar.
      3. Aday hakkındaki genel profesyonel değerlendirmen.
      
      Adayın Bilgileri:
      ${extractedText}
    `;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();
    console.log("Gemini yanıtı alındı.");

    // 3. Frontend'e Gönder
    res.json({
      message: "CV başarıyla analiz edildi!",
      text: extractedText,
      aiSummary: aiResponse
    });

  } catch (error) {
    console.error("❌ Hata:", error.message);
    res.status(500).json({ error: `Hata: ${error.message}` });
  }
});

module.exports = router;