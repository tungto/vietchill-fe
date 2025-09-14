import Image from 'next/image';
import { Booking } from '@/types/vietstay/booking';
import BookingStatusBadge from './BookingStatusBadge';

export default function BookingCard({ booking }: { booking: Booking }) {
  const thumbnail = booking.room_type.images.find(
    (img) => img.is_thumbnail,
  )?.path;

  const checkIn = new Date(booking.check_in_date).toLocaleDateString('vi-VN');
  const checkOut = new Date(booking.check_out_date).toLocaleDateString('vi-VN');
  const createdAt = new Date(booking.created_at).toLocaleDateString('vi-VN');

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(booking.total_price);

  return (
    <li className='flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300'>
      <div className='relative w-full md:w-1/3 aspect-[4/3] flex-shrink-0'>
        <Image
          src={
            thumbnail
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/${thumbnail}`
              : '/images/rooms/placeholder.png'
          }
          alt={booking.room_type.name}
          fill
          className='object-cover'
          sizes='(min-width: 768px) 33vw, 100vw'
          priority
        />
      </div>

      <div className='flex flex-col flex-grow justify-center p-5 space-y-3 md:w-2/3'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-900'>
            {booking.room_type.name}
          </h2>
          <BookingStatusBadge status={booking.status} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-6 text-gray-600 text-base'>
          <p>
            Nhận phòng: <strong>{checkIn}</strong>
          </p>
          <p>
            Trả phòng: <strong>{checkOut}</strong>
          </p>

          <p>
            Số lượng khách: <strong>{booking.adult}</strong> người lớn,{' '}
            <strong>{booking.children}</strong> trẻ em
          </p>

          <p>Điện thoại: {booking.phone}</p>

          <p>
            Đặt lúc: <strong>{createdAt}</strong>
          </p>
        </div>

        <p className='text-lg font-semibold text-gray-900'>{formattedPrice}</p>
      </div>
    </li>
  );
}
