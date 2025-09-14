import { fetchRoomTypes } from '@/features/admin/room-types/api';
import { CreateRoomForm } from '@/features/admin/rooms/components';

async function fetchAllRoomTypes() {
  try {
    const response = await fetchRoomTypes(1, 1000); // Get all room types
    return response.data;
  } catch (error) {
    console.error('Failed to fetch room types:', error);
    return [];
  }
}

export default async function CreateRoomPage() {
  const roomTypes = await fetchAllRoomTypes();

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Tạo phòng mới
          </h1>
          <p className='text-gray-600'>
            Thêm phòng mới vào hệ thống quản lý khách sạn
          </p>
        </div>

        <CreateRoomForm roomTypes={roomTypes} />
      </div>
    </div>
  );
}
