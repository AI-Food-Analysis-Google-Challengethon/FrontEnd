'use client';

import React from 'react';

const CalorieBar = ({ current = 0, max = 2000 }) => {
  const percentage = (current / max) * 100;

  return (
    <div className='w-full max-w-md'>
      <div className='w-[180px] lg:w-[400px] flex justify-between mb-1 items-center'>
        <span className='text-base font-semibold mr-[5px]'>{current}kcal</span>
        <span className='text-sm text-gray-500'>/ {max}kcal</span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-4'>
        <div className='bg-blue-400 h-4 rounded-full transition-all duration-300' style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default CalorieBar;
