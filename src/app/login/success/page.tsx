'use client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

        const response = await axios.post('/api/login', null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data) {
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
