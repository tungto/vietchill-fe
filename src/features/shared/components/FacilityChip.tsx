import {
  coloredMiniIconMap,
  simpleIconsMap,
} from '@/features/shared/utils/iconMap';
import { RoomFeature } from '@/features/vietstay/rooms/types/room';
import { RoomFacility } from '@/features/vietstay/rooms/types/facility';
import React from 'react';
import { FaStar } from 'react-icons/fa';

type FacilityCardProps = {
  facility: RoomFeature | RoomFacility;
  simple?: boolean;
};

export default function FacilityChip({
  facility,
  simple = true,
}: FacilityCardProps) {
  return (
    <div className='inline-flex items-center gap-1.5 py-1 px-2 border rounded-md bg-white/90 shadow-sm text-sm hover:shadow-md transition-shadow'>
      <div className='flex items-center justify-center text-gray-700'>
        {simple
          ? simpleIconsMap[facility.name]
          : coloredMiniIconMap[facility.name] ?? (
              <FaStar className='w-4 h-4 text-gray-500 inline-block' />
            )}
      </div>
      <span className='text-sm text-gray-800'>{facility.content}</span>
    </div>
  );
}
