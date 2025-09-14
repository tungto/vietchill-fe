// app/room/[id]/page.tsx
import { getRoomData } from '@/features/vietstay/rooms/api/room';
import Breadcrumb from '@/features/shared/components/Breadcrumb';
import RoomGallery from '@/features/vietstay/rooms/components/RoomGallery';
import RoomHeader from '@/features/vietstay/rooms/components/RoomHeader';
import RoomBody from '@/features/vietstay/rooms/components/RoomBody';
import RoomSidebar from '@/features/vietstay/rooms/components/RoomSidebar';

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
          Không tải được dữ liệu phòng. Vui lòng thử lại sau.
        </p>
      </main>
    );
  }
}
