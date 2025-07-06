var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret key (in production, use environment variable)
const JWT_SECRET = 'codesensai-secret-key-2024';

// In-memory user store (for demo purposes only)
const users = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST /register - Register a new user
router.post('/register', async function(req, res) {
  const { username, password, role, email, age, interests } = req.body;
  
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required.' });
  }
  
  // Check if user already exists
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      role,
      email: email || '',
      age: age || null,
      interests: interests || [],
      profile: {
        avatar: null,
        bio: '',
        level: 'beginner',
        points: 0,
        badges: [],
        completedLessons: [],
        currentLesson: null
      },
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// POST /login - User login
router.post('/login', async function(req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  // Return user data without password
  const { password: _, ...userWithoutPassword } = user;
  
  res.status(200).json({
    message: 'Login successful.',
    token,
    user: userWithoutPassword
  });
});

// GET /profile - Get user profile (protected route)
router.get('/profile', authenticateToken, function(req, res) {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// PUT /profile - Update user profile (protected route)
router.put('/profile', authenticateToken, function(req, res) {
  const userIndex = users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { email, age, interests, profile } = req.body;
  const user = users[userIndex];
  
  // Update user data
  if (email !== undefined) user.email = email;
  if (age !== undefined) user.age = age;
  if (interests !== undefined) user.interests = interests;
  if (profile !== undefined) {
    user.profile = { ...user.profile, ...profile };
  }
  
  users[userIndex] = user;
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Profile updated successfully',
    user: userWithoutPassword
  });
});

// POST /progress - Update user progress (protected route)
router.post('/progress', authenticateToken, function(req, res) {
  const { lessonId, completed, score, timeSpent } = req.body;
  const userIndex = users.findIndex(u => u.id === req.user.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const user = users[userIndex];
  
  // Update progress
  if (completed) {
    if (!user.profile.completedLessons.includes(lessonId)) {
      user.profile.completedLessons.push(lessonId);
      user.profile.points += score || 10; // Add points for completion
    }
  }
  
  // Update current lesson
  user.profile.currentLesson = lessonId;
  
  users[userIndex] = user;
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Progress updated successfully',
    user: userWithoutPassword
  });
});

// GET /verify - Verify token validity
router.get('/verify', authenticateToken, function(req, res) {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ valid: true, user: userWithoutPassword });
});

module.exports = router;
