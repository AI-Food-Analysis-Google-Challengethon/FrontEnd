import { signIn } from '@/auth';

export default function GoogleAuth() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button
        type='submit'
        className='w-[380px] bg-blue-400 text-white font-bold px-[20px] py-[8px] rounded-3xl hover:bg-blue-500 hover:scale-105 duration-200'
      >
        Signin with Google
      </button>
    </form>
  );
}
