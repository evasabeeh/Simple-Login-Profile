'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authAPI } from '@/utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = Cookies.get('authToken');
      if (token) {
        const profileData = await authAPI.getProfile();
        setUser(profileData.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      Cookies.remove('authToken');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (phoneNumber, otp) => {
    try {
      const response = await authAPI.verifyOTP(phoneNumber, otp);
      
      if (response.success && response.token) {
        Cookies.set('authToken', response.token, { expires: 7 }); // 7 days
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error(response.message || 'Invalid OTP');
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      Cookies.remove('authToken');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  };

  const sendOTP = async (phoneNumber) => {
    try {
      const response = await authAPI.sendOTP(phoneNumber);
      if (response.success) {
        toast.success('OTP sent successfully!');
        return { success: true };
      } else {
        toast.error(response.message || 'Failed to send OTP');
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    sendOTP,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
