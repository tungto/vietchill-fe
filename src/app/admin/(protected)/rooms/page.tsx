// app/admin/rooms/page.tsx (Next.js 13+ App Router)
import RoomTable from '@/features/admin/rooms/RoomTable';
import { createApiClient } from '@/lib/api/authApiClient';

async function fetchRooms() {
  try {
    const api = createApiClient();
    const response = await (await api).get('/admin/rooms');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return [];
  }
}

export default async function AdminRoomsPage() {
  const rooms = await fetchRooms();

  return (
    <div className='p-6'>
      <h1 className='mb-6 text-2xl font-bold'>Room Management</h1>
      <RoomTable rooms={rooms} />
    </div>
  );
}
