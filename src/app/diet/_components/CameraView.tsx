'use client';
import { useDietStore } from '@/store/useDietStore';
import { AiFillSlackCircle } from 'react-icons/ai';
import { FaCameraRetro } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoVisible: boolean;
  setPhotoData: (data: string | null) => void;
  onTakePhoto: () => void;
  onImageSelect?: (file: File) => void;
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function CameraView({ videoRef, isVideoVisible, setPhotoData, onTakePhoto }: CameraViewProps) {
  const { type } = useDietStore();

  const handleAttachingImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target?.result as string;
          setPhotoData(base64String); // PhotoView로 바로 전달
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <div className='h-[60px] text-white font-bold text-xl flex items-center pt-[10px] gap-4'>
        <FaCameraRetro />
        {`분석할 ${type} 음식을 촬영해 주세요`}
        <FaCameraRetro />
      </div>
      <main className='relative w-full h-[400px] lg:h-[500px] bg-black rounded-lg overflow-hidden'>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={isMobile() ? undefined : { transform: 'scaleX(-1)' }}
          className={`w-full h-full object-contain ${isVideoVisible ? 'block' : 'hidden'}`}
        />
        {!isVideoVisible && (
          <div className='absolute inset-0 flex items-center justify-center text-white'>카메라 로딩 중...</div>
        )}
      </main>
      <footer className='relative w-full flex justify-center items-center border-x-4 border-opacity-80 pb-[15px] border-neutral-500'>
        <button onClick={onTakePhoto} className='hover:scale-110 transform duration-200'>
          <AiFillSlackCircle size={60} color='white' />
        </button>
        <button
          onClick={handleAttachingImage}
          className='absolute right-10 hover:scale-110 p-3 rounded-full transform duration-200'
        >
          <GrGallery size={30} color='white' />
        </button>
      </footer>
    </div>
  );
}
