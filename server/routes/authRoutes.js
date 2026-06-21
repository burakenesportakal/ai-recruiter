const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(statusCode).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};

router.post('/register', async (req, res) => {
    console.log('🔥 Register route hit', req.body);
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Tüm alanları doldurun.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Bu email zaten kullanımda.' });
        }

        const user = await User.create({ name, email, password });
        console.log(`✅ Yeni kullanıcı: ${user.email}`);

        sendTokenResponse(user, 201, res);
    } catch (error) {
        console.error('Register hatası DETAY:', error);
        res.status(500).json({ error: 'Kayıt sırasında hata oluştu.', detay: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email ve şifre zorunludur.' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Email veya şifre hatalı.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Email veya şifre hatalı.' });
        }

        console.log(`✅ Giriş yapıldı: ${user.email}`);
        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error('Login hatası:', error.message);
        res.status(500).json({ error: 'Giriş sırasında hata oluştu.' });
    }
});

router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ success: true, message: 'Çıkış yapıldı.' });
});

router.get('/me', protect, (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        },
    });
});

module.exports = router;