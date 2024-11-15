'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { FaUser, FaEnvelope, FaRulerVertical, FaWeight, FaBirthdayCake, FaVenusMars, FaSchool } from 'react-icons/fa';

export default function Profile() {
  const { name, email, height, weight, age, gender, schoolName, schoolCode } = useAuthStore();

  const profileItems = [
    { Icon: FaUser, label: '닉네임', value: name || '-' },
    { Icon: FaEnvelope, label: '이메일', value: email || '-' },
    { Icon: FaRulerVertical, label: '키', value: height ? `${height}cm` : '-' },
    { Icon: FaWeight, label: '몸무게', value: weight ? `${weight}kg` : '-' },
    { Icon: FaBirthdayCake, label: '나이', value: age ? `${age}세` : '-' },
    { Icon: FaVenusMars, label: '성별', value: gender || '-' },
    { Icon: FaSchool, label: '학교', value: schoolName || '-' },
    { Icon: FaSchool, label: '학교 코드', value: schoolCode || '-' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 flex items-start justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-24 relative'>
        <div className='absolute -top-16 left-1/2 -translate-x-1/2'>
          <div className='w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg'>
            <FaUser size={48} className='text-gray-500' />
          </div>
        </div>

        <h2 className='text-2xl font-bold text-gray-800 text-center mt-16 mb-1'>{name || '-'}</h2>
        <p className='text-gray-500 text-center mb-6'>프로필</p>

        <div className='space-y-4'>
          {profileItems.map((item, index) => (
            <button
              key={index}
              className='w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
            >
              <item.Icon className='text-blue-500 text-xl' />
              <div className='text-left'>
                <p className='text-sm text-gray-500'>{item.label}</p>
                <p className='font-medium'>{item.value}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
