// components/roomDetails/RoomSidebar.tsx
import { RoomType } from '@/types/vietstay/room';
import { formatVND } from '@/lib/utils/formatPrice';
import Link from 'next/link';

const RoomSidebar = ({ room }: { room: RoomType }) => (
	<aside className='bg-white rounded-xl p-0'>
		<div className='text-left mb-8'>
			<div className='mt-0 text-3xl font-bold'>
				{formatVND(room.price)}/night
			</div>
		</div>
		<div className='bg-white rounded-xl p-6 shadow'>
			<div className='text-sm text-gray-500'>Area</div>
			<div className='text-lg font-semibold mt-1'>{room.area} m²</div>

			<div className='mt-4 text-sm text-gray-500'>Guests</div>
			<div className='text-lg font-semibold mt-1'>
				{room.adult} adults • {room.children} children
			</div>

			<Link
				href={`/vietstay/booking-confirm?id=${room.id}`}
				className='mt-6 w-full py-3 rounded-xl bg-orange-500 text-white font-semibold block text-center'>
				Book now
			</Link>
		</div>
	</aside>
);

export default RoomSidebar;
