import NutritionForm from './_components/NutritionForm';

export default function SchoolPage({
  searchParams: { date },
}: {
  searchParams: {
    date: string;
  };
}) {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <NutritionForm initialDate={date} />
    </div>
  );
}
