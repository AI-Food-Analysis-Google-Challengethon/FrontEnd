import GoogleAuth from '@/components/auth/GoogleAuth';
import React from 'react';

export default function LoginPage() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center mt-[200px]'>
      <main>
        <GoogleAuth />
      </main>
    </div>
  );
}
