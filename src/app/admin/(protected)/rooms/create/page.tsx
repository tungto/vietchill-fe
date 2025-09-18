import { CreateRoomForm } from '@/features/admin/rooms/components';

export default async function CreateRoomPage() {
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

        <CreateRoomForm />
      </div>
    </div>
  );
}
