// Email Configuration for CodeSensai
// Copy these settings to your .env file or environment variables

module.exports = {
  // Email Configuration
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER || 'your-email@gmail.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'your-app-password',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'codesensai-secret-key-2024',
  
  // MongoDB Connection
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/codesensai'
};

// Instructions for setting up Gmail:
// 1. Enable 2-factor authentication on your Gmail account
// 2. Go to Google Account settings > Security > App passwords
// 3. Generate a new app password for "Mail"
// 4. Use that password in EMAIL_PASS
// 5. Use your Gmail address in EMAIL_USER

// Create a .env file in the backend folder with these variables:
/*
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
JWT_SECRET=codesensai-secret-key-2024
MONGODB_URI=mongodb://localhost:27017/codesensai
*/ 