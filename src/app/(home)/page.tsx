import GaugeChart from '@/components/chart/GaugeChart';
import { FaRegMoon } from 'react-icons/fa';
import { IoPartlySunnyOutline } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';
import DailyMealChart from './_components/DailyMealChart';

const divChartClassName = 'w-full flex justify-between items-center';

export default function Home() {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-[20px]'>
      <div className='flex flex-col justify-center items-center mb-2'>
        <h1 className='text-2xl font-semibold mb-2'>오늘의 식사 점수는?</h1>
        <GaugeChart value={75} />
      </div>
      <main className='w-[400px] mb-[50px] lg:w-[700px] py-[10px] flex flex-col items-center gap-4 px-4 shadow-lg rounded-lg'>
        <div className={divChartClassName}>
          <MdOutlineWbSunny size={50} className='text-yellow-300 ml-2' />
          <DailyMealChart type='아침' calorie={800} />
        </div>
        <div className={divChartClassName}>
          <IoPartlySunnyOutline size={40} className='text-blue-300 ml-2' />
          <DailyMealChart type='점심' calorie={1600} />
        </div>
        <div className={divChartClassName}>
          <FaRegMoon size={40} className='text-blue-300 ml-2' />
          <DailyMealChart type='저녁' calorie={1200} />
        </div>
      </main>
    </div>
  );
}
