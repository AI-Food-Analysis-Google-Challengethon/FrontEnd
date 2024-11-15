import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, RectangleProps } from 'recharts';

interface NutritionChartProps {
  totalKcal: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface CustomBarProps extends RectangleProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      name: string;
      value: number;
      color: string;
    };
  }>;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const NutritionChart = ({ totalKcal, carbs, protein, fat }: NutritionChartProps) => {
  const totalData = [
    {
      name: '총 섭취',
      carbs: carbs,
      protein: protein,
      fat: fat,
    },
  ];

  const data: ChartData[] = [
    {
      name: '탄수화물',
      value: carbs,
      color: '#FF7B7B',
    },
    {
      name: '단백질',
      value: protein,
      color: '#82D4BB',
    },
    {
      name: '지방',
      value: fat,
      color: '#FFE27B',
    },
  ];

  const CustomBar = (props: CustomBarProps) => {
    const { x = 0, y = 0, width = 0, height = 0, fill } = props;
    const totalWidth = 350;

    return (
      <g>
        <rect x={x} y={y} width={totalWidth} height={height} fill='#E5E5E5' rx={4} ry={4} />
        <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} ry={4} />
      </g>
    );
  };

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white p-2 rounded-lg shadow-md border border-gray-100'>
          <p className='text-sm'>{`${payload[0].value}g`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='w-[400px] md:w-[800px] bg-white rounded-xl p-4 shadow-sm'>
      <div className='flex justify-between items-center mb-4'>
        <div className='text-lg font-medium'>총 섭취</div>
        <div className='text-lg font-bold'>{totalKcal}kcal</div>
      </div>

      <div className='h-[40px] mb-6'>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            data={totalData}
            stackOffset='expand'
            layout='vertical'
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis hide type='number' />
            <YAxis hide type='category' />
            <Bar
              dataKey='carbs'
              stackId='a'
              fill='#FF7B7B'
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={0}
              radius={[4, 0, 0, 4]}
            />
            <Bar
              dataKey='protein'
              stackId='a'
              fill='#82D4BB'
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={200}
            />
            <Bar
              dataKey='fat'
              stackId='a'
              fill='#FFE27B'
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={400}
              radius={[0, 4, 4, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className='flex flex-col space-y-2'>
        {data.map((item) => (
          <div key={item.name} className='flex flex-col'>
            <span className='text-sm font-medium mb-1'>{item.name}</span>
            <div className='h-[20px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={[item]} layout='vertical' barSize={20}>
                  <XAxis type='number' hide domain={[0, Math.max(carbs, protein, fat)]} />
                  <YAxis type='category' hide />
                  <Tooltip
                    position={{ y: -30 }}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.1)', radius: 4 }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey='value'
                    fill={item.color}
                    shape={<CustomBar />}
                    isAnimationActive={true}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionChart;
