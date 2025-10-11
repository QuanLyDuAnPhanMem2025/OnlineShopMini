const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@phonestore.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      // Update role to admin if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('Updated existing user to admin role');
      }
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@phonestore.com',
      password: 'admin123', // Will be hashed by pre-save middleware
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@phonestore.com');
    console.log('Password: admin123');
    console.log('Role: admin');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the function
createAdmin();
