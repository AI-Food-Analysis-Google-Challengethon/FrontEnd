'use client';

import { useSession } from 'next-auth/react';
import SignOutButton from '../SignOutButton';
import Link from 'next/link';

export default function NavbarInLogin() {
  const { data: session } = useSession();

  console.log(session);
  console.log(session?.user?.name);
  return (
    <div className='flex items-center'>
      {session ? (
        <div className='flex flex-col items-centers justify-center lg:flex-row lg:gap-4'>
          <SignOutButton />
          <span className='text-[15px] font-semibold mr-1 mt-[2px] lg:mt-[10px]'>{session.user?.name} 님</span>
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
