import NutritionForm from './_components/NutritionForm';

export default function SchoolPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const date = searchParams.date as string;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <NutritionForm initialDate={date} />
    </div>
  );
}
