'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setAuth(session.user?.name || '', session.user?.email || '');
    } else if (status === 'unauthenticated') {
      clearAuth();
    }
  }, [session, status, setAuth, clearAuth]);

  return <>{children}</>;
}
