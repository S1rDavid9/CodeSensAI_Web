require('dotenv').config();
const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

console.log('Testing email configuration...');
console.log('Email Host:', emailConfig.host);
console.log('Email Port:', emailConfig.port);
console.log('Email User:', emailConfig.auth.user);
console.log('Email Pass:', emailConfig.auth.pass ? '***' + emailConfig.auth.pass.slice(-4) : 'NOT SET');

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Test the connection
async function testEmail() {
  try {
    console.log('\nTesting email connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Email connection successful!');
    
    // Send test email
    const mailOptions = {
      from: `"CodeSensai Test" <${emailConfig.auth.user}>`,
      to: emailConfig.auth.user, // Send to yourself
      subject: 'CodeSensai Email Test',
      text: 'If you receive this email, your email configuration is working correctly!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #667eea;">🎉 Email Test Successful!</h2>
          <p>Your CodeSensai email configuration is working correctly.</p>
          <p>You can now send verification emails to new users!</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication failed. Please check:');
      console.log('1. Your Gmail address is correct');
      console.log('2. Your app password is correct');
      console.log('3. 2-Step Verification is enabled');
      console.log('4. App password was generated for "Mail"');
    }
  }
}

testEmail(); 