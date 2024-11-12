import PhotoDisplay from './_components/PhotoDisplay';

export default function AnalysisPage() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold mb-8'>분석 페이지</h1>
      <main className='flex flex-col justify-center items-center'>
        <PhotoDisplay />
      </main>
    </div>
  );
}
