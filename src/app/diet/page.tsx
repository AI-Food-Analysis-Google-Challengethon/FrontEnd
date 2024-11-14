'use client';
import { useEffect } from 'react';
import { useCamera } from '@/hooks/useCamera';
import CameraView from './_components/CameraView';
import { PhotoView } from './_components/PhotoView';

const containerStyle = 'x-[450px] h-[450px] md:w-[490px] md:h-[490px]';

export default function CameraPage() {
  const {
    stream,
    error,
    photoData,
    videoVisible,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    takePhoto,
    savePhoto,
    setPhotoData,
  } = useCamera(1.0);

  useEffect(() => {
    startCamera();
    // cleanup function
    return () => {
      stopCamera();
    };
  }, []);

  const handleTakePhoto = () => {
    takePhoto();
    if (photoData) {
    }
  };

  const handleRetake = () => {
    setPhotoData(null);
    startCamera();
  };

  return (
    <main className='bg-black w-full h-[calc(100vh-70px)] flex flex-col items-center'>
      {error && <div className='text-red-500 p-2 bg-red-100 rounded'>에러: {error}</div>}

      {stream && (
        <div className={containerStyle}>
          <CameraView videoRef={videoRef} isVideoVisible={videoVisible} onTakePhoto={handleTakePhoto} />
        </div>
      )}

      <canvas ref={canvasRef} className='hidden' />
      {photoData && (
        <div className={containerStyle}>
          <PhotoView photoData={photoData} onSave={savePhoto} onRetake={handleRetake} />
        </div>
      )}
    </main>
  );
}
