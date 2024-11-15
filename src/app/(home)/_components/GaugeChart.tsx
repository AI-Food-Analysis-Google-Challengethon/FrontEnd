'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import { redirect } from 'next/navigation';

const GaugeChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [advice, setAdvice] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setIsMounted(true);

    const fetchDailyData = async () => {
      try {
        const storageToken = localStorage.getItem('accessToken');

        const response = await axios.get('/api/daily', {
          headers: {
            Authorization: `Bearer ${storageToken}`,
          },
        });

        console.log('콘솔!!!!', response);

        if (response.data.data) {
          setScore(response.data.data.score);
          setAdvice(response.data.data.advice);
          const rawDate = response.data.data.date;
          const formattedDate = `${rawDate.slice(0, 4)}.${rawDate.slice(4, 6)}.${rawDate.slice(6, 8)}`;
          setDate(formattedDate);
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

  if (!isMounted) {
    return <div className='w-full max-w-md mx-auto h-[200px]' />;
  }

  const percentage = score;

  const data = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ];

  const COLORS = ['#0088FE', '#EAEAEA'];

  return (
    <div className='w-full max-w-md mx-auto flex flex-col items-center'>
      <div className='text-lg text-gray-600 mb-4'>{date}</div>
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
        <div className='text-2xl font-bold text-gray-800'>{score}</div>
        <div className='text-sm text-gray-500'>/ 100</div>
      </div>
      {advice && (
        <div className='mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl'>
          <p className='text-sm text-gray-700 leading-relaxed'>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default GaugeChart;
