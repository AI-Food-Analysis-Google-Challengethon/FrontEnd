'use client';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import { IoFastFoodOutline } from 'react-icons/io5';
import getCroppedImg from './getCroppedImg';
import { useDietStore } from '@/store/useDietStore';

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

interface PhotoViewProps {
  photoData: string;
  onSave: () => void;
  onRetake: () => void;
}

export const PhotoView = ({ photoData, onSave, onRetake }: PhotoViewProps) => {
  const { setPhotoData } = useDietStore();
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const { type } = useDietStore();

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(photoData, croppedAreaPixels);
        setCroppedImage(croppedImage);
        setIsCropping(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, photoData]);

  const handleAnalysis = () => {
    setPhotoData(croppedImage || photoData);
  };

  const handleSave = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = 'cropped-photo.jpg';
      link.click();
    } else {
      onSave();
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <div className='h-[40px] text-xl font-bold text-white flex items-center gap-4 pt-[10px]'>
        <IoFastFoodOutline />
        {`촬영한 ${type}사진`} <IoFastFoodOutline />
      </div>
      <div className='w-full h-[400px] lg:h-[500px] bg-black rounded-lg overflow-hidden relative'>
        {isCropping ? (
          <div className='relative w-[400px] h-[400px]'>
            <Cropper
              image={photoData}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#000',
                },
              }}
            />
          </div>
        ) : (
          <img
            src={croppedImage || photoData}
            alt='촬영된 사진'
            className={`w-full h-full object-contain ${isMobile() ? '' : 'scale-x-[-1]'}`}
          />
        )}
      </div>
      <div className='flex items-center gap-2 flex-wrap justify-center'>
        {!isCropping && (
          <>
            <button onClick={handleSave} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
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
            <button
              onClick={() => setIsCropping(true)}
              className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
            >
              사진 자르기
            </button>
          </>
        )}
        {isCropping && (
          <div className='flex flex-col items-center gap-5 pt-2'>
            <button onClick={handleCropImage} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
              잘라내기 완료
            </button>
            <button
              onClick={() => setIsCropping(false)}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            >
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
