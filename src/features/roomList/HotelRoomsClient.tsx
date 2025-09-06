'use client';
import { RoomType } from '@/types';
import { Divider } from '../common/Divider';
import RoomFilter from '../common/RoomFilter/RoomFilter';
import { useRoomFilters } from '../common/RoomFilter/useRoomFilters';
import SquareRoomCard from './SquareRoomCard';

// adjust path
export default function HotelRoomsClient({ rooms }: { rooms: RoomType[] }) {
	const {
		filteredRooms,
		selectedFeatures,
		setSelectedFeatures,
		selectedPrice,
		setSelectedPrice,
		sortBy,
		setSortBy,
		resetFilters,
	} = useRoomFilters(rooms);

	return (
		<div className='max-w-7xl mx-auto p-6 mt-20'>
			<div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
				{/* Rooms Section */}
				<div className='md:col-span-9 space-y-6'>
					{filteredRooms.map((room, index) => (
						<div key={room.id}>
							<SquareRoomCard room={room} />
							{index < filteredRooms.length - 1 && <Divider />}
						</div>
					))}
				</div>

				{/* Filter Sidebar */}
				<aside className='md:col-span-3'>
					<RoomFilter
						rooms={rooms}
						selectedFeatures={selectedFeatures}
						setSelectedFeatures={setSelectedFeatures}
						selectedPrice={selectedPrice}
						setSelectedPrice={setSelectedPrice}
						sortBy={sortBy}
						setSortBy={setSortBy}
						resetFilters={resetFilters}
					/>
				</aside>
			</div>
		</div>
	);
}
