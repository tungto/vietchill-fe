import FacilityChip from '@/features/shared/components/FacilityChip';
import { RoomFeature } from '@/features/vietstay/rooms/types/room';
import { RoomFacility } from '@/features/vietstay/rooms/types/facility';

const OtherInfo = ({
  info,
  name,
}: {
  info: (RoomFeature | RoomFacility)[];
  name: string;
}) => {
  return (
    <div className='flex flex-col text-gray-700 mt-4'>
      <p className='font-medium text-sm text-gray-800'>{name}</p>
      <div className='flex flex-wrap gap-1'>
        {info.slice(0, 3).map((item) => (
          <FacilityChip facility={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default OtherInfo;
