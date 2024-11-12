'use client';
import { CameraView } from './CameraView';
import { PhotoView } from './PhotoView';
import { useCamera } from '@/hooks/useCamera';

export const Camera = () => {
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
  } = useCamera(1.0); // 기본 최대 품질로 설정

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
    <>
      {error && <div className='text-red-500 p-2 bg-red-100 rounded'>에러: {error}</div>}

      {!stream && !photoData && (
        <button
          onClick={startCamera}
          className='w-[120px] h-[45px] px-4 py-2 bg-blue-500 font-semibold text-white rounded-2xl hover:bg-blue-600 duration-200'
        >
          사진 찍기
        </button>
      )}

      {stream && (
        <CameraView
          videoRef={videoRef}
          isVideoVisible={videoVisible}
          onTakePhoto={handleTakePhoto}
          onStopCamera={stopCamera}
        />
      )}

      <canvas ref={canvasRef} className='hidden' />

      {photoData && <PhotoView photoData={photoData} onSave={savePhoto} onRetake={handleRetake} />}
    </>
  );
};

export default Camera;
