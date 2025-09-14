'use client';

import React from 'react';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimpleBarChartProps {
  data: ChartDataPoint[];
  title: string;
  height?: number;
  showValues?: boolean;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  title,
  height = 200,
  showValues = true,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const colors = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#06B6D4',
  ];

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
      <div
        className='flex items-end justify-between space-x-2'
        style={{ height }}
      >
        {data.map((item, index) => {
          const barHeight =
            maxValue > 0 ? (item.value / maxValue) * (height - 40) : 0;
          const color = item.color || colors[index % colors.length];

          return (
            <div key={item.label} className='flex flex-col items-center flex-1'>
              <div
                className='relative flex flex-col items-center justify-end'
                style={{ height: height - 40 }}
              >
                {showValues && item.value > 0 && (
                  <div className='text-xs font-medium text-gray-700 mb-1'>
                    {item.value}
                  </div>
                )}
                <div
                  className='w-full rounded-t transition-all duration-300 hover:opacity-80'
                  style={{
                    height: barHeight,
                    backgroundColor: color,
                    minHeight: item.value > 0 ? '4px' : '0px',
                  }}
                />
              </div>
              <div className='text-xs text-gray-600 mt-2 text-center break-words'>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SimplePieChartProps {
  data: ChartDataPoint[];
  title: string;
  size?: number;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({
  data,
  title,
  size = 200,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#06B6D4',
  ];

  let cumulativePercentage = 0;

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
      <div className='flex items-center justify-between'>
        <div className='relative' style={{ width: size, height: size }}>
          <svg width={size} height={size} className='transform -rotate-90'>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 10}
              fill='none'
              stroke='#E5E7EB'
              strokeWidth='20'
            />
            {data.map((item, index) => {
              const coef = Math.PI * (size / 100);
              const percentage = total > 0 ? (item.value / total) * 100 : 0;
              const strokeDasharray = `${percentage * coef} ${
                (100 - percentage) * coef
              }`;
              const strokeDashoffset = ((-cumulativePercentage * 8) / 9) * coef;
              const color = item.color || colors[index % colors.length];

              cumulativePercentage += percentage;

              return (
                <circle
                  key={item.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={size / 2 - 10}
                  fill='none'
                  stroke={color}
                  strokeWidth='20'
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className='transition-all duration-300'
                />
              );
            })}
          </svg>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900'>{total}</div>
              <div className='text-sm text-gray-600'>Tổng</div>
            </div>
          </div>
        </div>

        <div className='flex-1 ml-6'>
          <div className='space-y-2'>
            {data.map((item, index) => {
              const percentage =
                total > 0 ? Math.round((item.value / total) * 100) : 0;
              const color = item.color || colors[index % colors.length];

              return (
                <div
                  key={item.label}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center'>
                    <div
                      className='w-3 h-3 rounded-full mr-2'
                      style={{ backgroundColor: color }}
                    />
                    <span className='text-sm text-gray-700'>{item.label}</span>
                  </div>
                  <div className='text-sm font-medium text-gray-900'>
                    {item.value} ({percentage}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SimpleLineChartProps {
  data: { label: string; value: number }[];
  title: string;
  height?: number;
  color?: string;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  title,
  height = 200,
  color = '#3B82F6',
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
      <div className='relative' style={{ height }}>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
        >
          <polyline
            fill='none'
            stroke={color}
            strokeWidth='2'
            points={points}
            vectorEffect='non-scaling-stroke'
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / range) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r='2'
                fill={color}
                vectorEffect='non-scaling-stroke'
              />
            );
          })}
        </svg>
        <div className='absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600'>
          {data.map((item, index) => (
            <span
              key={index}
              className='transform -rotate-45 origin-bottom-left'
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
