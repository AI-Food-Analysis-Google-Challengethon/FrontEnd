'use client';
import { useDietStore } from '@/store/useDietStore';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NutritionChart from './NutritionChart';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface CustomSession {
  accessToken?: string;
  nickname?: string;
  email?: string;
  expires: string;
}

interface AnalysisResponse {
  status: number;
  msg: string;
  data: {
    total_kcal: number;
    carbs: number;
    protein: number;
    fat: number;
    vitamin: {
      C: number;
      A: number;
      B: number;
    };
    kalium: number;
    natrium: number;
    cholesterol: number;
  };
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function PhotoDisplay() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  }) as { data: CustomSession | null; status: 'loading' | 'authenticated' | 'unauthenticated' };

  const { type, photoData } = useDietStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<AnalysisResponse['data'] | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (photoData && type && session?.accessToken) {
      const analyzePhoto = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(photoData);
          const blob = await response.blob();

          const formData = new FormData();
          formData.append('image', blob, 'photo.jpg');
          formData.append('type', type);
          formData.append('date', new Date().toISOString().slice(0, 10).replace(/-/g, ''));

          const res = await axios.post<AnalysisResponse>('http://localhost:8080/api/diet', formData, {
            headers: {
              accessToken: session.accessToken, // API 명세에 맞춰 헤더 이름 사용
            },
          });

          if (res.data.status === 200) {
            setNutritionData(res.data.data);
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err.message);
            //   if (err.response?.status === 401) {
            //     redirect('/api/auth/signin');
            //   }
            //   setError(err.response?.data?.msg || '사진 분석 중 오류가 발생했습니다.');
          }
        } finally {
          setIsLoading(false);
        }
      };

      analyzePhoto();
    }
  }, [photoData, type, session]);

  if (!isMounted || isLoading) {
    return (
      <div>
        <p>사진 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-extrabold my-8 text-blue-500'>{type} 음식 분석 결과</h1>
      {error && <div className='text-xl text-red-600'>알 수 없는 오류가 발생했습니다.</div>}
      <section className='flex flex-col justify-center items-center'>
        {photoData ? (
          <div
            className='relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]'
            style={isMobile() ? undefined : { transform: 'scaleX(-1)' }}
          >
            <Image src={photoData} fill alt='diet image' className='object-cover rounded-3xl' />
          </div>
        ) : (
          <p>분석할 사진이 없습니다.</p>
        )}
      </section>
      <main className='mt-8 mb-[100px]'>
        <NutritionChart carbsCalories={1200} proteinCalories={800} fatCalories={600} />
      </main>
      {nutritionData ? <section className=''>{nutritionData.total_kcal}</section> : <div>영양 데이터가 없습니다.</div>}
    </div>
  );
}
