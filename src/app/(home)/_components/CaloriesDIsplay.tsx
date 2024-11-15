'use client';
import { useDietStore } from '@/store/useDietStore';
import DailyMealChart from './DailyMealChart';
import { MdOutlineWbSunny } from 'react-icons/md';
import { IoPartlySunnyOutline } from 'react-icons/io5';
import { FaRegMoon } from 'react-icons/fa';

const divChartClassName = 'w-full flex justify-between items-center';

export default function CaloriesDisplay() {
  const { breakfastKcal, lunchKcal, dinnerKcal } = useDietStore();

  return (
    <div className='flex flex-col gap-4'>
      <div className={divChartClassName}>
        <MdOutlineWbSunny size={50} className='text-yellow-300 ml-2' />
        <DailyMealChart type='아침' calorie={breakfastKcal} />
      </div>
      <div className={divChartClassName}>
        <IoPartlySunnyOutline size={40} className='text-blue-300 ml-2' />
        <DailyMealChart type='점심' calorie={lunchKcal} />
      </div>
      <div className={divChartClassName}>
        <FaRegMoon size={40} className='text-blue-300 ml-2' />
        <DailyMealChart type='저녁' calorie={dinnerKcal} />
      </div>
    </div>
  );
}
