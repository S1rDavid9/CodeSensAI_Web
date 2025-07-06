// API utility for CodeSensAI backend

// Token management
const getToken = () => localStorage.getItem('codesensai_token');
const setToken = (token) => localStorage.setItem('codesensai_token', token);
const removeToken = () => localStorage.removeItem('codesensai_token');

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
  
  const response = await fetch(url, {
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

export async function registerUser({ username, password, role, email, age, interests }) {
  try {
    const res = await fetch('/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role, email, age, interests }),
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
    const res = await fetch('/users/login', {
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
  const res = await authenticatedFetch('/users/progress', {
    method: 'POST',
    body: JSON.stringify(progressData),
  });
  return res.json();
}

export async function verifyToken() {
  const res = await authenticatedFetch('/users/verify');
  return res.json();
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