const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Giriş yapmanız gerekiyor.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Oturum geçersiz, tekrar giriş yapın.' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Bu alana erişim yetkiniz yok.' });
  }
  next();
};

module.exports = { protect, adminOnly };