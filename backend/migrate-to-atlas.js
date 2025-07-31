const mongoose = require('mongoose');
require('dotenv').config();

async function migrateToAtlas() {
  console.log('🔄 Starting migration from local MongoDB to Atlas...\n');
  
  try {
    // Connect to local MongoDB
    console.log('📡 Connecting to local MongoDB...');
    const localConnection = await mongoose.createConnection('mongodb://localhost:27017/codesensai', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Connect to Atlas MongoDB
    console.log('☁️ Connecting to MongoDB Atlas...');
    const atlasConnection = await mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Get collections
    const localDb = localConnection.db;
    const atlasDb = atlasConnection.db;
    
    // Get all collections from local
    const collections = await localDb.listCollections().toArray();
    console.log('📁 Collections found in local:', collections.map(c => c.name));
    
    // Migrate each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`\n🔄 Migrating collection: ${collectionName}`);
      
      // Get all documents from local
      const localCollection = localDb.collection(collectionName);
      const documents = await localCollection.find({}).toArray();
      
      console.log(`📄 Found ${documents.length} documents in ${collectionName}`);
      
      if (documents.length > 0) {
        // Insert into Atlas
        const atlasCollection = atlasDb.collection(collectionName);
        const result = await atlasCollection.insertMany(documents);
        console.log(`✅ Successfully migrated ${result.insertedCount} documents to Atlas`);
      }
    }
    
    // Verify migration
    console.log('\n🔍 Verifying migration...');
    const atlasCollections = await atlasDb.listCollections().toArray();
    console.log('📁 Collections in Atlas:', atlasCollections.map(c => c.name));
    
    // Check users specifically
    const atlasUsersCollection = atlasDb.collection('users');
    const userCount = await atlasUsersCollection.countDocuments();
    console.log(`👥 Users in Atlas: ${userCount}`);
    
    if (userCount > 0) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('✅ Your users are now in Atlas and ready for deployment.');
    } else {
      console.log('\n⚠️ No users were migrated. Check if local database has users.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure local MongoDB is running: mongod');
    console.log('2. Check if you have users in local database');
    console.log('3. Verify Atlas connection string');
  } finally {
    // Close connections
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from databases');
  }
}

// Run migration
migrateToAtlas(); 