import NutritionForm from './_components/NutritionForm';

interface SearchParams {
  searchParams: {
    date?: string; // 옵셔널로 변경
  };
}

export default function SchoolPage({ searchParams }: SearchParams) {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <NutritionForm initialDate={searchParams.date || ''} />
    </div>
  );
}
