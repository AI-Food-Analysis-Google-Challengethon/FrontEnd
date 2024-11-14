// Profile.js
'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { FaUser, FaEnvelope, FaCamera } from 'react-icons/fa';

export default function Profile() {
  const { name, email } = useAuthStore();

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 flex items-start justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-24 relative'>
        <div className='absolute -top-16 left-1/2 -translate-x-1/2'>
          <div className='w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg relative'>
            <FaUser size={48} className='text-gray-500' />
            <button
              className='absolute bottom-0 right-0 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors'
              onClick={() => alert('프로필 사진 변경')}
            >
              <FaCamera size={16} className='text-white' />
            </button>
          </div>
        </div>

        <h2 className='text-2xl font-bold text-gray-800 text-center mt-16 mb-1'>{name}</h2>
        <p className='text-gray-500 text-center mb-6'>프로필</p>

        <div className='space-y-4'>
          <button className='w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
            <FaUser className='text-blue-500 text-xl' />
            <div className='text-left'>
              <p className='text-sm text-gray-500'>닉네임</p>
              <p className='font-medium'>{name}</p>
            </div>
          </button>

          <button className='w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
            <FaEnvelope className='text-blue-500 text-xl' />
            <div className='text-left'>
              <p className='text-sm text-gray-500'>이메일</p>
              <p className='font-medium'>{email}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
