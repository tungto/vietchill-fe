// components/roomDetails/RoomSidebar.tsx
import { RoomType } from '@/types/room';
import { formatVND } from '@/lib/utils/formatPrice';

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

			<button className='mt-6 w-full py-3 rounded-xl bg-orange-500 text-white font-semibold'>
				Book now
			</button>
			<button className='mt-3 w-full py-2 rounded-xl border border-gray-200 text-gray-700'>
				View availability
			</button>
		</div>
	</aside>
);

export default RoomSidebar;
