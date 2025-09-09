import BookingForm from '@/features/booking-confirm/BookingForm';
import RoomCard from '@/features/booking-confirm/RoomCard';
import { getRoomData } from '@/lib/api/room';

export default async function BookingConfirmPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  try {
    const { id } = await searchParams;
    const room = await getRoomData(id ?? '');

    return (
      <div className='container mx-auto px-4 py-8 mt-16'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          XÁC NHẬN ĐẶT PHÒNG
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <RoomCard
            name={room.name}
            price={room.price}
            imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/${room.images[0].path}`}
          />
          <BookingForm room={room} />
        </div>
      </div>
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
