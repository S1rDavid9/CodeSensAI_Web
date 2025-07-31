import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getCurrentUser, 
  setCurrentUser, 
  clearCurrentUser, 
  verifyToken, 
  isAuthenticated,
  logoutUser as apiLogoutUser,
  updateUserProfile as apiUpdateUserProfile,
  updateUserProgress as apiUpdateUserProgress
} from './api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [lastVerifyTime, setLastVerifyTime] = useState(0);

  // Debounced verify token function
  const debouncedVerifyToken = useCallback(async () => {
    const now = Date.now();
    // Only verify if it's been more than 30 seconds since last verification
    if (now - lastVerifyTime < 30000) {
      return;
    }
    
    try {
      const result = await verifyToken();
      setLastVerifyTime(now);
      return result;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }, [lastVerifyTime]);

  // Check for existing user session on app load
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Check if user is authenticated
        if (isAuthenticated()) {
          // Try to verify token and get current user
          const result = await debouncedVerifyToken();
          if (result && result.valid && result.user) {
            setUser(result.user);
            setCurrentUser(result.user);
          } else {
            // Token is invalid, clear everything
            clearCurrentUser();
          }
        } else {
          // Check if we have user data in localStorage (for backward compatibility)
          const savedUser = getCurrentUser();
          if (savedUser) {
            setUser(savedUser);
          }
        }
      } catch (error) {
        console.error('Error initializing user:', error);
        clearCurrentUser();
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [debouncedVerifyToken]);

  const login = (userData) => {
    setUser(userData);
    setCurrentUser(userData);
  };

  const logout = async () => {
    setLogoutLoading(true);
    try {
      await apiLogoutUser();
      setUser(null);
      clearCurrentUser();
    } finally {
      setLogoutLoading(false);
    }
  };

  const updateUser = (updates) => {
    console.log('=== USER CONTEXT UPDATE ==='); // Debug log
    console.log('Current user:', user); // Debug log
    console.log('Updates:', updates); // Debug log
    const updatedUser = { ...user, ...updates };
    console.log('Updated user:', updatedUser); // Debug log
    setUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const updateUserProfile = async (profileData) => {
    try {
      // Call the backend API to update profile
      const result = await apiUpdateUserProfile(profileData);
      if (result.success) {
        // Update local state with the response from backend
        const updatedUser = { ...user, ...result.user };
        setUser(updatedUser);
        setCurrentUser(updatedUser);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  };

  const updateUserProgress = async (progressData) => {
    try {
      // Call the backend API to update progress
      const result = await apiUpdateUserProgress(progressData);
      if (result.success) {
        // Update local state with the response from backend
        const updatedUser = { ...user, ...result.user };
        setUser(updatedUser);
        setCurrentUser(updatedUser);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    logoutLoading, // expose this
    login,
    logout,
    updateUser,
    updateUserProfile,
    updateUserProgress,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 