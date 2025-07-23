// Phone number utilities
export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format as +CC XXXXXXXXXX if exactly 12 digits
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }
  
  // Otherwise return as-is with basic formatting
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (cleaned.length <= 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else {
    return `+${cleaned.slice(0, -10)} ${cleaned.slice(-10, -7)}-${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`;
  }
};

export const validatePhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Must be exactly 12 digits: 2-digit country code + 10-digit number
  if (cleaned.length !== 12) {
    return false;
  }
  
  // Country code should be between 10-99 (valid 2-digit codes)
  const countryCode = cleaned.slice(0, 2);
  const countryCodeNum = parseInt(countryCode);
  
  if (countryCodeNum < 10 || countryCodeNum > 99) {
    return false;
  }
  
  // The remaining 10 digits should be the phone number
  const phoneDigits = cleaned.slice(2);
  
  // First digit of phone number shouldn't be 0 or 1 (common validation)
  const firstDigit = parseInt(phoneDigits[0]);
  if (firstDigit < 2) {
    return false;
  }
  
  return true;
};

export const validatePhoneNumberWithDetails = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  if (cleaned.length < 12) {
    return { 
      isValid: false, 
      error: `Phone number too short. Expected 12 digits (2-digit country code + 10-digit number), got ${cleaned.length}` 
    };
  }
  
  if (cleaned.length > 12) {
    return { 
      isValid: false, 
      error: `Phone number too long. Expected 12 digits (2-digit country code + 10-digit number), got ${cleaned.length}` 
    };
  }
  
  // Country code validation
  const countryCode = cleaned.slice(0, 2);
  const countryCodeNum = parseInt(countryCode);
  
  if (countryCodeNum < 10 || countryCodeNum > 99) {
    return { 
      isValid: false, 
      error: `Invalid country code "${countryCode}". Must be a 2-digit code between 10-99` 
    };
  }
  
  // Phone number validation
  const phoneDigits = cleaned.slice(2);
  const firstDigit = parseInt(phoneDigits[0]);
  
  if (firstDigit < 2) {
    return { 
      isValid: false, 
      error: `Invalid phone number. First digit cannot be ${firstDigit}` 
    };
  }
  
  return { 
    isValid: true, 
    countryCode, 
    phoneNumber: phoneDigits,
    formatted: `+${countryCode} ${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`
  };
};

export const normalizePhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters except +
  return phoneNumber.replace(/[^\d+]/g, '');
};

// Storage utilities
export const storage = {
  set: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  
  get: (key) => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  
  remove: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
  
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
};

// Date utilities
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// API error handling
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
    };
  }
};
