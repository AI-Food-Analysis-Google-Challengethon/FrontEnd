'use client';
import { useDietStore } from '@/store/useDietStore';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NutritionChart from './NutritionChart';
import { redirect } from 'next/navigation';
import NutritionDisplay from './NutritionDisplay';

interface AnalysisResponse {
  status: number;
  data: {
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
  };
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const typeMapping: { [key: string]: string } = {
  아침: 'BREAKFAST',
  점심: 'LUNCH',
  저녁: 'DINNER',
};

export default function PhotoDisplay() {
  const { type, photoData, setBreakfastKcal, setLunchKcal, setDinnerKcal } = useDietStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<AnalysisResponse['data'] | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (photoData && type) {
      const analyzePhoto = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            throw new Error('인증 토큰이 없습니다.');
          }

          // 이미지 업로드
          const response = await fetch(photoData);
          const blob = await response.blob();
          const formData = new FormData();
          formData.append('image', blob, 'photo.jpg');

          const imageUploadRes = await axios.post('/api/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // 분석 요청 준비
          const today = new Date();
          const dateString =
            today.getFullYear() +
            String(today.getMonth() + 1).padStart(2, '0') +
            String(today.getDate()).padStart(2, '0');

          const dietsFormData = new FormData();
          dietsFormData.append('imageUrl', imageUploadRes.data.imageUrl);
          dietsFormData.append('type', typeMapping[type]);
          dietsFormData.append('date', dateString);

          // 분석 요청
          const analysisRes = await axios.post<AnalysisResponse>('/api/diets', dietsFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (analysisRes.status === 200) {
            setNutritionData(analysisRes.data.data);

            // 칼로리 업데이트
            if (type === '아침') {
              setBreakfastKcal(analysisRes.data.data.totalKcal);
            } else if (type === '점심') {
              setLunchKcal(analysisRes.data.data.totalKcal);
            } else if (type === '저녁') {
              setDinnerKcal(analysisRes.data.data.totalKcal);
            }
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
              redirect('/api/auth/signin');
            }
            setError(err.response?.data?.message || '사진 분석 중 오류가 발생했습니다.');
          }
        } finally {
          setIsLoading(false);
        }
      };

      analyzePhoto();
    }
  }, [photoData, type, setBreakfastKcal, setLunchKcal, setDinnerKcal]);

  if (!isMounted || isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <p className='text-lg text-gray-600'>사진 분석 중...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-extrabold my-8 text-blue-500'>{type} 음식 분석</h1>
      {error && <div className='text-xl text-red-600'>{error}</div>}
      <section className='flex flex-col justify-center items-center'>
        {photoData ? (
          <>
            <div
              className='relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]'
              style={isMobile() ? undefined : { transform: 'scaleX(-1)' }}
            >
              <Image src={photoData} fill alt='diet image' className='object-cover rounded-3xl' />
            </div>
            <h2 className='text-[15px] lg:text-[30px] mt-[20px] text-neutral-500'>AI 분석 결과</h2>
          </>
        ) : (
          <p>분석할 사진이 없습니다.</p>
        )}
      </section>
      <main className='mt-8 mb-[100px]'>
        {nutritionData && (
          <NutritionChart
            carbsCalories={nutritionData.carbs * 4}
            proteinCalories={nutritionData.protein * 4}
            fatCalories={nutritionData.fat * 9}
            etcCalories={
              nutritionData.totalKcal - nutritionData.carbs * 4 - nutritionData.protein * 4 - nutritionData.fat * 9
            }
          />
        )}
      </main>
      {nutritionData ? <NutritionDisplay nutritionData={nutritionData} /> : <div>영양 데이터가 없습니다.</div>}
    </div>
  );
}
