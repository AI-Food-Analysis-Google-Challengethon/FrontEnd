"use client";
import { API_URL } from '@/app/api/[auth]/[...nextauth]/constant';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SignUpFormData {
    nickname: string;
    age: number;
    weight: number;
    height: number;
    hasChronicDisease: boolean;
    profileImage?: File | null;
}

export default function register() {
    const [formData, setFormData] = useState<SignUpFormData>({
        nickname: '',
        age: 0,
        weight: 0,
        height: 0,
        hasChronicDisease: false,
        profileImage: null,
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value, type, files } = e.target;
    
        if (type === 'file') {
          setFormData({
            ...formData, // 기존 모든 속성을 복사
            profileImage: files ? files[0] : null,
          });
        } else if (type === 'radio') {
          setFormData({
            ...formData,
            hasChronicDisease: value === 'yes',
          });
        } else {
          setFormData({
            ...formData,
            [name]: type === 'number' ? +value : value,
          });
        }
      };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
    
        const submitData = new FormData();
        submitData.append('nickname', formData.nickname);
        submitData.append('age', formData.age.toString());
        submitData.append('weight', formData.weight.toString());
        submitData.append('height', formData.height.toString());
        submitData.append('hasChronicDisease', String(formData.hasChronicDisease));
        if (formData.profileImage) {
          submitData.append('profileImage', formData.profileImage);
        }

        const response = await fetch(`${API_URL}/register/test01`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // JSON 형식임을 명시
          },
          body: JSON.stringify(submitData),
        });
    
        if (response.ok) {
          alert('회원가입 성공!');
        } else {
          alert('회원가입 실패');
        }
      };

    return (
        <div className="flex justify-center items-center flex-col">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col">
                <label>닉네임:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />

                <label>나이:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <label>몸무게:</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                />

                <label>키:</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                />

                <label>지병:</label>
                <div>
                    <input
                        type="radio"
                        name="chronicDisease"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label>있음</label>
                    <input
                        type="radio"
                        name="chronicDisease"
                        value="no"
                        onChange={handleChange}
                    />
                    <label>없음</label>
                </div>

                <label>프로필 이미지:</label>
                <input
                    type="file"
                    name="profileImage"
                    onChange={handleChange}
                />
                <button type="submit">회원 가입</button>
            </form>
        </div>
    );

}