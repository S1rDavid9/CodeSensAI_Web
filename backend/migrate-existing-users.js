require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codesensai');
    console.log('MongoDB connected for migration');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Migration function
const migrateExistingUsers = async () => {
  try {
    console.log('Starting migration of existing users...');
    
    // Find all users who don't have email verification set up
    const existingUsers = await User.find({
      $or: [
        { isEmailVerified: { $exists: false } },
        { isEmailVerified: false }
      ]
    });
    
    console.log(`Found ${existingUsers.length} existing users to migrate`);
    
    // Update each user
    for (const user of existingUsers) {
      user.isEmailVerified = true;
      user.emailVerificationToken = null;
      user.emailVerificationExpires = null;
      await user.save();
      console.log(`✅ Migrated user: ${user.username} (${user.email})`);
    }
    
    console.log('🎉 Migration completed successfully!');
    console.log(`Total users migrated: ${existingUsers.length}`);
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run migration
connectDB().then(() => {
  migrateExistingUsers();
}); 