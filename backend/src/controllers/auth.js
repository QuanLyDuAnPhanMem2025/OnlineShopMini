const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const { asyncHandler, createError } = require('../middleware/errorHandler');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName, phone } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(createError('User already exists', 400));
  }

  // Create user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    phone
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(createError('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(createError('Invalid credentials', 401));
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses
      }
    }
  });
});

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = asyncHandler(async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(createError('Token is required', 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = generateToken(decoded.id);

    res.json({
      success: true,
      data: {
        token: newToken
      }
    });
  } catch (error) {
    return next(createError('Invalid token', 401));
  }
});

// @desc    Google OAuth login
// @route   GET /api/auth/google
// @access  Public
const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = asyncHandler(async (req, res, next) => {
  passport.authenticate('google', async (err, user) => {
    if (err) {
      console.error('Google authentication error:', err);
      return next(createError('Google authentication failed', 401));
    }

    if (!user) {
      console.error('No user returned from Google authentication');
      return next(createError('Google authentication failed', 401));
    }

    const token = generateToken(user._id);

    // Redirect to frontend with token
    const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
    // Get the first origin if multiple are specified
    const frontendUrl = corsOrigin.split(',')[0].trim();
    res.redirect(`${frontendUrl}/auth/success?token=${token}`);
  })(req, res, next);
});

// @desc    Google OAuth success handler
// @route   GET /api/auth/google/success
// @access  Public
const googleSuccess = asyncHandler(async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return next(createError('No token provided', 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(createError('User not found', 404));
    }

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    return next(createError('Invalid token', 401));
  }
});

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  googleLogin,
  googleCallback,
  googleSuccess
};
