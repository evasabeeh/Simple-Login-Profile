'use client';

import { useEffect } from 'react';

const ConsoleInstructions = () => {
  useEffect(() => {
    // Display helpful instructions in console
    console.log('%c🚀 AgriKhet Authentication System', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    console.log('%c📱 Demo Mode Active', 'color: #f59e0b; font-weight: bold;');
    console.log('');
    console.log('📋 Instructions:');
    console.log('1. Enter any phone number in the login form');
    console.log('2. Click "Send OTP" button');
    console.log('3. Check this console for the generated OTP');
    console.log('4. Enter the OTP from console into the verification form');
    console.log('5. Complete authentication and access your profile');
    console.log('');
    console.log('⚠️  Note: OTP expires in 5 minutes and has 3 attempt limit');
    console.log('━'.repeat(60));
  }, []);

  return null; // This component doesn't render anything
};

export default ConsoleInstructions;
