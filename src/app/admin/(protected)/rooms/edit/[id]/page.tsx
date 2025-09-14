import { notFound } from 'next/navigation';
import { createApiClient } from '@/features/shared/api/authApiClient';
import { EditRoomForm } from '@/features/admin/rooms/components';

async function fetchRoom(id: string) {
  try {
    const api = createApiClient();
    const response = await (await api).get(`/admin/rooms/${id}`);
    return response.data.data.room;
  } catch (error) {
    console.error('Failed to fetch room:', error);
    return null;
  }
}

async function fetchRoomTypes() {
  try {
    const api = createApiClient();
    const response = await (await api).get('/admin/room-types');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch room types:', error);
    return [];
  }
}

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [room, roomTypes] = await Promise.all([
    fetchRoom(id),
    fetchRoomTypes(),
  ]);

  if (!room) {
    notFound();
  }

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Chỉnh sửa phòng
          </h1>
          <p className='text-gray-600'>
            Cập nhật thông tin phòng {room.room_number}
          </p>
        </div>

        <EditRoomForm room={room} roomTypes={roomTypes} />
      </div>
    </div>
  );
}
