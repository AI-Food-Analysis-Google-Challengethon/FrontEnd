import Link from 'next/link';
import BackButton from './BackButton';
import NavbarInLogin from './NavbarInLogin';

export default function Navbar() {
  return (
    <nav className='fixed bg-white top-0 left-0 z-50 w-full h-[80px] border-b-2 flex justify-center items-center shadow-sm'>
      <div className='absolute left-3 top-5'>
        <BackButton />
      </div>
      <Link href='/' className='text-blue-400 text-3xl  font-bold  p-2 rounded-3xl hover:bg-blue-100 hover:scale-'>
        천리안
      </Link>
      <div className='absolute top-5 right-3 flex justify-center items-center gap-4'>
        <NavbarInLogin />
      </div>
    </nav>
  );
}
