'use client';

import React, { useState, useEffect } from 'react';
import { Booking } from '@/features/vietstay/booking/types/booking';
import { userBookingsApi } from '@/features/vietstay/booking/api';
import BookingCard from './BookingCard';
import { TbRefresh, TbAlertCircle } from 'react-icons/tb';
import Link from 'next/link';

interface BookingsListProps {
  initialBookings?: Booking[];
}

export default function BookingsList({
  initialBookings = [],
}: BookingsListProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await userBookingsApi.getBookings();
      setBookings(response.data);
    } catch (error: unknown) {
      console.error('Failed to load bookings:', error);
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error as { message: string }).message
          : 'Không thể tải danh sách đặt phòng';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingUpdate = (updatedBooking: Booking) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking,
      ),
    );
  };

  // Load bookings if no initial data provided
  useEffect(() => {
    if (initialBookings.length === 0) {
      loadBookings();
    }
  }, [initialBookings.length]);

  if (loading && bookings.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-3xl font-bold mb-10 text-gray-900'>
            Lịch sử đặt phòng
          </h1>
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
              <p className='text-gray-600'>Đang tải danh sách đặt phòng...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-3xl font-bold mb-10 text-gray-900'>
            Lịch sử đặt phòng
          </h1>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
            <div className='flex items-center gap-3'>
              <TbAlertCircle className='h-6 w-6 text-red-500 flex-shrink-0' />
              <div>
                <h3 className='text-lg font-semibold text-red-800'>
                  Có lỗi xảy ra
                </h3>
                <p className='text-red-600'>{error}</p>
              </div>
            </div>
            <button
              onClick={loadBookings}
              className='mt-4 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              <TbRefresh className='h-4 w-4' />
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-3xl font-bold mb-10 text-gray-900'>
            Lịch sử đặt phòng
          </h1>
          <div className='text-center py-12'>
            <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-12 h-12 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Chưa có đặt phòng nào
            </h3>
            <p className='text-gray-600 mb-6'>
              Bạn chưa có đơn đặt phòng nào. Hãy khám phá các phòng của chúng
              tôi!
            </p>
            <Link
              href='/vietstay/rooms'
              className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
            >
              Xem phòng có sẵn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center justify-between mb-10'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Lịch sử đặt phòng
          </h1>
          <button
            onClick={loadBookings}
            disabled={loading}
            className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
          >
            <TbRefresh className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
        </div>

        <ul className='space-y-8'>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onBookingUpdate={handleBookingUpdate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
