import NutritionForm from './_components/NutritionForm';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SchoolPage({ searchParams }: PageProps) {
  const date = searchParams.date as string;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <NutritionForm initialDate={date} />
    </div>
  );
}
