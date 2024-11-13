import CalorieBar from '@/components/chart/CalorieBar';
import GaugeChart from '@/components/chart/GaugeChart';
import Link from 'next/link';
import { FaCameraRetro, FaRegMoon } from 'react-icons/fa';
import { IoPartlySunnyOutline } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';
import DailyMealChart from './_components/DailyMealChart';

export default function Home() {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-[40px]'>
      <div className='flex flex-col justify-center items-center mb-12'>
        <h1 className='text-2xl font-semibold mb-2'>오늘의 식사 점수는?</h1>
        <GaugeChart value={75} />
      </div>
      <main className='w-[400px] lg:w-[700px] py-[30px] flex flex-col items-center gap-2 px-4 shadow-lg rounded-lg'>
        <DailyMealChart icon={MdOutlineWbSunny} iconColor='yellow' dayTime='아침' calorie={800} />
        <DailyMealChart icon={IoPartlySunnyOutline} iconColor='blue' dayTime='점심' calorie={1800} />
        <DailyMealChart icon={FaRegMoon} iconColor='black' dayTime='저녁' calorie={1200} />
      </main>
    </div>
  );
}
