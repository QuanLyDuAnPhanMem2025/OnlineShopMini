const phoneService = require('../services/phoneService');
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

  const result = await phoneService.getPhones({
    page: parseInt(page),
    limit: parseInt(limit),
    brand,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    ram,
    storage,
    sortBy,
    sortOrder,
    search
  });

  res.json({
    success: true,
    data: result
  });
});

// @desc    Get single phone
// @route   GET /api/phones/:id
// @access  Public
const getPhone = asyncHandler(async (req, res, next) => {
  try {
    const result = await phoneService.getPhone(req.params.id);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    return next(createError(error.message, 404));
  }
});

// @desc    Create new phone
// @route   POST /api/phones
// @access  Private/Admin
const createPhone = asyncHandler(async (req, res, next) => {
  try {
    const phone = await phoneService.createPhone(req.body);

    res.status(201).json({
      success: true,
      data: phone
    });
  } catch (error) {
    return next(createError(error.message, 400));
  }
});

// @desc    Update phone
// @route   PUT /api/phones/:id
// @access  Private/Admin
const updatePhone = asyncHandler(async (req, res, next) => {
  try {
    const phone = await phoneService.updatePhone(req.params.id, req.body);
    
    res.json({
      success: true,
      data: phone
    });
  } catch (error) {
    return next(createError(error.message, 404));
  }
});

// @desc    Delete phone
// @route   DELETE /api/phones/:id
// @access  Private/Admin
const deletePhone = asyncHandler(async (req, res, next) => {
  try {
    await phoneService.deletePhone(req.params.id);
    
    res.json({
      success: true,
      message: 'Phone deleted successfully'
    });
  } catch (error) {
    return next(createError(error.message, 404));
  }
});

// @desc    Compare phones
// @route   GET /api/phones/compare
// @access  Public
const comparePhones = asyncHandler(async (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    return next(createError('Phone IDs are required', 400));
  }

  try {
    const phoneIds = ids.split(',');
    const phones = await phoneService.comparePhones(phoneIds);

    res.json({
      success: true,
      data: phones
    });
  } catch (error) {
    return next(createError(error.message, 400));
  }
});

// @desc    Search phones
// @route   GET /api/phones/search
// @access  Public
const searchPhones = asyncHandler(async (req, res, next) => {
  const { q, category, filters } = req.query;

  if (!q) {
    return next(createError('Search query is required', 400));
  }

  let parsedFilters = {};
  if (filters) {
    try {
      parsedFilters = JSON.parse(filters);
    } catch (error) {
      return next(createError('Invalid filters format', 400));
    }
  }

  if (category) {
    parsedFilters.category = category;
  }

  try {
    const phones = await phoneService.searchPhones(q, parsedFilters);

    res.json({
      success: true,
      data: phones
    });
  } catch (error) {
    return next(createError(error.message, 400));
  }
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
