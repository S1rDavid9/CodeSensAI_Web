import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  setCurrentUser, 
  clearCurrentUser, 
  verifyToken, 
  isAuthenticated,
  logoutUser as apiLogoutUser
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

  // Check for existing user session on app load
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Check if user is authenticated
        if (isAuthenticated()) {
          // Try to verify token and get current user
          const result = await verifyToken();
          if (result.valid && result.user) {
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
  }, []);

  const login = (userData) => {
    setUser(userData);
    setCurrentUser(userData);
  };

  const logout = async () => {
    try {
      await apiLogoutUser();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      clearCurrentUser();
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const updateUserProfile = async (profileData) => {
    try {
      // This will be implemented when we add the profile update API
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      setCurrentUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    updateUserProfile,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 