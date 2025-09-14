import { createApiClient } from '@/lib/api/authApiClient';
import React from 'react';
import BookingUpdateForm from '../../BookingUpdateForm';
import { BookingResponse } from '@/lib/api/admin';

async function fetchBooking(id: string): Promise<BookingResponse | null> {
  try {
    const api = await createApiClient();
    const response = await api.get(`/admin/bookings/${id}`);

    return response.data;
  } catch (error) {
    console.error('Failed to fetch booking:', error);
    return null;
  }
}

interface BookingEditPageProps {
  params: {
    id: string;
  };
}

export default async function BookingEditPage({
  params,
}: BookingEditPageProps) {
  const awaitedParams = await params;
  const bookingResponse = await fetchBooking(awaitedParams.id);

  if (!bookingResponse) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>
            Đặt phòng không tồn tại
          </h2>
          <p>Đặt phòng bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Cập nhật đặt phòng #
          {bookingResponse.data.booking.id.toString().padStart(6, '0')}
        </h1>
        <p className='text-gray-600'>
          Cập nhật chi tiết đặt phòng, gán phòng và quản lý trạng thái
        </p>
      </div>

      <BookingUpdateForm
        booking={bookingResponse.data.booking}
        availableRooms={bookingResponse.data.available_rooms}
        nights={bookingResponse.data.nights}
      />
    </div>
  );
}
