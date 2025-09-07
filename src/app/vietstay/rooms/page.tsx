import HotelRoomsClient from '@/features/roomList/HotelRoomsClient';
import { getRoomsData } from '@/lib/api/room-types';

// SSR Component
export default async function HotelRooms() {
	const rooms = await getRoomsData();

	return <HotelRoomsClient rooms={rooms.data} />;
}
