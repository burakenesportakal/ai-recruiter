const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use('/uploads', express.static(uploadDir));

// 1. MIDDLEWARE'LER (sıra önemli)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// 2. MONGODB BAĞLANTISI
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🚀 MongoDB veritabanına başarıyla bağlanıldı!"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// 3. ROUTE'LAR
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/candidateRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ message: "AI Recruiter Backend çalışıyor!" });
});

// 4. SUNUCUYU BAŞLAT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
