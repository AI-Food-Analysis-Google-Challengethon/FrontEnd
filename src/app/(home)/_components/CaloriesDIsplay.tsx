'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import DailyMealChart from './DailyMealChart';
import { MdOutlineWbSunny } from 'react-icons/md';
import { IoPartlySunnyOutline } from 'react-icons/io5';
import { FaRegMoon } from 'react-icons/fa';

const divChartClassName = 'w-full flex justify-between items-center';

interface DailyData {
  breakfastKcal: number | null;
  lunchKcal: number | null;
  dinnerKcal: number | null;
}

export default function CaloriesDisplay() {
  const [dailyData, setDailyData] = useState<DailyData>({
    breakfastKcal: null,
    lunchKcal: null,
    dinnerKcal: null,
  });

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const storageToken = localStorage.getItem('accessToken');
        if (!storageToken) {
          redirect('/api/auth/signin');
          return;
        }

        const response = await axios.get('/api/daily', {
          headers: {
            Authorization: `Bearer ${storageToken}`,
          },
        });

        if (response.data?.data) {
          setDailyData({
            breakfastKcal: response.data.data.breakfastKcal,
            lunchKcal: response.data.data.lunchKcal,
            dinnerKcal: response.data.data.dinnerKcal,
          });
        }
      } catch (error) {
        console.error('Failed to fetch daily data:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          redirect('/api/auth/signin');
        }
      }
    };

    fetchDailyData();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <div className={divChartClassName}>
        <MdOutlineWbSunny size={50} className='text-yellow-300 ml-2' />
        <DailyMealChart type='아침' calorie={dailyData.breakfastKcal} />
      </div>
      <div className={divChartClassName}>
        <IoPartlySunnyOutline size={40} className='text-blue-300 ml-2' />
        <DailyMealChart type='점심' calorie={dailyData.lunchKcal} />
      </div>
      <div className={divChartClassName}>
        <FaRegMoon size={40} className='text-blue-300 ml-2' />
        <DailyMealChart type='저녁' calorie={dailyData.dinnerKcal} />
      </div>
    </div>
  );
}
