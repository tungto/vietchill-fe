'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Booking } from '@/features/vietstay/booking/types/booking';
import { userBookingsApi } from '@/features/vietstay/booking/api';
import BookingStatusBadge from './BookingStatusBadge';
import { TbCheck, TbAlertTriangle } from 'react-icons/tb';

interface BookingCardProps {
  booking: Booking;
  onBookingUpdate?: (updatedBooking: Booking) => void;
}

export default function BookingCard({
  booking,
  onBookingUpdate,
}: BookingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Check if booking can be cancelled
  const canCancel =
    booking.status === 'pending' || booking.status === 'confirmed';

  // Calculate days until check-in
  const daysUntilCheckIn = Math.ceil(
    (new Date(booking.check_in_date).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const handleCancelBooking = async () => {
    if (!canCancel) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await userBookingsApi.cancelBooking(booking.id);

      if (response.success) {
        // Update the booking status locally
        const updatedBooking: Booking = {
          ...booking,
          status: 'cancelled',
        };

        // Call the callback to update parent component
        onBookingUpdate?.(updatedBooking);

        setShowCancelConfirm(false);
      }
    } catch (error: unknown) {
      console.error('Failed to cancel booking:', error);
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      setError(errorMessage || 'Không thể hủy đặt phòng. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

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

        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold text-gray-900'>
            {formattedPrice}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mt-2 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <div className='flex items-center gap-2'>
              <TbAlertTriangle className='h-4 w-4 text-red-500 flex-shrink-0' />
              <p className='text-sm text-red-600'>{error}</p>
            </div>
          </div>
        )}

        {/* Cancellation Policy Info */}
        {canCancel && daysUntilCheckIn >= 0 && (
          <div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
            <p className='text-sm text-blue-700'>
              {daysUntilCheckIn > 1
                ? `Có thể hủy miễn phí trước ${daysUntilCheckIn} ngày check-in`
                : daysUntilCheckIn === 1
                ? 'Có thể hủy miễn phí trước 1 ngày check-in'
                : 'Hủy trong ngày check-in có thể phát sinh phí'}
            </p>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
                <TbAlertTriangle className='h-5 w-5 text-red-600' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Xác nhận hủy đặt phòng
                </h3>
                <p className='text-sm text-gray-600'>
                  Bạn có chắc chắn muốn hủy đặt phòng này không?
                </p>
              </div>
            </div>

            <div className='bg-gray-50 rounded-lg p-3 mb-4'>
              <p className='text-sm text-gray-700'>
                <strong>Phòng:</strong> {booking.room_type.name}
              </p>
              <p className='text-sm text-gray-700'>
                <strong>Ngày:</strong> {checkIn} - {checkOut}
              </p>
              <p className='text-sm text-gray-700'>
                <strong>Tổng tiền:</strong> {formattedPrice}
              </p>
            </div>

            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4'>
              <p className='text-sm text-yellow-800'>
                <strong>Lưu ý:</strong> Việc hủy đặt phòng không thể hoàn tác.
                {daysUntilCheckIn > 1
                  ? ' Bạn sẽ được hoàn tiền theo chính sách hủy phòng.'
                  : ' Có thể phát sinh phí hủy phòng.'}
              </p>
            </div>

            <div className='flex items-center justify-end gap-3'>
              <button
                onClick={() => {
                  setShowCancelConfirm(false);
                  setError(null);
                }}
                disabled={isLoading}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
              >
                Không hủy
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={isLoading}
                className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                    Đang hủy...
                  </>
                ) : (
                  <>
                    <TbCheck className='h-4 w-4' />
                    Xác nhận hủy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
