'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const GaugeChart = ({ value = 60, min = 0, max = 100 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className='w-full max-w-md mx-auto h-[200px]' />;
  }

  const percentage = ((value - min) / (max - min)) * 100;

  const data = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ];

  const COLORS = ['#0088FE', '#EAEAEA'];

  return (
    <div className='w-full max-w-md mx-auto flex flex-col items-center'>
      <PieChart width={400} height={100}>
        <Pie
          data={data}
          cx={200}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={0}
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className='text-center -mt-10'>
        <div className='text-2xl font-bold text-gray-800'>{value}</div>
        <div className='text-sm text-gray-500'>/ {max}</div>
      </div>
    </div>
  );
};

export default GaugeChart;
