// app/room/[id]/page.tsx
import { getRoomData } from '@/lib/api/room';
import Breadcrumb from '@/features/common/Breadcrumb';
import RoomGallery from '@/features/roomDetail/RoomGallery';
import RoomHeader from '@/features/roomDetail/RoomHeader';
import RoomBody from '@/features/roomDetail/RoomBody';
import RoomSidebar from '@/features/roomDetail/RoomSidebar';

export default async function RoomPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	try {
		const { id } = await params; // ✅ await params
		const room = await getRoomData(id);

		return (
			<main className='max-w-6xl mx-auto px-6 py-12 mt-16'>
				<Breadcrumb />
				<RoomHeader title={room.name} price={room.price} />

				<div className='mt-8'>
					<RoomGallery images={room.images} title={room.name} />
				</div>

				<div className='mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<RoomBody room={room} />

					<RoomSidebar room={room} />
				</div>
			</main>
		);
	} catch (error) {
		console.error('error', error);
		return (
			<main className='max-w-6xl mx-auto px-6 py-12 mt-16'>
				<p className='text-red-500 text-center'>
					Failed to load room data. Please try again later.
				</p>
			</main>
		);
	}
}
