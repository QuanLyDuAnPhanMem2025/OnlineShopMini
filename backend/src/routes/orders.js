const express = require('express');
const { 
  getOrders, 
  getOrder, 
  createOrder, 
  updateOrderStatus,
  getUserOrders
} = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// User routes
router.get('/my-orders', getUserOrders);
router.post('/', createOrder);
router.get('/:id', getOrder);

// Admin routes
router.get('/', authorize('admin'), getOrders);
router.put('/:id/status', authorize('admin'), updateOrderStatus);

module.exports = router;
