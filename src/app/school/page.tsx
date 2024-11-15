import NutritionForm from './_components/NutritionForm';

interface Props {
  searchParams: {
    date: string;
  };
}

export default function SchoolPage({ searchParams: { date } }: Props) {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      return <NutritionForm initialDate={date} />
    </div>
  );
}
