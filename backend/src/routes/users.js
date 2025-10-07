const express = require('express');
const { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  updateProfile
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// User routes
router.get('/profile', updateProfile);
router.put('/profile', updateProfile);

// Admin routes
router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
