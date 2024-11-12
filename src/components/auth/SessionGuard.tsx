'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/');
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600' />
      </div>
    );
  }

  return <>{children}</>;
}
