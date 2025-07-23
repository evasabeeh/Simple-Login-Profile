// Mock API responses for testing without backend
// In-memory storage for OTPs (in production, use Redis or database)
const otpStorage = new Map();

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

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP with expiration (5 minutes)
const storeOTP = (phoneNumber, otp) => {
  const expirationTime = Date.now() + (5 * 60 * 1000); // 5 minutes from now
  otpStorage.set(phoneNumber, {
    otp,
    expirationTime,
    attempts: 0
  });
};

// Validate OTP
const validateOTP = (phoneNumber, inputOtp) => {
  const storedData = otpStorage.get(phoneNumber);
  
  if (!storedData) {
    throw new Error('No OTP found for this phone number. Please request a new OTP.');
  }
  
  // Check if OTP has expired
  if (Date.now() > storedData.expirationTime) {
    otpStorage.delete(phoneNumber);
    throw new Error('OTP has expired. Please request a new OTP.');
  }
  
  // Increment attempt counter
  storedData.attempts += 1;
  
  // Check for too many attempts
  if (storedData.attempts > 3) {
    otpStorage.delete(phoneNumber);
    throw new Error('Too many invalid attempts. Please request a new OTP.');
  }
  
  // Validate OTP
  if (storedData.otp !== inputOtp) {
    throw new Error(`Invalid OTP. ${4 - storedData.attempts} attempts remaining.`);
  }
  
  // OTP is valid, remove it from storage
  otpStorage.delete(phoneNumber);
  return true;
};

// Mock API functions with simulated delays
export const mockAPI = {
  sendOTP: async (phoneNumber) => {
    console.log('📱 Mock API: Sending OTP to', phoneNumber);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    
    // Generate real OTP
    const otp = generateOTP();
    storeOTP(phoneNumber, otp);
    
    // Print OTP to console for testing
    console.log('🔐 GENERATED OTP:', otp);
    console.log('📱 Phone:', phoneNumber);
    console.log('⏰ Valid for: 5 minutes');
    console.log('🔄 Max attempts: 3');
    console.log('─'.repeat(50));
    
    return {
      ...mockResponses.sendOTP,
      message: `OTP sent successfully to ${phoneNumber}. Check console for OTP.`
    };
  },

  verifyOTP: async (phoneNumber, otp) => {
    console.log('🔐 Mock API: Verifying OTP', otp, 'for', phoneNumber);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    
    try {
      // Validate the OTP
      validateOTP(phoneNumber, otp);
      
      console.log('✅ OTP verification successful for', phoneNumber);
      
      return {
        ...mockResponses.verifyOTP,
        user: {
          ...mockResponses.verifyOTP.user,
          phoneNumber,
          id: `user_${phoneNumber.replace(/\D/g, '')}`
        }
      };
    } catch (error) {
      console.log('❌ OTP verification failed:', error.message);
      throw error;
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
