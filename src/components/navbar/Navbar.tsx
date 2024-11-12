import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='w-full h-[80px] border-b-2 flex justify-center items-center shadow-sm'>
      <Link href='/' className='text-blue-400 text-3xl  font-bold  p-2 rounded-3xl hover:bg-blue-100 hover:scale-'>
        천리안
      </Link>
    </nav>
  );
}
