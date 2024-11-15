'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUtensils } from 'react-icons/fa';
import NutritionCard from './NutritionCard';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/school');
        setNutritionData(response.data);
        console.log('영양####@@@@@', response.data);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching nutrition data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  if (error) return <div className='p-4 bg-red-100 text-red-700 rounded-md'>{error}</div>;
  if (!nutritionData) return null;

  const formattedDate = nutritionData.date.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일');

  console.log('영양####@@@@@22222222222', nutritionData);

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl'>
      <h1 className='text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800'>
        <FaUtensils className='text-blue-500' />
        {formattedDate} {nutritionData.type === 'LUNCH' ? '점심' : '저녁'} 급식 영양 분석
      </h1>

      <div className='space-y-6'>
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>주요 영양소</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <NutritionCard title='탄수화물' value={nutritionData.carbs} unit='g' color='bg-blue-100' />
            <NutritionCard title='단백질' value={nutritionData.protein} unit='g' color='bg-green-100' />
            <NutritionCard title='지방' value={nutritionData.fat} unit='g' color='bg-yellow-100' />
          </div>
        </div>

        <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>비타민</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <NutritionCard title='비타민 A' value={nutritionData.vitaminA} unit='mg' color='bg-purple-100' />
            <NutritionCard title='비타민 B' value={nutritionData.vitaminB} unit='mg' color='bg-purple-100' />
            <NutritionCard title='비타민 C' value={nutritionData.vitaminC} unit='mg' color='bg-purple-100' />
          </div>
        </div>

        <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>미네랄 & 기타</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <NutritionCard title='칼륨' value={nutritionData.kalium} unit='mg' color='bg-orange-100' />
            <NutritionCard title='나트륨' value={nutritionData.natrium} unit='mg' color='bg-red-100' />
            <NutritionCard title='콜레스테롤' value={nutritionData.cholesterol} unit='mg' color='bg-pink-100' />
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700'>
          <h2 className='text-lg font-semibold mb-2'>총 열량</h2>
          <div className='text-4xl font-bold'>{nutritionData.totalKcal.toLocaleString()} kcal</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionForm;
