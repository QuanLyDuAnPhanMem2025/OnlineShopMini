const { asyncHandler, createError } = require('../middleware/errorHandler');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: 'Get all orders - Coming soon'
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: 'Get single order - Coming soon'
  });
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: 'Create order - Coming soon'
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: 'Update order status - Coming soon'
  });
});

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res, next) => {
  res.json({
    success: true,
    message: 'Get user orders - Coming soon'
  });
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getUserOrders
};
