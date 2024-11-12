'use client';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <button onClick={handleBack} className=' text-blue-400 p-1'>
      <IoMdArrowRoundBack size={38} />
    </button>
  );
}
