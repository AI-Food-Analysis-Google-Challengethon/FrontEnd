'use client';

import { useState } from 'react';
import axios from 'axios';
import { FaUtensils, FaCalendar, FaChartBar } from 'react-icons/fa';
import NutritionCard from './NutritionCard';

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER';
export interface VitaminData {
  A: number;
  B: number;
  C: number;
}
export interface NutritionData {
  total_kcal: number;
  carbs: number;
  protein: number;
  fat: number;
  vitamin: VitaminData;
  kalium: number;
  natrium: number;
  cholesterol: number;
}
export interface ApiResponse {
  status: number;
  msg: string;
  data: NutritionData;
}

const NutritionForm = () => {
  const [date, setDate] = useState<string>('');
  const [mealType, setMealType] = useState<MealType | ''>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const response = await axios.post<ApiResponse>('http://localhost:8080/api/school-food-analysis', {
        type: mealType,
        date: date.replace(/-/g, ''),
      });

      setNutritionData(response.data.data);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
      console.error('Error fetching nutrition data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <FaUtensils className='text-blue-500' />
        학교 급식 영양 분석
      </h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex gap-4 flex-wrap'>
          <div className='flex-1 min-w-[200px]'>
            <label className='flex text-sm font-medium mb-1 items-center gap-1'>
              <FaCalendar className='text-gray-500' />
              날짜
            </label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>

          <div className='flex-1 min-w-[200px]'>
            <label className='block text-sm font-medium mb-1'>식사 구분</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as MealType)}
              className='w-full px-3 py-2 border rounded-md'
              required
            >
              <option value=''>선택해주세요</option>
              <option value='BREAKFAST'>아침</option>
              <option value='LUNCH'>점심</option>
              <option value='DINNER'>저녁</option>
            </select>
          </div>

          <div className='flex-1 min-w-[200px] flex items-end'>
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center gap-2'
            >
              {loading ? <span className='animate-spin'>⌛</span> : <FaChartBar />}
              분석하기
            </button>
          </div>
        </div>
      </form>

      {error && <div className='mt-4 p-4 bg-red-100 text-red-700 rounded-md'>{error}</div>}

      {nutritionData && (
        <div className='mt-6 space-y-6'>
          {/* 주요 영양소 */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-lg font-semibold mb-4'>주요 영양소</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <NutritionCard title='탄수화물' value={nutritionData.carbs} unit='g' color='bg-blue-100' />
              <NutritionCard title='단백질' value={nutritionData.protein} unit='g' color='bg-green-100' />
              <NutritionCard title='지방' value={nutritionData.fat} unit='g' color='bg-yellow-100' />
            </div>
          </div>

          {/* 비타민 */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-lg font-semibold mb-4'>비타민</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {(Object.entries(nutritionData.vitamin) as [keyof VitaminData, number][]).map(([key, value]) => (
                <NutritionCard key={key} title={`비타민 ${key}`} value={value} unit='mg' color='bg-purple-100' />
              ))}
            </div>
          </div>

          {/* 미네랄 */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-lg font-semibold mb-4'>미네랄 & 기타</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <NutritionCard title='칼륨' value={nutritionData.kalium} unit='mg' color='bg-orange-100' />
              <NutritionCard title='나트륨' value={nutritionData.natrium} unit='mg' color='bg-red-100' />
              <NutritionCard title='콜레스테롤' value={nutritionData.cholesterol} unit='mg' color='bg-pink-100' />
            </div>
          </div>

          {/* 총 열량 */}
          <div className='bg-blue-500 text-white p-4 rounded-lg'>
            <h2 className='text-lg font-semibold mb-2'>총 열량</h2>
            <div className='text-3xl font-bold'>{nutritionData.total_kcal.toLocaleString()} kcal</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionForm;
