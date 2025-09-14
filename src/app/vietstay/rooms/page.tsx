import HotelRoomsClient from '@/features/vietstay/rooms/components/HotelRoomsClient';
import { getRoomsData } from '@/features/vietstay/rooms/api/room-types';

// SSR Component
export default async function HotelRooms() {
  const rooms = await getRoomsData();

  return <HotelRoomsClient rooms={rooms.data} />;
}
