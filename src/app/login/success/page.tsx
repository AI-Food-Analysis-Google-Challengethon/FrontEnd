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
          setAuth(res.data.name, res.data.email, res.data.profileImage);
          setInfo(
            res.data.height,
            res.data.weight,
            res.data.age,
            res.data.gender,
            res.data.schoolName,
            res.data.schoolCode
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
