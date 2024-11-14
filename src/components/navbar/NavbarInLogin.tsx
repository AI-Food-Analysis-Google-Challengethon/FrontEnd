'use client';

import SignOutButton from '../SignOutButton';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

export default function NavbarInLogin() {
  const { name } = useAuthStore();

  return (
    <div className='flex items-center'>
      {name ? (
        <div className='flex flex-col items-centers justify-center lg:flex-row lg:gap-4'>
          <SignOutButton />
          <span className='text-[15px] font-semibold mr-1 mt-[2px] lg:mt-[10px]'>{name} 님</span>
        </div>
      ) : (
        <Link
          href='/login'
          className='font-bold bg-blue-500 mt-[12px] p-2 lg:mt-0 text-white rounded-3xl hover:bg-blue-600 duration-200'
        >
          LOGIN
        </Link>
      )}
    </div>
  );
}
