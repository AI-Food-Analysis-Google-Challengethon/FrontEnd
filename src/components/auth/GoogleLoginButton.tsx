import Image from 'next/image';
import Link from 'next/link';

export default function GoogleLoginButton() {
  return (
    <Link
      href='https://foodeat.o-r.kr/oauth2/authorize/google'
      className='w-[200px] flex justify-center items-center gap-2 text-[20px] bg-blue-200 p-2 rounded-2xl text-white font-semibold hover:scale-110 transform duration-200'
    >
      <Image src='/GoogleLogo.webp' alt='Google-Logo' width={20} height={20} />
      Google Login
    </Link>
  );
}
