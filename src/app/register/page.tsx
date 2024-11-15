import RegisterForm from './_components/RegisterForm';

export default async function RegisterPage() {
  return (
    <div className='p-2 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold text-center'>회원정보</h1>
      <RegisterForm />
    </div>
  );
}
