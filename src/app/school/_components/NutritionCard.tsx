'use client';

export interface NutritionCardProps {
  title: string;
  value: number;
  unit: string;
  color: string;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ title, value, unit, color }) => (
  <div className={`${color} p-4 rounded-lg`}>
    <h3 className='font-medium text-gray-700'>{title}</h3>
    <div className='text-xl font-bold mt-1'>
      {value} {unit}
    </div>
  </div>
);

export default NutritionCard;
