import { getRoomData } from '@/features/vietstay/rooms/api/room';
import { BookingForm, RoomCard } from '@/features/vietstay/booking/components';

export default async function BookingConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  try {
    const { id } = await searchParams;
    const room = await getRoomData(id ?? '');
    const thumbnail = room.images.find(
      (img: { is_thumbnail: boolean }) => img.is_thumbnail,
    )?.path;

    return (
      <div className='container mx-auto px-4 py-8 mt-16'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          XÁC NHẬN ĐẶT PHÒNG
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <RoomCard
            name={room.name}
            price={room.price}
            imageUrl={
              thumbnail
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/${thumbnail}`
                : '/images/rooms/placeholder.png'
            }
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
