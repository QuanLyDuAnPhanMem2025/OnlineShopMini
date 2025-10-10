const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
    // Password không bắt buộc cho Google OAuth users
    required: function() {
      return !this.googleId;
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Cho phép null/undefined nhưng unique khi có giá trị
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true
  },
  phone: {
    type: String,
    match: [/^[0-9]{10,11}$/, 'Please add a valid phone number']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String
  },
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home'
    },
    street: String,
    city: String,
    district: String,
    ward: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Index
userSchema.index({ email: 1 });

// Encrypt password using bcrypt (chỉ khi có password)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static method để tìm hoặc tạo user từ Google profile
userSchema.statics.findOrCreateFromGoogle = async function(googleProfile) {
  const { id: googleId, emails, name, photos } = googleProfile;
  const email = emails[0].value;
  
  // Tìm user theo googleId hoặc email
  let user = await this.findOne({
    $or: [{ googleId }, { email }]
  });
  
  if (user) {
    // Cập nhật googleId nếu user đăng ký bằng email trước đó
    if (!user.googleId) {
      user.googleId = googleId;
      user.avatar = photos[0].value;
      await user.save();
    }
    return user;
  }
  
  // Tạo user mới
  user = await this.create({
    googleId,
    email,
    firstName: name.givenName,
    lastName: name.familyName,
    avatar: photos[0].value,
    isActive: true
  });
  
  return user;
};

module.exports = mongoose.model('User', userSchema);
