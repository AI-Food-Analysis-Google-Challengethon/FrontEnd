'use client';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth, setInfo } = useAuthStore();

  useEffect(() => {
    async function handleAuth() {
      try {
        const accessToken = searchParams.get('accessToken');

        if (!accessToken) {
          console.error('accessToken not found');
          router.replace('/login');
          return;
        }

        localStorage.setItem('accessToken', accessToken);

        const res = await axios.get('/api/login', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res) {
          console.log('응답 정보 테스트', res.data);
          setAuth(res.data.data.name, res.data.data.email, res.data.data.profileImage);
          setInfo(
            res.data.data.height,
            res.data.data.weight,
            res.data.data.age,
            res.data.data.gender,
            res.data.data.schoolName,
            res.data.data.schoolCode
          );

          router.replace('/');
        }
      } catch (error) {
        console.error('Auth error:', error);
        router.replace('/login');
      }
    }

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <p className='text-xl'>로그인 중...</p>
    </div>
  );
}
