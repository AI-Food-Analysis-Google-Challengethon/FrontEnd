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
        <div className=''>
          <span className='text-[15px] font-semibold mr-2'>{session.user?.name} 님</span>
          <SignOutButton />
        </div>
      ) : (
        <Link href='/login' className='font-bold bg-blue-500 p-2 text-white rounded-3xl hover:bg-blue-600 duration-200'>
          LOGIN
        </Link>
      )}
    </div>
  );
}
