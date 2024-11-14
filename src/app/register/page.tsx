'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  nickname: string;
  height: string;
  weight: string;
  age: string;
  gender: 'MALE' | 'FEMALE';
  school_name: string;
  school_code: string;
  profileImage: File | null;
}

export default function PersonalInfoPage() {
  const defaultImage =
    'https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png';

  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    height: '',
    weight: '',
    age: '',
    gender: 'MALE',
    school_name: '',
    school_code: '',
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState<string>(defaultImage);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const info = {
      nickname: formData.nickname,
      height: Number(formData.height),
      weight: Number(formData.weight),
      age: Number(formData.age),
      gender: formData.gender,
      school_name: formData.school_name,
      school_code: formData.school_code,
    };

    const formDataToSend = new FormData();
    formDataToSend.append('info', JSON.stringify(info));

    if (formData.profileImage) {
      formDataToSend.append('profile_image', formData.profileImage);
    }

    try {
      const response = await axios.post('/api/member/sign-up', formDataToSend);
      if (response.data.status === 200) {
        alert('회원가입이 완료되었습니다!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <h1 className='text-2xl font-bold text-center'>회원정보</h1>

        {/* 프로필 이미지 */}
        <div className='text-center'>
          <img src={imagePreview} alt='Profile' className='w-24 h-24 rounded-full mx-auto object-cover' />
          <input type='file' id='profileImage' onChange={handleFileChange} className='hidden' />
          <button
            type='button'
            onClick={() => document.getElementById('profileImage')?.click()}
            className='mt-2 px-4 py-2 text-sm bg-gray-500 text-white rounded'
          >
            이미지 선택
          </button>
        </div>

        {/* 입력 필드들 */}
        <div className='space-y-4'>
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
              />
            </div>
          </div>

          <div>
            <label htmlFor='school_name' className='block text-gray-700'>
              학교명
            </label>
            <input
              type='text'
              name='school_name'
              value={formData.school_name}
              onChange={handleChange}
              className='w-full border-b border-blue-500 focus:outline-none'
            />
          </div>

          <div>
            <label htmlFor='school_code' className='block text-gray-700'>
              학교 코드
            </label>
            <input
              type='text'
              name='school_code'
              value={formData.school_code}
              onChange={handleChange}
              className='w-full border-b border-blue-500 focus:outline-none'
            />
          </div>
        </div>

        <button type='submit' className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
          다음
        </button>
      </form>
    </div>
  );
}
