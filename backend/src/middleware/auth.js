const jwt = require('jsonwebtoken');
const { createError } = require('./errorHandler');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      return next(createError('Not authorized to access this route', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(createError('User not found', 401));
      }
      
      req.user = user;
      next();
    } catch (err) {
      return next(createError('Not authorized to access this route', 401));
    }
  } catch (err) {
    return next(createError('Not authorized to access this route', 401));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError('Not authorized to access this route', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(createError(`User role ${req.user.role} is not authorized to access this route`, 403));
    }

    next();
  };
};

module.exports = {
  protect,
  authorize
};
