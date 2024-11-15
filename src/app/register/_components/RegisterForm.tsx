'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/useAuthStore';

interface FormData {
  nickname: string;
  height: string;
  weight: string;
  age: string;
  gender: 'MALE' | 'FEMALE';
  schoolName: string;
  schoolCode: string;
}

export default function RegisterForm() {
  const { data: session } = useSession();
  const defaultImage = session?.user?.image || '';
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    height: '',
    weight: '',
    age: '',
    gender: 'MALE',
    schoolName: '',
    schoolCode: '',
  });
  const { setInfo } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       setFormData((prev) => ({ ...prev, profileImage: file }));
  //       setProfileImage(URL.createObjectURL(file));
  //     }
  //   };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        ...formData,
        height: Number(formData.height),
        weight: Number(formData.weight),
        age: Number(formData.age),
        // profileImage: profileImage,
        prifileImage: defaultImage,
      });

      if (response.data.status === 200) {
        setInfo(
          Number(formData.height),
          Number(formData.weight),
          Number(formData.age),
          formData.gender,
          formData.schoolName,
          formData.schoolCode,
          //   profileImage
          defaultImage
        );
        alert('회원가입이 완료되었습니다!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* 프로필 이미지 */}
      <div className='text-center'>
        {/* <Image src={profileImage} alt='Profile' width={96} height={96} className='rounded-full mx-auto object-cover' /> */}
        <input type='file' id='profileImage' className='hidden' accept='image/*' />
        <button
          type='button'
          //   onClick={() => document.getElementById('profileImage')?.click()}
          className='mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded'
        >
          이미지 선택
        </button>
      </div>

      {/* 입력 필드들 */}
      <div className='space-y-3'>
        <div>
          <label htmlFor='nickname' className='block text-gray-700'>
            닉네임
          </label>
          <input
            type='text'
            name='nickname'
            value={formData.nickname}
            onChange={handleChange}
            className='w-full border-b border-blue-500 focus:outline-none'
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='age' className='block text-gray-700'>
              나이
            </label>
            <input
              type='number'
              name='age'
              value={formData.age}
              onChange={handleChange}
              className='w-full border-b border-blue-500 focus:outline-none'
            />
          </div>
          <div>
            <label htmlFor='gender' className='block text-gray-700'>
              성별
            </label>
            <select
              name='gender'
              value={formData.gender}
              onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value as 'MALE' | 'FEMALE' }))}
              className='w-full border-b border-blue-500 focus:outline-none'
            >
              <option value='MALE'>남성</option>
              <option value='FEMALE'>여성</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='height' className='block text-gray-700'>
              신장(cm)
            </label>
            <input
              type='number'
              name='height'
              value={formData.height}
              onChange={handleChange}
              className='w-full border-b border-blue-500 focus:outline-none'
              step='0.1'
            />
          </div>
          <div>
            <label htmlFor='weight' className='block text-gray-700'>
              체중(kg)
            </label>
            <input
              type='number'
              name='weight'
              value={formData.weight}
              onChange={handleChange}
              className='w-full border-b border-blue-500 focus:outline-none'
              step='0.1'
            />
          </div>
        </div>

        <div>
          <label htmlFor='schoolName' className='block text-gray-700'>
            학교명
          </label>
          <input
            type='text'
            name='schoolName'
            value={formData.schoolName}
            onChange={handleChange}
            className='w-full border-b border-blue-500 focus:outline-none'
          />
        </div>

        <div>
          <label htmlFor='schoolCode' className='block text-gray-700'>
            학교 코드
          </label>
          <input
            type='text'
            name='schoolCode'
            value={formData.schoolCode}
            onChange={handleChange}
            className='w-full border-b border-blue-500 focus:outline-none'
          />
        </div>
      </div>

      <button type='submit' className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
        다음
      </button>
    </form>
  );
}
