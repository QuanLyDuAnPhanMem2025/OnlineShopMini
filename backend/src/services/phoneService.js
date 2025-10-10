const Phone = require('../models/Phone');

// MongoDB service functions
const phoneService = {
  // Get all phones with filters and pagination
  getPhones: async (params = {}) => {
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
    } = params;

    // Build filter object
    const filter = { status: 'active' };
    
    if (brand) {
      filter.brand = brand;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    
    if (ram) {
      filter['specifications.performance.ram'] = ram;
    }
    
    if (storage) {
      filter['specifications.performance.storage'] = storage;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    let sort = {};
      switch (sortBy) {
        case 'price':
        sort.price = sortOrder === 'asc' ? 1 : -1;
          break;
        case 'rating':
        sort.averageRating = sortOrder === 'asc' ? 1 : -1;
          break;
        case 'name':
        sort.name = sortOrder === 'asc' ? 1 : -1;
          break;
        case 'createdAt':
        default:
        sort.createdAt = sortOrder === 'asc' ? 1 : -1;
          break;
      }

    try {
      const phones = await Phone.find(filter)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      const total = await Phone.countDocuments(filter);
      const totalPages = Math.ceil(total / limit);

      return {
        phones,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch phones: ${error.message}`);
    }
  },

  // Get single phone by ID
  getPhone: async (id) => {
    try {
      const phone = await Phone.findById(id).lean();
      
    if (!phone) {
      throw new Error('Phone not found');
    }

    // Get related phones (same brand first, then same category)
      let relatedPhones = await Phone.find({
        brand: phone.brand,
        _id: { $ne: phone._id },
        status: 'active'
      }).limit(4).lean();

      // If not enough phones from same brand, get from same category
      if (relatedPhones.length < 4) {
        const additionalPhones = await Phone.find({
          subcategory: phone.subcategory,
          _id: { $ne: phone._id, $nin: relatedPhones.map(p => p._id) },
          status: 'active'
        }).limit(4 - relatedPhones.length).lean();
        
        relatedPhones = [...relatedPhones, ...additionalPhones];
      }

    return {
      phone,
      relatedPhones
    };
    } catch (error) {
      throw new Error(`Failed to fetch phone: ${error.message}`);
    }
  },

  // Create new phone
  createPhone: async (phoneData) => {
    try {
      const phone = new Phone(phoneData);
      await phone.save();
      return phone;
    } catch (error) {
      throw new Error(`Failed to create phone: ${error.message}`);
    }
  },

  // Update phone
  updatePhone: async (id, updateData) => {
    try {
      const phone = await Phone.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!phone) {
      throw new Error('Phone not found');
    }

      return phone;
    } catch (error) {
      throw new Error(`Failed to update phone: ${error.message}`);
    }
  },

  // Delete phone
  deletePhone: async (id) => {
    try {
      const phone = await Phone.findByIdAndDelete(id);
      
      if (!phone) {
      throw new Error('Phone not found');
    }

    return true;
    } catch (error) {
      throw new Error(`Failed to delete phone: ${error.message}`);
    }
  },

  // Compare phones
  comparePhones: async (ids) => {
    try {
      const phones = await Phone.find({
        _id: { $in: ids },
        status: 'active'
      }).lean();
      
    return phones;
    } catch (error) {
      throw new Error(`Failed to compare phones: ${error.message}`);
    }
  },

  // Search phones
  searchPhones: async (query, filters = {}) => {
    try {
    const searchFilter = {
      $text: { $search: query },
      status: 'active',
      ...filters
    };

      const phones = await Phone.find(searchFilter)
        .sort({ score: { $meta: 'textScore' } })
        .limit(20)
        .lean();

      return phones;
    } catch (error) {
      // Fallback to regex search if text index is not available
      try {
        const fallbackFilter = {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { brand: { $regex: query, $options: 'i' } }
          ],
          status: 'active',
          ...filters
        };

        const phones = await Phone.find(fallbackFilter)
          .limit(20)
          .lean();

        return phones;
      } catch (fallbackError) {
        throw new Error(`Failed to search phones: ${fallbackError.message}`);
      }
    }
  }
};

module.exports = phoneService;