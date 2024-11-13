'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CalorieBar = ({ current = 0, max = 2000 }) => {
  // Prepare data for the chart
  const data = [
    {
      name: 'Calories',
      current: current,
      remaining: max - current,
    },
  ];

  return (
    <div className='w-full'>
      <div className='w-[180px] lg:w-[400px] flex justify-between mb-1 items-center'>
        <span className='text-base font-semibold mr-[5px]'>{current}kcal</span>
        <span className='text-sm text-gray-500'>/ {max}kcal</span>
      </div>

      <div className='h-16 w-[180px] lg:w-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} layout='vertical' stackOffset='expand' barSize={16}>
            <XAxis type='number' hide />
            <YAxis type='category' hide dataKey='name' />
            <Tooltip
              formatter={(value) => `${value}kcal`}
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey='current'
              fill='#60A5FA'
              stackId='stack'
              animationDuration={1000}
              animationBegin={0}
              radius={[4, 0, 0, 4]}
            />
            <Bar
              dataKey='remaining'
              fill='#E5E7EB'
              stackId='stack'
              animationDuration={1000}
              animationBegin={0}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CalorieBar;
