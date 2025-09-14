'use client';

import { coloredIconMap } from '@/features/shared/utils/iconMap';
import { RoomFacility } from '@/features/vietstay/rooms/types/facility';

type FacilityCardProps = {
  facility: RoomFacility;
};
export default function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <div className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 flex flex-col'>
      <div className='flex items-center mb-4'>
        <div className='mr-3'>
          {coloredIconMap[facility.name] ?? (
            <span className='w-8 h-8 bg-gray-200 rounded-full' />
          )}
        </div>
        <h3 className='text-lg font-semibold'>{facility.content}</h3>
      </div>
      <p className='text-gray-600 text-sm leading-relaxed'>
        {facility.description}
      </p>
    </div>
  );
}
