import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-full flex justify-center mt-[200px]'>
      <main>
        <Link
          href='/diet'
          className='bg-blue-400 h-[200px] text-white font-semibold rounded-xl p-2 hover:bg-blue-500 hover:scale-105'
        >
          식단 영양 분석 페이지
        </Link>
      </main>
    </div>
  );
}
