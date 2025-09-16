import { RoomTypesResponse } from '../../types/room';
import HotelCard from './RoomCard/RoomCard';

const RoomTypes = async () => {
  // Fetch data from your API
  const res = await fetch('http://localhost:8000/api/room-types');

  if (!res.ok) {
    throw new Error('Failed to fetch room types');
  }

  const response: RoomTypesResponse = await res.json();

  return (
    <div className='p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
      {response.data.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
};

export default RoomTypes;
