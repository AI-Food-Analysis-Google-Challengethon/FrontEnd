'use client';

import { AiFillSlackCircle } from 'react-icons/ai';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoVisible: boolean;
  onTakePhoto: () => void;
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const CameraView = ({ videoRef, isVideoVisible, onTakePhoto }: CameraViewProps) => (
  <div className=' w-full flex flex-col items-center gap-4'>
    <main className='relative w-full  bg-black rounded-lg overflow-hidden'>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={isMobile() ? undefined : { transform: 'scaleX(-1)' }}
        className={`w-full object-contain ${isVideoVisible ? 'block' : 'hidden'}`}
      />
      {!isVideoVisible && (
        <div className='absolute inset-0 flex items-center justify-center text-white'>카메라 로딩 중...</div>
      )}
    </main>
    <footer className='w-full flex justify-center  border-x-2 border-b-2 border-opacity-80 pb-[15px] border-neutral-500'>
      <button onClick={onTakePhoto} className='hover:scale-110'>
        <AiFillSlackCircle size={60} color='white' />
      </button>
    </footer>
  </div>
);
