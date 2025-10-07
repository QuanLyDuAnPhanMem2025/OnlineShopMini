const express = require('express');
const { 
  getPhones, 
  getPhone, 
  createPhone, 
  updatePhone, 
  deletePhone,
  comparePhones,
  searchPhones
} = require('../controllers/phones');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getPhones);
router.get('/search', searchPhones);
router.get('/compare', comparePhones);
router.get('/:id', getPhone);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createPhone);
router.put('/:id', protect, authorize('admin'), updatePhone);
router.delete('/:id', protect, authorize('admin'), deletePhone);

module.exports = router;
