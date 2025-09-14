import React from 'react';
import { TbCalendar } from 'react-icons/tb';
import {
  FormSectionProps,
  formatDate,
  formatDateTime,
} from '@/features/admin/bookings/types/types';

interface BookingDetailsSectionProps extends FormSectionProps {
  nights?: number;
}

export default function BookingDetailsSection({
  booking,
  nights = 0,
}: BookingDetailsSectionProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
        <TbCalendar size={20} />
        Chi tiết đặt phòng
      </h3>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Ngày nhận phòng
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {formatDate(booking.check_in_date)}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Ngày trả phòng
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {formatDate(booking.check_out_date)}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Ngày đặt phòng
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {formatDateTime(booking.created_at)}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Cập nhật lần cuối
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {formatDateTime(booking.updated_at)}
          </p>
        </div>
        {nights > 0 && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Thời gian lưu trú
            </label>
            <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
              {nights} đêm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
