'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { LoadingScreen } from '@/components/Loading';
import DemoBanner from '@/components/DemoBanner';
import { validatePhoneNumber as validatePhone, formatPhoneNumber } from '@/utils/helpers';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { sendOTP, loading: authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    
    // Clear errors when user starts typing
    if (errors.phoneNumber) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!phoneNumber.trim()) {
      setErrors({ phoneNumber: 'Phone number is required' });
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setErrors({ phoneNumber: 'Please enter a valid phone number' });
      return;
    }

    setLoading(true);

    try {
      const result = await sendOTP(phoneNumber);
      if (result.success) {
        router.push(`/auth/verify-otp?phone=${encodeURIComponent(phoneNumber)}`);
      }
    } catch (error) {
      console.error('Send OTP error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <DemoBanner />
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to AgriKhet</h2>
            <p className="mt-2 text-gray-600">Enter your phone number to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={handlePhoneChange}
              error={errors.phoneNumber}
              autoComplete="tel"
              autoFocus
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Send OTP
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              We'll send you a verification code to confirm your phone number
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Secure • Fast • Reliable
          </p>
        </div>
      </div>
    </div>
  );
}
