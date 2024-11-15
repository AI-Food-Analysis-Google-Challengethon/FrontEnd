import Link from 'next/link';
import BackButton from './BackButton';
import Toggle from './Toggle';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className='relative bg-white w-full h-[70px] border-b-2 flex justify-center items-center shadow-sm'>
      <div className='absolute left-3 top-4'>
        <BackButton />
      </div>
      <Link href='/' className='text-blue-400 text-3xl  font-bold  p-2 rounded-3xl'>
        <Image
          src='/logo.webp'
          alt='logo'
          width={80}
          height={80}
          className='bg-transparent  hover:bg-blue-100 hover:scale-105 rounded-full'
        />
      </Link>
      <div className='absolute top-1 lg:top-4 right-3 flex justify-center items-center gap-4'>
        <Toggle />
      </div>
    </nav>
  );
}
