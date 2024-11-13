import getTodayDate from '@/utils/getTodayDate';
import PhotoDisplay from './_components/PhotoDisplay';

export default function AnalysisPage() {
  const todayDate = getTodayDate();

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='text-xl font-bold my-3'>{todayDate}</h1>
      <main className='flex flex-col justify-center items-center'>
        <PhotoDisplay />
      </main>
    </div>
  );
}
