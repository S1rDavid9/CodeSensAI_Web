const mongoose = require('mongoose');
require('dotenv').config();

async function testAtlasConnection() {
  console.log('🔍 Testing MongoDB Atlas connection...\n');
  
  try {
    // Get connection string from environment or use placeholder
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/codesensai?retryWrites=true&w=majority';
    
    console.log('📡 Connecting to MongoDB Atlas...');
    console.log('🔗 Connection string:', mongoUri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test database operations
    console.log('\n📊 Testing database operations...');
    
    // Get database info
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('📁 Collections found:', collections.map(c => c.name));
    
    // Test users collection
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log('👥 Users in database:', userCount);
    
    // Test a simple query
    const sampleUser = await usersCollection.findOne({});
    if (sampleUser) {
      console.log('👤 Sample user:', sampleUser.username);
    }
    
    console.log('\n🎉 All tests passed! Your Atlas setup is ready for deployment.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your connection string in .env file');
    console.log('2. Verify your username and password');
    console.log('3. Ensure Network Access allows 0.0.0.0/0');
    console.log('4. Check if your database user has read/write permissions');
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB Atlas');
  }
}

// Run the test
testAtlasConnection(); 