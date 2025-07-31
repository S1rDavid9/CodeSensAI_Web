// API utility for CodeSensAI backend

// API base URL - configurable for production
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Token management
const getToken = () => localStorage.getItem('codesensai_token');
const setToken = (token) => localStorage.setItem('codesensai_token', token);
const removeToken = () => localStorage.removeItem('codesensai_token');

// Debouncing mechanism for verifyToken
let lastVerifyCall = 0;
const VERIFY_COOLDOWN = 60000; // 60 seconds cooldown

// Helper function to make authenticated requests
const authenticatedFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  
  // If token is expired or invalid, remove it
  if (response.status === 401 || response.status === 403) {
    removeToken();
    window.location.href = '/login';
  }
  
  return response;
};

export async function registerUser({ username, password, role, email, age, interests, inviteCode }) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role, email, age, interests, inviteCode }),
    });
    const data = await res.json();
    
    if (res.ok) {
      if (data.token) {
        setToken(data.token);
      }
      return { success: true, user: data.user || data };
    } else {
      return { success: false, error: data.message || 'Registration failed' };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function loginUser({ identifier, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: identifier, password }),
    });
    const data = await res.json();
    
    if (res.ok) {
      if (data.token) {
        setToken(data.token);
      }
      return { success: true, user: data.user || data };
    } else {
      return { success: false, error: data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function verifyEmail(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    
    if (res.ok) {
      return { success: true, message: data.message, user: data.user };
    } else {
      return { success: false, error: data.message || 'Email verification failed' };
    }
  } catch (error) {
    console.error('Email verification error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function resendVerificationEmail(email) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    
    if (res.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, error: data.message || 'Failed to resend verification email' };
    }
  } catch (error) {
    console.error('Resend verification error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function generateInviteCode() {
  try {
    const res = await authenticatedFetch('/users/invite-code', {
      method: 'POST',
    });
    const data = await res.json();
    
    if (res.ok) {
      return { success: true, code: data.code };
    } else {
      return { success: false, error: data.message || 'Failed to generate invite code' };
    }
  } catch (error) {
    console.error('Generate invite code error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function getStudents() {
  try {
    const res = await authenticatedFetch('/users/students');
    const data = await res.json();
    
    if (res.ok) {
      return { success: true, students: data.students };
    } else {
      return { success: false, error: data.message || 'Failed to fetch students' };
    }
  } catch (error) {
    console.error('Get students error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function logoutUser() {
  removeToken();
  return { message: 'Logged out successfully' };
}

export async function getUserProfile() {
  const res = await authenticatedFetch('/users/profile');
  return res.json();
}

export async function updateUserProfile(profileData) {
  try {
    const res = await authenticatedFetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    
    // Return the format that OnboardingPage expects
    if (res.ok) {
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.message || 'Failed to update profile' };
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function updateUserProgress(progressData) {
  try {
    const res = await authenticatedFetch('/users/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
    const data = await res.json();
    
    if (res.ok) {
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.message || 'Failed to update progress' };
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function verifyToken() {
  const now = Date.now();
  
  // Check if we're within the cooldown period
  if (now - lastVerifyCall < VERIFY_COOLDOWN) {
    // Return cached result or skip verification
    const cachedUser = getCurrentUser();
    if (cachedUser) {
      return { valid: true, user: cachedUser };
    }
    return { valid: false };
  }
  
  try {
    lastVerifyCall = now;
    const res = await authenticatedFetch('/users/verify');
    return res.json();
  } catch (error) {
    console.error('Token verification error:', error);
    return { valid: false };
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Get current user from localStorage (if available)
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('codesensai_user');
  return userStr ? JSON.parse(userStr) : null;
};

// Set current user in localStorage
export const setCurrentUser = (user) => {
  localStorage.setItem('codesensai_user', JSON.stringify(user));
};

// Clear current user from localStorage
export const clearCurrentUser = () => {
  localStorage.removeItem('codesensai_user');
}; 