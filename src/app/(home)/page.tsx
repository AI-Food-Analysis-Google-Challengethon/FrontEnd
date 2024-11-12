import Link from 'next/link';

export default function Home() {
  return (
    <main className='w-full min-h-screen flex justify-center items-center'>
      <Link href='/diet' className='bg-blue-500 text-white font-semibold rounded-xl p-2'>
        식단 영양 분석 페이지
      </Link>
    </main>
  );
}
