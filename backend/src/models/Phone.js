const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please add a model'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'Please add a SKU'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please add an original price'],
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'out_of_stock'],
    default: 'active'
  },
  specifications: {
    display: {
      size: { type: String, required: true },
      resolution: { type: String, required: true },
      technology: { type: String, required: true },
      refreshRate: { type: String }
    },
    camera: {
      rear: {
        main: { type: String, required: true },
        ultraWide: String,
        telephoto: String,
        features: [String]
      },
      front: { type: String, required: true },
      video: { type: String, required: true }
    },
    performance: {
      chipset: { type: String, required: true },
      ram: { type: String, required: true },
      storage: { type: String, required: true },
      os: { type: String, required: true }
    },
    battery: {
      capacity: { type: String, required: true },
      charging: { type: String, required: true },
      wireless: { type: Boolean, default: false }
    },
    connectivity: {
      network: [String],
      wifi: { type: String, required: true },
      bluetooth: { type: String, required: true },
      ports: [String]
    },
    design: {
      dimensions: { type: String, required: true },
      weight: { type: String, required: true },
      colors: [String],
      material: { type: String, required: true }
    }
  },
  images: [String],
  videos: [String],
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  shortDescription: {
    type: String,
    required: [true, 'Please add a short description']
  },
  tags: [String],
  category: {
    type: String,
    required: [true, 'Please add a category'],
    default: 'smartphones'
  },
  subcategory: {
    type: String,
    required: [true, 'Please add a subcategory']
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
phoneSchema.index({ brand: 1, price: 1 });
phoneSchema.index({ 'specifications.performance.ram': 1 });
phoneSchema.index({ 'specifications.performance.storage': 1 });
phoneSchema.index({ price: 1, averageRating: -1 });
phoneSchema.index({ tags: 1 });
phoneSchema.index({ name: 'text', description: 'text' });
phoneSchema.index({ status: 1, publishedAt: -1 });

module.exports = mongoose.model('Phone', phoneSchema, 'phone');
