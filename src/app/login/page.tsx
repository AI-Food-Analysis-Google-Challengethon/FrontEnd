import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import SessionGuard from '@/components/auth/SessionGuard';

export default function LoginPage() {
  return (
    <SessionGuard>
      <div className='w-full min-h-screen flex flex-col items-center mt-[200px]'>
        <main>
          <GoogleLoginButton />
        </main>
      </div>
    </SessionGuard>
  );
}
