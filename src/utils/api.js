import axios from 'axios';
import Cookies from 'js-cookie';
import { mockAPI, shouldUseMockAPI } from './mockApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('authToken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API calls with fallback to mock
const handleApiCall = async (realApiCall, mockApiCall) => {
  if (shouldUseMockAPI()) {
    console.log('🔧 Using Mock API (Backend not available)');
    return await mockApiCall();
  }

  try {
    const response = await realApiCall();
    return response.data;
  } catch (error) {
    // If backend is not available, fallback to mock API
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
      console.log('🔧 Backend unavailable, falling back to Mock API');
      return await mockApiCall();
    }
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  sendOTP: async (phoneNumber) => {
    return await handleApiCall(
      () => api.post('/api/auth/send-otp', { phoneNumber }),
      () => mockAPI.sendOTP(phoneNumber)
    );
  },

  verifyOTP: async (phoneNumber, otp) => {
    return await handleApiCall(
      () => api.post('/api/auth/verify-otp', { phoneNumber, otp }),
      () => mockAPI.verifyOTP(phoneNumber, otp)
    );
  },

  getProfile: async () => {
    return await handleApiCall(
      () => api.get('/api/auth/profile'),
      () => mockAPI.getProfile()
    );
  },

  logout: async () => {
    return await handleApiCall(
      () => api.post('/api/auth/logout'),
      () => mockAPI.logout()
    );
  },
};

export default api;
