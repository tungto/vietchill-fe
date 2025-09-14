import {
  coloredMiniIconMap,
  simpleIconsMap,
} from '@/features/shared/utils/iconMap';
import { RoomFeature } from '@/features/vietstay/rooms/types/room';
import { RoomFacility } from '@/features/vietstay/rooms/types/facility';
import React from 'react';

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
              <span className='w-5 h-5 bg-gray-200 rounded-full inline-block' />
            )}
      </div>
      <span className='text-sm text-gray-800'>{facility.content}</span>
    </div>
  );
}
