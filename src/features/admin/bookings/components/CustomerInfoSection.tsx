import React from 'react';
import { TbUser, TbMail, TbPhone, TbUsers } from 'react-icons/tb';
import { FormSectionProps } from '../types';

export default function CustomerInfoSection({ booking }: FormSectionProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
        <TbUser size={20} />
        Thông tin khách hàng
      </h3>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Tên
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {booking.user.name}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email:
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2'>
            <TbMail size={16} />
            {booking.user.email}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Điện thoại
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2'>
            <TbPhone size={16} />
            {booking.phone}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Khách
          </label>
          <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2'>
            <TbUsers size={16} />
            {booking.adult} người lớn, {booking.children} trẻ em
          </p>
        </div>
      </div>
    </div>
  );
}
