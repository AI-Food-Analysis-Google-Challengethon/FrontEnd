'use client';
import { usePhotoStore } from '@/store/usePhotoStore';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

interface PhotoViewProps {
  photoData: string;
  onSave: () => void;
  onRetake: () => void;
}

// 이미지 크롭 함수
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // 캔버스 설정
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // 이미지 그리기
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/jpeg');
}

export const PhotoView = ({ photoData, onSave, onRetake }: PhotoViewProps) => {
  const { setPhotoData } = usePhotoStore();
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

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
      // 크롭된 이미지가 있으면 그것을 저장
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = 'cropped-photo.jpg';
      link.click();
    } else {
      // 없으면 원본 저장
      onSave();
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full h-full'>
      <div className='w-full h-full bg-black rounded-lg overflow-hidden relative'>
        {isCropping ? (
          <div className='relative w-full h-full'>
            <Cropper
              image={photoData}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
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
          <>
            <button onClick={handleCropImage} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
              잘라내기 완료
            </button>
            <button
              onClick={() => setIsCropping(false)}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            >
              취소
            </button>
          </>
        )}
      </div>
    </div>
  );
};
