const Phone = require('../models/Phone');
const { asyncHandler, createError } = require('../middleware/errorHandler');

// @desc    Get all phones
// @route   GET /api/phones
// @access  Public
const getPhones = asyncHandler(async (req, res, next) => {
  const {
    page = 1,
    limit = 20,
    brand,
    minPrice,
    maxPrice,
    ram,
    storage,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search
  } = req.query;

  // Build filter object
  const filter = { status: 'active' };

  if (brand) filter.brand = brand;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseInt(minPrice);
    if (maxPrice) filter.price.$lte = parseInt(maxPrice);
  }
  if (ram) filter['specifications.performance.ram'] = ram;
  if (storage) filter['specifications.performance.storage'] = storage;
  if (search) {
    filter.$text = { $search: search };
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const phones = await Phone.find(filter)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Phone.countDocuments(filter);

  res.json({
    success: true,
    data: {
      phones,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get single phone
// @route   GET /api/phones/:id
// @access  Public
const getPhone = asyncHandler(async (req, res, next) => {
  const phone = await Phone.findById(req.params.id);

  if (!phone) {
    return next(createError('Phone not found', 404));
  }

  // Get related phones
  const relatedPhones = await Phone.find({
    brand: phone.brand,
    _id: { $ne: phone._id },
    status: 'active'
  }).limit(4);

  res.json({
    success: true,
    data: {
      phone,
      relatedPhones
    }
  });
});

// @desc    Create new phone
// @route   POST /api/phones
// @access  Private/Admin
const createPhone = asyncHandler(async (req, res, next) => {
  const phone = await Phone.create(req.body);

  res.status(201).json({
    success: true,
    data: phone
  });
});

// @desc    Update phone
// @route   PUT /api/phones/:id
// @access  Private/Admin
const updatePhone = asyncHandler(async (req, res, next) => {
  const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!phone) {
    return next(createError('Phone not found', 404));
  }

  res.json({
    success: true,
    data: phone
  });
});

// @desc    Delete phone
// @route   DELETE /api/phones/:id
// @access  Private/Admin
const deletePhone = asyncHandler(async (req, res, next) => {
  const phone = await Phone.findByIdAndDelete(req.params.id);

  if (!phone) {
    return next(createError('Phone not found', 404));
  }

  res.json({
    success: true,
    message: 'Phone deleted successfully'
  });
});

// @desc    Compare phones
// @route   GET /api/phones/compare
// @access  Public
const comparePhones = asyncHandler(async (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    return next(createError('Phone IDs are required', 400));
  }

  const phoneIds = ids.split(',');
  const phones = await Phone.find({
    _id: { $in: phoneIds },
    status: 'active'
  });

  res.json({
    success: true,
    data: phones
  });
});

// @desc    Search phones
// @route   GET /api/phones/search
// @access  Public
const searchPhones = asyncHandler(async (req, res, next) => {
  const { q, category, filters } = req.query;

  if (!q) {
    return next(createError('Search query is required', 400));
  }

  const searchFilter = {
    $text: { $search: q },
    status: 'active'
  };

  if (category) {
    searchFilter.category = category;
  }

  // Apply additional filters if provided
  if (filters) {
    const parsedFilters = JSON.parse(filters);
    Object.assign(searchFilter, parsedFilters);
  }

  const phones = await Phone.find(searchFilter)
    .sort({ score: { $meta: 'textScore' } })
    .limit(20);

  res.json({
    success: true,
    data: phones
  });
});

module.exports = {
  getPhones,
  getPhone,
  createPhone,
  updatePhone,
  deletePhone,
  comparePhones,
  searchPhones
};
