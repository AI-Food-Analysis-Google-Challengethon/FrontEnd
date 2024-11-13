'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className='font-bold bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 duration-200'
    >
      LogOut
    </button>
  );
};

export default SignOutButton;
