const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const InviteCode = require('../models/InviteCode');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { generateVerificationToken, sendVerificationEmail } = require('../services/emailService');

const JWT_SECRET = 'codesensai-secret-key-2024';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('JWT decoded user ID:', user.id, 'Length:', user.id.toString().length);
    req.user = user;
    next();
  });
};

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// POST /invite-code - Parent generates a single-use invite code
router.post('/invite-code', authenticateToken, async function(req, res) {
  try {
    // Remove any existing unused code for this parent
    await InviteCode.deleteMany({ parentId: req.user.id, used: false });
    // Generate a new code
    const code = crypto.randomBytes(4).toString('hex');
    const invite = new InviteCode({ code, parentId: req.user.id });
    await invite.save();
    res.json({ code });
  } catch (err) {
    res.status(500).json({ message: 'Error generating invite code.' });
  }
});

// POST /register - Register a new user
router.post('/register', async function(req, res) {
  const { username, password, role, email, age, interests, inviteCode } = req.body;
  console.log('REGISTER BODY:', req.body); // DEBUG
  if (!username || !password || !role || !email) {
    return res.status(400).json({ message: 'Username, password, email, and role are required.' });
  }
  let parentId = null;
  if (inviteCode) {
    console.log('Processing invite code:', inviteCode);
    // Validate invite code
    const codeDoc = await InviteCode.findOne({ code: inviteCode, used: false });
    if (!codeDoc) {
      console.log('Invalid or used invite code:', inviteCode);
      return res.status(400).json({ message: 'Invalid or already used invite code.' });
    }
    console.log('Found valid invite code for parent:', codeDoc.parentId);
    parentId = new mongoose.Types.ObjectId(codeDoc.parentId); // ensure ObjectId
    console.log('Set parentId to:', parentId);
    codeDoc.used = true;
    await codeDoc.save();
    console.log('Marked invite code as used');
  }
  try {
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate email verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    console.log('Generated verification token:', verificationToken.substring(0, 10) + '...');
    console.log('Token expires at:', verificationExpires);
    
    // Create role-specific profile
    let profile = {};
    if (role === 'student') {
      profile = {
        avatar: '',
        bio: '',
        level: 'beginner',
        points: 0,
        badges: [],
        completedLessons: [],
        currentLesson: null,
        age: age || '',
        interests: interests || [],
        recentActivity: [],
        completedOnboarding: false
      };
    } else if (role === 'parent') {
      profile = {
        avatar: '',
        bio: '',
        phone: '',
        childrenCount: 0,
        completedOnboarding: false
      };
    }
    
    const user = new User({
      username,
      password: hashedPassword,
      email,
      role,
      profile,
      parentId,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires
    });
    await user.save();
    
    console.log('User saved with verification token:', user.emailVerificationToken ? 'YES' : 'NO');
    console.log('User verification status:', user.isEmailVerified);
    
    // Send verification email
    const emailResult = await sendVerificationEmail(email, username, verificationToken);
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
      // Don't fail registration, but log the error
    }
    
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.emailVerificationToken;
    userObj.role = user.role; // Ensure role is present
    
    // User registered successfully
    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.',
      token,
      user: userObj,
      emailSent: emailResult.success
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// POST /login - User login
router.post('/login', async function(req, res) {
  const { username, password } = req.body;
  // Login request received
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  try {
    // Allow login by username or email
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  
  // Check email verification status - but allow existing users to log in
  if (!user.isEmailVerified) {
    // For existing users (created before email verification was added), allow login
    // For new users (with emailVerificationToken), require verification
    if (user.emailVerificationToken) {
      return res.status(403).json({ 
        message: 'Please verify your email address before logging in.',
        needsEmailVerification: true,
        email: user.email
      });
    } else {
      // Existing user without verification token - mark as verified and allow login
      console.log('Allowing existing user to log in without email verification:', user.username);
      user.isEmailVerified = true;
      await user.save();
    }
  }
  
    // Fix missing completedOnboarding field for existing users
    if (user.profile && user.profile.completedOnboarding === undefined) {
      // Check if user has profile data (age, interests, etc.) to determine if they completed onboarding
      const hasProfileData = user.profile.age || user.profile.interests || user.profile.bio;
      user.profile.completedOnboarding = !!hasProfileData;
      await user.save();
      console.log('Fixed completedOnboarding for user:', user.username, 'Value:', user.profile.completedOnboarding);
    }
    
    console.log('User ID before JWT:', user._id, 'Length:', user._id.toString().length);
  const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.emailVerificationToken;
    userObj.role = user.role; // Ensure role is present
    // User login successful
  res.status(200).json({
    message: 'Login successful.',
    token,
      user: userObj
  });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in.' });
  }
});

// GET /profile - Get user profile (protected route)
router.get('/profile', authenticateToken, async function(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile.' });
  }
});

// PUT /profile - Update user profile (protected route)
router.put('/profile', authenticateToken, async function(req, res) {
  try {
    const { email, age, interests, profile } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
    if (email !== undefined) user.email = email;
  
    // Handle profile updates based on user role
  if (profile !== undefined) {
      if (user.role === 'student') {
        // For students, allow updating student-specific fields
        if (age !== undefined) user.profile.age = age;
        if (interests !== undefined) user.profile.interests = interests;
        // Ensure all profile data is properly merged
        user.profile = { 
          ...user.profile, 
          ...profile,
          completedOnboarding: true // Mark onboarding as completed
        };
      } else if (user.role === 'parent') {
        // For parents, only allow updating parent-specific fields
        user.profile = { 
          ...user.profile, 
          ...profile,
          completedOnboarding: true // Mark onboarding as completed
        };
      }
    }
    
    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
  res.json({
    message: 'Profile updated successfully',
      user: userObj
  });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Error updating profile.' });
  }
});

// POST /progress - Update user progress (protected route)
router.post('/progress', authenticateToken, async function(req, res) {
  const { lessonId, completed, score, timeSpent, badge } = req.body;
  console.log('PROGRESS UPDATE REQUEST:', { lessonId, completed, score, timeSpent, badge }); // Debug log
  console.log('USER ID:', req.user.id); // Debug log
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found for ID:', req.user.id); // Debug log
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    console.log('Found user:', user.username); // Debug log
    console.log('Current profile:', user.profile); // Debug log
    
    // Only allow progress updates for students
    if (user.role !== 'student') {
      console.log('User is not a student:', user.role); // Debug log
      return res.status(403).json({ success: false, message: 'Progress updates are only allowed for students.' });
    }
    
  if (completed) {
    if (!user.profile.completedLessons.includes(lessonId)) {
      user.profile.completedLessons.push(lessonId);
        user.profile.points += score || 10;
        
        // Handle badge if provided
        if (badge && !user.profile.badges.includes(badge)) {
          user.profile.badges.push(badge);
          console.log('Added badge:', badge); // Debug log
        }
        
        // Add to recent activity
        const activityEntry = `Completed lesson: ${lessonId} (+${score || 10} points)`;
        user.profile.recentActivity = [
          activityEntry,
          ...(user.profile.recentActivity || [])
        ].slice(0, 5); // Keep only last 5 activities
        
        console.log('Updated profile:', user.profile); // Debug log
      } else {
        console.log('Lesson already completed:', lessonId); // Debug log
      }
    }
    user.profile.currentLesson = lessonId;
    console.log('About to save user with profile:', user.profile); // Debug log
    
    // Mark the profile field as modified to ensure Mongoose saves it
    user.markModified('profile');
    
    await user.save();
    console.log('User saved successfully'); // Debug log
    
    // Verify the data was actually saved
    const savedUser = await User.findById(req.user.id);
    console.log('Verified saved user profile:', savedUser.profile); // Debug log
    console.log('Verified completed lessons:', savedUser.profile.completedLessons); // Debug log
    console.log('Verified points:', savedUser.profile.points); // Debug log
    console.log('Verified badges:', savedUser.profile.badges); // Debug log
    
    const userObj = user.toObject();
    delete userObj.password;
  res.json({
      success: true,
    message: 'Progress updated successfully',
      user: userObj
  });
  } catch (err) {
    console.error('Progress update error:', err);
    res.status(500).json({ success: false, message: 'Error updating progress.' });
  }
});

// GET /verify - Verify token validity
router.get('/verify', authenticateToken, async function(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
    // Initialize encouragements field for existing students if missing
    if (user.role === 'student' && user.profile && !user.profile.encouragements) {
      user.profile.encouragements = [];
      user.markModified('profile');
      await user.save();
      console.log('Initialized encouragements field for user:', user.username); // Debug log
    }
    
    res.json({ valid: true, user });
  } catch (err) {
    console.error('Verify token error:', err); // Debug log
    res.status(500).json({ message: 'Error verifying token.' });
  }
});

// POST /verify-email - Verify email address
router.post('/verify-email', async function(req, res) {
  const { token } = req.body;
  
  console.log('Verification request received:', { token: token ? token.substring(0, 10) + '...' : 'NO TOKEN' });
  
  if (!token) {
    console.log('No token provided');
    return res.status(400).json({ message: 'Verification token is required.' });
  }
  
  try {
    console.log('Looking for user with token:', token.substring(0, 10) + '...');
    
    // First check if user is already verified
    const alreadyVerifiedUser = await User.findOne({
      emailVerificationToken: token,
      isEmailVerified: true
    });
    
    console.log('Already verified user found:', alreadyVerifiedUser ? 'YES' : 'NO');
    
    if (alreadyVerifiedUser) {
      console.log('User already verified:', alreadyVerifiedUser.username);
      
      // Generate JWT token for automatic login
      const jwtToken = jwt.sign(
        { id: alreadyVerifiedUser._id, username: alreadyVerifiedUser.username, role: alreadyVerifiedUser.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      return res.json({ 
        message: 'Email already verified! Welcome to CodeSensai!',
        token: jwtToken,
        user: {
          id: alreadyVerifiedUser._id,
          username: alreadyVerifiedUser.username,
          email: alreadyVerifiedUser.email,
          role: alreadyVerifiedUser.role,
          isEmailVerified: true
        }
      });
    }
    
    // Look for unverified user with this token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
      isEmailVerified: false
    });
    
    console.log('Unverified user found:', user ? 'YES' : 'NO');
    if (user) {
      console.log('User details:', {
        username: user.username,
        email: user.email,
        tokenExists: !!user.emailVerificationToken,
        tokenExpires: user.emailVerificationExpires,
        isVerified: user.isEmailVerified
      });
    }
    
    if (!user) {
      // Let's check what users exist with this token (for debugging)
      const allUsersWithToken = await User.find({ emailVerificationToken: token });
      console.log('All users with this token:', allUsersWithToken.length);
      allUsersWithToken.forEach(u => {
        console.log('User with token:', {
          username: u.username,
          isVerified: u.isEmailVerified,
          tokenExpires: u.emailVerificationExpires,
          currentTime: new Date()
        });
      });
      
      console.log('User not found or token invalid/expired');
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }
    
    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();
    
    console.log('Email verified successfully for user:', user.username);
    
    // Generate JWT token for automatic login
    const jwtToken = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    const responseData = { 
      message: 'Email verified successfully! Welcome to CodeSensai!',
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isEmailVerified: true
      }
    };
    
    console.log('Sending verification response:', {
      message: responseData.message,
      hasToken: !!responseData.token,
      user: responseData.user.username,
      userVerified: responseData.user.isEmailVerified
    });
    
    res.json(responseData);
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(500).json({ message: 'Error verifying email.' });
  }
});

// POST /resend-verification - Resend verification email
router.post('/resend-verification', async function(req, res) {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  
  try {
    const user = await User.findOne({ email, isEmailVerified: false });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found or email already verified.' });
    }
    
    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();
    
    // Send verification email
    const emailResult = await sendVerificationEmail(email, user.username, verificationToken);
    
    if (emailResult.success) {
      res.json({ message: 'Verification email sent successfully. Please check your inbox.' });
    } else {
      res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
    }
  } catch (err) {
    console.error('Resend verification error:', err);
    res.status(500).json({ message: 'Error resending verification email.' });
  }
});

// GET /students - Get all students for the authenticated parent
router.get('/students', authenticateToken, async function(req, res) {
  try {
    console.log('FETCHING STUDENTS for parent ID:', req.user.id);
    
    // Check if req.user.id is valid
    if (!req.user.id) {
      console.error('No user ID found in request');
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
    
    // Try to convert to ObjectId, but handle errors gracefully
    let parentObjectId;
    try {
      // Use a more robust method to create ObjectId
      if (mongoose.Types.ObjectId.isValid(req.user.id)) {
        parentObjectId = new mongoose.Types.ObjectId(req.user.id);
      } else {
        console.error('Invalid ObjectId format:', req.user.id);
        return res.status(400).json({ message: 'Invalid user ID format.' });
      }
    } catch (objectIdError) {
      console.error('ObjectId creation error:', objectIdError);
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }
    
    const students = await User.find({ parentId: parentObjectId }).select('-password');
    console.log('FETCHED STUDENTS for parent', req.user.id, ':', students.map(s => s.username));
    res.json({ students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Error fetching students.' });
  }
});

// GET /students/:id/progress - Get a specific student's progress
router.get('/students/:id/progress', authenticateToken, async function(req, res) {
  try {
    const student = await User.findOne({ _id: req.params.id, parentId: req.user.id }).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found or not linked to this parent.' });
    }
    res.json({ progress: student.profile });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student progress.' });
  }
});

// POST /students/:id/encouragement - Send encouragement to a student
router.post('/students/:id/encouragement', authenticateToken, async function(req, res) {
  console.log('=== ENCOURAGEMENT REQUEST ==='); // Debug log
  console.log('Student ID:', req.params.id); // Debug log
  console.log('Parent ID:', req.user.id); // Debug log
  console.log('Message:', req.body.message); // Debug log
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Encouragement message is required.' });
    }

    const student = await User.findOne({ _id: req.params.id, parentId: req.user.id });
    console.log('Found student:', student ? student.username : 'NOT FOUND'); // Debug log
    if (!student) {
      console.log('Student not found or not linked to parent'); // Debug log
      return res.status(404).json({ message: 'Student not found or not linked to this parent.' });
    }

    // Initialize encouragements field if it doesn't exist
    if (!student.profile.encouragements) {
      student.profile.encouragements = [];
    }
    
    // Mark the profile as modified to ensure Mongoose saves it
    student.markModified('profile');
    
    const encouragement = {
      message: message.trim(),
      from: req.user.username,
      timestamp: new Date(),
      read: false
    };
    
    student.profile.encouragements.unshift(encouragement); // Add to beginning
    student.profile.encouragements = student.profile.encouragements.slice(0, 10); // Keep only last 10
    
    await student.save();
    
    res.json({ 
      success: true, 
      message: 'Encouragement sent successfully!',
      encouragement 
    });
  } catch (err) {
    console.error('Encouragement error:', err);
    res.status(500).json({ message: 'Error sending encouragement.' });
  }
});

module.exports = router;
