'use client';
import { usePhotoStore } from '@/store/usePhotoStore';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AnalysisResultProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  foodName: string;
}

export default function PhotoDisplay() {
  const { photoData } = usePhotoStore();
  const [isMounted, setIsMounted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultProps | null>(null);
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
          const res = await axios.get('https://dummyjson.com/products/3');

          const dummyAnalysis: AnalysisResultProps = {
            calories: res.data.price, // price를 칼로리로 변환
            protein: Math.floor(res.data.rating * 2), // rating을 단백질로 변환
            carbs: Math.floor(res.data.stock / 2), // stock을 탄수화물로 변환
            fat: Math.floor(res.data.discountPercentage), // discount를 지방으로 변환
            foodName: res.data.title, // 제품 이름을 음식 이름으로 사용
          };

          setAnalysisResult(dummyAnalysis);
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

  if (!isMounted) {
    return (
      <div>
        <p>사진 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <h2 className='text-purple-500 font-semibold'>음식 사진</h2>
        {photoData ? (
          <Image src={photoData} width={300} height={300} alt='diet image' className='object-cover rounded-lg' />
        ) : (
          <p>분석할 사진이 없습니다.</p>
        )}
      </section>
      <main>
        <h2 className='text-purple-500 font-semibold'>분석 결과</h2>
        <div className='w-96 h-96 bg-gray-200 rounded-xl flex justify-center items-center'>
          {isLoading ? (
            <p>분석 중...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : analysisResult ? (
            <div className='space-y-2'>
              <p className='font-bold text-lg'>{analysisResult.foodName}</p>
              <p>칼로리: {analysisResult.calories}kcal</p>
              <p>단백질: {analysisResult.protein}g</p>
              <p>탄수화물: {analysisResult.carbs}g</p>
              <p>지방: {analysisResult.fat}g</p>
            </div>
          ) : (
            <p>분석을 시작하세요.</p>
          )}
          <p>분석 결과 표시</p>
        </div>
      </main>
    </div>
  );
}
