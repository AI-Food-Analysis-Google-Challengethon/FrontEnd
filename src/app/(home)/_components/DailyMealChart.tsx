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
  return (
    <section className='flex items-center gap-4 mb-4 hover:scale-110 duration-200'>
      <Icon size={45} className={`text-${iconColor}-300`} />
      <div className='flex flex-col'>
        <h1 className='font-bold'>{dayTime}</h1>
        <h2>{calorie}karl</h2>
        <CalorieBar current={calorie} max={3000} />
      </div>
      <Link href='/diet' className='hover:scale-110'>
        <FaCameraRetro size={30} />
      </Link>
    </section>
  );
}
