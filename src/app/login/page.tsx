import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

export default function LoginPage() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center mt-[200px]'>
      <main>
        <GoogleLoginButton />
      </main>
    </div>
  );
}
