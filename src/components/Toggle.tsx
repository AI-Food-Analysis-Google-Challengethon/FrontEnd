'use client';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import SignOutButton from './SignOutButton';

const linkForPageClassName =
  'w-full py-1 font-semibold text-neutral-700 text-center hover:bg-blue-100 hover:scale-105 rounded-2xl duration-200';

export default function Toggle() {
  const [openToggle, setOpenToggle] = useState(false);
  const { name } = useAuthStore();

  const handleToggle = () => {
    setOpenToggle(!openToggle);
  };

  return (
    <div className='relative z-50 flex mt-[15px] lg:mt-0 items-center '>
      {name && <span className='text-[15px] font-semibold mr-[20px]'>{name} 님</span>}
      <button onClick={handleToggle}>
        <RxHamburgerMenu size={35} className='hover:bg-neutral-300 rounded-full p-1' />
      </button>
      <section
        className={`${
          openToggle ? 'max-h-[500px] py-2 opacity-100' : 'max-h-0 opacity-0'
        } transition-all duration-300 ease-in-out overflow-hidden absolute top-9 right-1 w-[150px] border-2 border-blue-300 bg-blue-50 shadow-lg rounded-2xl flex flex-col items-center gap-3 px-2`}
      >
        <Link href='student' className={linkForPageClassName}>
          Student Page
        </Link>
        <Link href='calendar' className={linkForPageClassName}>
          My Calendar
        </Link>
        <Link href='mypage' className={linkForPageClassName}>
          My Page
        </Link>

        <>
          {name ? (
            <SignOutButton />
          ) : (
            <>
              <Link href='register' className={linkForPageClassName}>
                Register
              </Link>
              <Link
                href='/login'
                className='font-bold bg-blue-500 mt-[12px] p-2 lg:mt-0 text-white rounded-3xl hover:bg-blue-600 duration-200'
              >
                LOGIN
              </Link>
            </>
          )}
        </>
      </section>
    </div>
  );
}
