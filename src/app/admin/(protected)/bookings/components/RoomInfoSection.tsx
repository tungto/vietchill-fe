import React from 'react';
import { TbHome } from 'react-icons/tb';
import { FormSectionProps, formatCurrency } from '../types';

export default function RoomInfoSection({ booking }: FormSectionProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
        <TbHome size={20} />
        Thông tin phòng
      </h3>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Loại phòng
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {booking.room_type.name}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Diện tích
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {booking.room_type.area}m²
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Giá phòng
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {formatCurrency(booking.room_type.price)}₫
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Phòng hiện tại
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {booking.room?.room_number || (
              <span className='text-yellow-600 font-medium'>Chưa gán</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
