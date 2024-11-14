'use client';
import CalorieBar from '@/components/chart/CalorieBar';
import { useDietStore } from '@/store/useDietStore';
import Link from 'next/link';
import React from 'react';
import { FaCameraRetro } from 'react-icons/fa';

interface DailyMealProps {
  type: string;
  calorie: number;
}

export default function DailyMealChart({ type, calorie }: DailyMealProps) {
  const { setType } = useDietStore();

  const handleLink = () => {
    setType(type);
  };

  return (
    <section className='w-full flex justify-evenly items-center gap-4 mb-2 hover:scale-110 transform duration-200 shadow-sm'>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold'>{type}</h1>
        <CalorieBar current={calorie} max={2000} />
      </div>
      <Link href='/diet' onClick={handleLink} className='transform hover:scale-110'>
        <FaCameraRetro size={30} />
      </Link>
    </section>
  );
}
