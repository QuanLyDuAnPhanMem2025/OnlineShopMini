const express = require('express');
const { register, login, getMe, refreshToken, googleLogin, googleCallback, googleSuccess } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);

// Google OAuth routes
router.get('/google', googleLogin);
router.get('/google/callback', googleCallback);
router.get('/google/success', googleSuccess);

module.exports = router;
