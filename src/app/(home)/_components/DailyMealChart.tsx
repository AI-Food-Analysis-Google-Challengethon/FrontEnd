import CalorieBar from '@/components/chart/CalorieBar';
import Link from 'next/link';
import React from 'react';
import { FaCameraRetro } from 'react-icons/fa';

interface DailyMealProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  dayTime: string;
  calorie: number;
}

export default function DailyMealChart({ icon: Icon, iconColor, dayTime, calorie }: DailyMealProps) {
  const color = `text-${iconColor}-300`;
  return (
    <section className='w-full flex justify-evenly items-center gap-4 mb-2 hover:scale-110 duration-200 shadow-sm'>
      <Icon size={45} className={color} />
      <div className='flex flex-col items-center'>
        <h1 className='font-bold'>{dayTime}</h1>
        <CalorieBar current={calorie} max={2000} />
      </div>
      <Link href='/diet' className='hover:scale-110'>
        <FaCameraRetro size={30} />
      </Link>
    </section>
  );
}
