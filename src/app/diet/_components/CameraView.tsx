'use client';
interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoVisible: boolean;
  onTakePhoto: () => void;
  onStopCamera: () => void;
}

export const CameraView = ({ videoRef, isVideoVisible, onTakePhoto, onStopCamera }: CameraViewProps) => (
  <div className='flex flex-col items-center gap-4 w-full max-w-md'>
    <div className='relative w-full bg-black rounded-lg overflow-hidden' style={{ aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover ${isVideoVisible ? 'block' : 'hidden'}`}
      />
      {!isVideoVisible && (
        <div className='absolute inset-0 flex items-center justify-center text-white'>카메라 로딩 중...</div>
      )}
    </div>

    <div className='flex gap-2'>
      <button onClick={onTakePhoto} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
        사진 촬영
      </button>
      <button onClick={onStopCamera} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
        카메라 중지
      </button>
    </div>
  </div>
);
