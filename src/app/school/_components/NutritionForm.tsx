'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUtensils } from 'react-icons/fa';
import NutritionCard from './NutritionCard';
import { useSearchParams } from 'next/navigation';

interface ApiResponse {
  totalKcal: number;
  carbs: number;
  protein: number;
  fat: number;
  kalium: number;
  natrium: number;
  cholesterol: number;
  vitaminA: number;
  vitaminB: number;
  vitaminC: number;
  date: string;
  type: string;
}

const NutritionForm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nutritionData, setNutritionData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  useEffect(() => {
    const fetchData = async () => {
      if (!date) {
        setError('날짜 정보가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/school?date=${date}`);
        setNutritionData(response.data.data);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching nutrition data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  if (loading) return <div className='flex justify-center p-8'>로딩중...</div>;
  if (error) return <div className='p-4 bg-red-100 text-red-700 rounded-md'>{error}</div>;
  if (!nutritionData) return null;

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <FaUtensils className='text-blue-500' />
        {date?.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일')} 급식 영양 분석
      </h1>

      <div className='space-y-6'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>주요 영양소</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <NutritionCard title='탄수화물' value={nutritionData.carbs} unit='g' color='bg-blue-100' />
            <NutritionCard title='단백질' value={nutritionData.protein} unit='g' color='bg-green-100' />
            <NutritionCard title='지방' value={nutritionData.fat} unit='g' color='bg-yellow-100' />
          </div>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>비타민</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <NutritionCard title='비타민 A' value={nutritionData.vitaminA} unit='mg' color='bg-purple-100' />
            <NutritionCard title='비타민 B' value={nutritionData.vitaminB} unit='mg' color='bg-purple-100' />
            <NutritionCard title='비타민 C' value={nutritionData.vitaminC} unit='mg' color='bg-purple-100' />
          </div>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>미네랄 & 기타</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <NutritionCard title='칼륨' value={nutritionData.kalium} unit='mg' color='bg-orange-100' />
            <NutritionCard title='나트륨' value={nutritionData.natrium} unit='mg' color='bg-red-100' />
            <NutritionCard title='콜레스테롤' value={nutritionData.cholesterol} unit='mg' color='bg-pink-100' />
          </div>
        </div>

        <div className='bg-blue-500 text-white p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>총 열량</h2>
          <div className='text-3xl font-bold'>{nutritionData.totalKcal.toLocaleString()} kcal</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionForm;
