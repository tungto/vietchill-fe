// components/roomDetails/RoomSidebar.tsx
import { RoomType } from '@/features/vietstay/rooms/types/room';
import { formatVND } from '@/features/shared/utils/formatPrice';
import Link from 'next/link';

const RoomSidebar = ({ room }: { room: RoomType }) => (
  <aside className='bg-white rounded-xl p-0'>
    <div className='text-left mb-8'>
      <div className='mt-0 text-3xl font-bold'>{formatVND(room.price)}/đêm</div>
    </div>
    <div className='bg-white rounded-xl p-6 shadow'>
      <div className='text-sm text-gray-500'>Diện tích</div>
      <div className='text-lg font-semibold mt-1'>{room.area} m²</div>

      <div className='mt-4 text-sm text-gray-500'>Số lượng khách</div>
      <div className='text-lg font-semibold mt-1'>
        {room.adult} người lớn • {room.children} trẻ em
      </div>

      <Link
        href={`/vietstay/booking-confirm?id=${room.id}`}
        className='mt-6 w-full py-3 rounded-xl bg-orange-500 text-white font-semibold block text-center'
      >
        Đặt ngay
      </Link>
    </div>
  </aside>
);

export default RoomSidebar;
