const mongoose = require('mongoose');

// Student-specific profile schema
const StudentProfileSchema = new mongoose.Schema({
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  level: { type: String, default: 'beginner' },
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  completedLessons: { type: [String], default: [] },
  currentLesson: { type: String, default: null },
  age: { type: String, default: '' },
  interests: { type: [String], default: [] },
  recentActivity: { type: [String], default: [] },
  completedOnboarding: { type: Boolean, default: false },
  encouragements: { type: [Object], default: [] }
});

// Parent-specific profile schema (simplified)
const ParentProfileSchema = new mongoose.Schema({
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  phone: { type: String, default: '' },
  childrenCount: { type: Number, default: 0 },
  completedOnboarding: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'parent'], required: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.Mixed, default: () => ({}) }, // Will be either StudentProfile or ParentProfile based on role
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  // Email verification fields
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, default: null },
  emailVerificationExpires: { type: Date, default: null }
});

module.exports = mongoose.model('User', UserSchema); 