import FacilityChip from '@/features/common/FacilityChip';
import { RoomFacility, RoomFeature } from '@/types/vietstay';

const OtherInfo = ({
  info,
  name,
}: {
  info: RoomFacility[] | RoomFeature[];
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
