'use client';
import { usePhotoStore } from '@/store/usePhotoStore';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NutritionChart from './NutritionChart';

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function PhotoDisplay() {
  const { photoData } = usePhotoStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (photoData) {
      const analyzePhoto = async () => {
        setIsLoading(true);
        setError(null);

        try {
          // const res = await axios.post('/apiUrl', { imageUrl: photoData });    사진 백엔드로 보내기
          // const res = await axios.get('https://dummyjson.com/products/3');
          // setAnalysisResult(res.data);
          setIsLoading(false);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err.message);
            // 나중에 콘솔 없애고 setError 에 err.message 넣기
            setError('사진 분석 중 오류가 발생했습니다.');
          }
        }
      };

      analyzePhoto();
    }
  }, [photoData]);

  if (!isMounted || isLoading) {
    return (
      <div>
        <p>사진 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center'>
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
    </div>
  );
}
