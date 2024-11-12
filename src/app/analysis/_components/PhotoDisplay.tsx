'use client';
import { usePhotoStore } from '@/store/usePhotoStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PhotoDisplay() {
  const { photoData } = usePhotoStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
          <p>분석 결과 표시</p>
        </div>
      </main>
    </div>
  );
}
