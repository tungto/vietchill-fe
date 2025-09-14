import { createApiClient } from '@/features/shared/api/authApiClient';
import React from 'react';
import { BookingsList } from '@/features/admin/bookings/components';
import { Booking } from '@/features/admin/bookings/api';

interface BookingsResponse {
  data: Booking[];
  pagination: {
    total: number;
    current_page: number;
    limit: number;
    last_page: number;
  };
}

async function fetchBookings(): Promise<BookingsResponse> {
  try {
    const api = await createApiClient();
    const response = await api.get('/admin/bookings?limit=50');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return {
      data: [],
      pagination: {
        total: 0,
        current_page: 1,
        limit: 50,
        last_page: 1,
      },
    };
  }
}

export default async function BookingsPage() {
  const bookingsData = await fetchBookings();

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Quản lý đặt phòng</h1>
        <p className='text-gray-600'>Quản lý tất cả đặt phòng và đặt phòng</p>
      </div>

      <BookingsList
        initialBookings={bookingsData.data}
        initialPagination={bookingsData.pagination}
      />
    </div>
  );
}
