'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const SignOutButton = () => {
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.removeItem('accessToken');
    clearAuth();

    router.push('/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className='font-bold bg-blue-500 text-white px-3 py-2 rounded-3xl hover:bg-blue-600 duration-200'
    >
      LogOut
    </button>
  );
};

export default SignOutButton;
