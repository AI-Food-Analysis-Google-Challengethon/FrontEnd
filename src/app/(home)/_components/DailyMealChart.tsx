'use client';

interface DailyMealChartProps {
  type: string;
  calorie: number | null;
}

export default function DailyMealChart({ type, calorie }: DailyMealChartProps) {
  const width = calorie ? Math.min((calorie / 3000) * 100, 100) : 0;

  return (
    <div className='flex flex-row w-[320px] lg:w-[600px] my-[2px] gap-[30px]'>
      <div>
        <p className='text-xl font-bold text-black'>{type}</p>
        <p className='text-sm font-normal text-neutral-500'>{calorie ? `${calorie}kcal` : '식사 전'}</p>
      </div>
      <div className='flex items-center flex-1'>
        <div className='w-full bg-gray-200 rounded-full h-4'>
          <div
            className='bg-blue-400 h-4 rounded-full transition-all duration-500 ease-out'
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    </div>
  );
}
