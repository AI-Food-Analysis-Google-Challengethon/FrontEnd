import Link from 'next/link';
import BackButton from './BackButton';

export default function Navbar() {
  return (
    <nav className='fixed bg-white top-0 left-0 z-50 w-full h-[80px] border-b-2 flex justify-center items-center shadow-sm'>
      <div className='absolute left-3 top-5'>
        <BackButton />
      </div>
      <Link href='/' className='text-blue-400 text-3xl  font-bold  p-2 rounded-3xl hover:bg-blue-100 hover:scale-'>
        천리안
      </Link>
      <div className='absolute right-3 top-5 flex justify-center items-center gap-4 mr-[15px] lg:mr-[40px]'>
        <Link href='/login' className='text-blue-500 text-lg font-semibold hover:bg-blue-100 p-2 rounded-3xl '>
          Login
        </Link>
      </div>
    </nav>
  );
}
