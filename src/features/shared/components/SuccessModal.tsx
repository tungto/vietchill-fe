import Link from 'next/link';
import React from 'react';

export interface BookingInfo {
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingInfo: BookingInfo;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  bookingInfo,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black/50 flex items-center justify-center z-50  opacity-90'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed inset-0 flex items-center justify-center z-50 pointer-events-none'>
        <div
          className='bg-white rounded-lg shadow-lg max-w-md w-full p-6 pointer-events-auto'
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className='text-2xl font-bold mb-4 text-green-600'>
            Đặt phòng thành công!
          </h2>
          <p className='mb-2'>Cảm ơn bạn đã đặt phòng với chúng tôi.</p>
          <div className='mb-4'>
            <p>
              <strong>Khách sạn:</strong> {bookingInfo.hotelName}
            </p>
            <p>
              <strong>Nhận phòng:</strong>{' '}
              {new Date(bookingInfo.checkInDate).toLocaleDateString('vi-VN')}
            </p>
            <p>
              <strong>Trả phòng:</strong>{' '}
              {new Date(bookingInfo.checkOutDate).toLocaleDateString('vi-VN')}
            </p>
            <p>
              <strong>Số lượng khách:</strong> {bookingInfo.guests}
            </p>
          </div>
          <Link
            href='/vietstay/bookings'
            onClick={onClose}
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mr-auto'
          >
            Về Lịch sử Đặt phòng
          </Link>
        </div>
      </div>
    </>
  );
};
