import GaugeChart from '@/app/(home)/_components/GaugeChart';
import CaloriesDisplay from './_components/CaloriesDIsplay';

export default function Home() {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-[20px]'>
      <div className='flex flex-col justify-center items-center mb-2'>
        <h1 className='text-2xl font-semibold mb-2'>오늘의 식사 점수는?</h1>
        <GaugeChart />
      </div>
      <main className='w-[400px] mb-[50px] lg:w-[700px] py-[10px] flex flex-col items-center gap-4 px-4 shadow-lg rounded-lg'>
        <CaloriesDisplay />
      </main>
    </div>
  );
}
