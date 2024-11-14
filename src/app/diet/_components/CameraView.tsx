'use client';
import { useDietStore } from '@/store/useDietStore';
import { AiFillSlackCircle } from 'react-icons/ai';
import { FaCameraRetro } from 'react-icons/fa';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoVisible: boolean;
  onTakePhoto: () => void;
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function CameraView({ videoRef, isVideoVisible, onTakePhoto }: CameraViewProps) {
  const { type } = useDietStore();

  return (
    <div className=' w-full flex flex-col items-center gap-4'>
      <div className='h-[60px] text-white font-bold text-xl flex items-center pt-[10px] gap-4'>
        <FaCameraRetro />
        {`분석할 ${type} 음식을 촬영해 주세요`}
        <FaCameraRetro />
      </div>
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
      <footer className='w-full flex justify-center  border-x-4  border-opacity-80 pb-[15px] border-neutral-500'>
        <button onClick={onTakePhoto} className='hover:scale-110'>
          <AiFillSlackCircle size={60} color='white' />
        </button>
      </footer>
    </div>
  );
}
