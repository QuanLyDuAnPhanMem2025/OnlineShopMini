const { asyncHandler, createError } = require('../middleware/errorHandler');
const Order = require('../models/Order');
const Phone = require('../models/Phone');

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;
  const skip = (page - 1) * limit;

  let filter = {};
  if (status) {
    filter.orderStatus = status;
  }

  const orders = await Order.find(filter)
    .populate('user', 'firstName lastName email')
    .populate('items.phone', 'name brand')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(filter);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'firstName lastName email')
    .populate('items.phone', 'name brand specifications');

  if (!order) {
    return next(createError('Order not found', 404));
  }

  // Check if user owns this order or is admin
  if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(createError('Not authorized to access this order', 403));
  }

  res.json({
    success: true,
    data: { order }
  });
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res, next) => {
  const { items, shippingAddress, paymentMethod, notes } = req.body;

  if (!items || items.length === 0) {
    return next(createError('Order must have at least one item', 400));
  }

  // Validate and calculate totals
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const phone = await Phone.findById(item.phoneId);
    if (!phone) {
      return next(createError(`Phone with ID ${item.phoneId} not found`, 404));
    }

    if (phone.stock < item.quantity) {
      return next(createError(`Insufficient stock for ${phone.name}`, 400));
    }

    const itemTotal = phone.currentPrice * item.quantity;
    subtotal += itemTotal;

    orderItems.push({
      phone: phone._id,
      name: phone.name,
      price: phone.currentPrice,
      quantity: item.quantity,
      image: phone.thumbnail
    });
  }

  const shippingFee = subtotal >= 500000 ? 0 : 30000; // Free shipping over 500k
  const total = subtotal + shippingFee;

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingFee,
    total,
    notes
  });

  // Update phone stock
  for (const item of items) {
    await Phone.findByIdAndUpdate(
      item.phoneId,
      { $inc: { stock: -item.quantity } }
    );
  }

  await order.populate('items.phone', 'name brand');

  res.status(201).json({
    success: true,
    data: { order }
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status, trackingNumber, cancelReason } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(createError('Order not found', 404));
  }

  order.orderStatus = status;
  
  if (status === 'shipped' && trackingNumber) {
    order.trackingNumber = trackingNumber;
  }
  
  if (status === 'delivered') {
    order.deliveredAt = new Date();
  }
  
  if (status === 'cancelled') {
    order.cancelledAt = new Date();
    order.cancelReason = cancelReason;
    
    // Restore stock
    for (const item of order.items) {
      await Phone.findByIdAndUpdate(
        item.phone,
        { $inc: { stock: item.quantity } }
      );
    }
  }

  await order.save();

  res.json({
    success: true,
    data: { order }
  });
});

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: req.user.id })
    .populate('items.phone', 'name brand thumbnail')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments({ user: req.user.id });

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getUserOrders
};
