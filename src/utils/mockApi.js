// Mock API responses for testing without backend
const mockResponses = {
  sendOTP: {
    success: true,
    message: "OTP sent successfully to your phone number"
  },
  verifyOTP: {
    success: true,
    token: "mock_jwt_token_12345",
    user: {
      id: "user_12345",
      phoneNumber: "+1234567890",
      name: "Test User"
    }
  },
  profile: {
    success: true,
    user: {
      id: "user_12345",
      phoneNumber: "+1234567890",
      name: "Test User",
      createdAt: "2025-01-01T00:00:00Z"
    }
  },
  logout: {
    success: true,
    message: "Logged out successfully"
  }
};

// Mock API functions with simulated delays
export const mockAPI = {
  sendOTP: async (phoneNumber) => {
    console.log('📱 Mock API: Sending OTP to', phoneNumber);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return mockResponses.sendOTP;
  },

  verifyOTP: async (phoneNumber, otp) => {
    console.log('🔐 Mock API: Verifying OTP', otp, 'for', phoneNumber);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    
    // Simulate OTP validation (accept any 6-digit OTP for demo)
    if (otp.length === 6) {
      return {
        ...mockResponses.verifyOTP,
        user: {
          ...mockResponses.verifyOTP.user,
          phoneNumber
        }
      };
    } else {
      throw new Error('Invalid OTP. Please enter a 6-digit code.');
    }
  },

  getProfile: async () => {
    console.log('👤 Mock API: Getting profile');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return mockResponses.profile;
  },

  logout: async () => {
    console.log('🚪 Mock API: Logging out');
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    return mockResponses.logout;
  },
};

// Environment detection
export const shouldUseMockAPI = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return !apiUrl || apiUrl.includes('localhost:3004');
};
