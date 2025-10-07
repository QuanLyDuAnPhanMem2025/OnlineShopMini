const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { asyncHandler, createError } = require('../middleware/errorHandler');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
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

module.exports = {
  register,
  login,
  getMe,
  refreshToken
};
