import { useSearchParams } from 'next/navigation';
import NutritionForm from './_components/NutritionForm';

export default function SchoolPage() {
  const searchParam = useSearchParams();
  const date = searchParam.get('date') ?? '';

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <NutritionForm initialDate={date} />
    </div>
  );
}
