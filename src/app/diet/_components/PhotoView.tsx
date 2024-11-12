'use client';
import { usePhotoStore } from '@/store/usePhotoStore';
import Link from 'next/link';

interface PhotoViewProps {
  photoData: string;
  onSave: () => void;
  onRetake: () => void;
}

export const PhotoView = ({ photoData, onSave, onRetake }: PhotoViewProps) => {
  const { setPhotoData } = usePhotoStore();

  const handleAnalysis = () => {
    setPhotoData(photoData);
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full h-full'>
      <div className='w-full h-full bg-black rounded-lg overflow-hidden'>
        <img src={photoData} alt='촬영된 사진' className='w-full h-full object-cover' />
      </div>
      <div className='flex items-center gap-2'>
        <button onClick={onSave} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
          사진 저장
        </button>
        <Link
          href='/analysis'
          onClick={handleAnalysis}
          className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600'
        >
          식단 분석하기
        </Link>
        <button onClick={onRetake} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          다시 촬영
        </button>
      </div>
    </div>
  );
};
