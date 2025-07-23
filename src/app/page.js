'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/Loading';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/profile');
      } else {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  return <LoadingScreen message="Redirecting..." />;
}
