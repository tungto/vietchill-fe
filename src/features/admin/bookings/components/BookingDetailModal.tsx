'use client';

import React from 'react';
import {
  TbX,
  TbUser,
  TbHome,
  TbCalendar,
  TbCurrencyDong,
  TbPhone,
  TbMail,
} from 'react-icons/tb';
import { Booking } from '../api';

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
  onUpdate: () => void;
}

export default function BookingDetailModal({
  booking,
  onClose,
  onUpdate,
}: BookingDetailModalProps) {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const statusLabels = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    'checked-in': 'Đã nhận phòng',
    'checked-out': 'Đã trả phòng',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    'checked-in': 'bg-green-100 text-green-800',
    'checked-out': 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Chi tiết đặt phòng - #{booking.id.toString().padStart(6, '0')}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100'
          >
            <TbX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Status */}
          <div className='flex items-center gap-3'>
            <span className='text-sm font-medium text-gray-700'>
              Trạng thái:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                statusColors[booking.status]
              }`}
            >
              {statusLabels[booking.status]}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                booking.is_paid
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {booking.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </span>
          </div>

          {/* Customer Information */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h3 className='text-lg font-medium text-gray-900 mb-3 flex items-center gap-2'>
              <TbUser size={20} />
              Thông tin khách hàng
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Tên
                </label>
                <p className='text-sm text-gray-900'>{booking.user.name}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Email:
                </label>
                <p className='text-sm text-gray-900 flex items-center gap-1'>
                  <TbMail size={16} />
                  {booking.user.email}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Điện thoại
                </label>
                <p className='text-sm text-gray-900 flex items-center gap-1'>
                  <TbPhone size={16} />
                  {booking.phone}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Khách
                </label>
                <p className='text-sm text-gray-900'>
                  {booking.adult} người lớn, {booking.children} trẻ em
                </p>
              </div>
            </div>
          </div>

          {/* Room Information */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h3 className='text-lg font-medium text-gray-900 mb-3 flex items-center gap-2'>
              <TbHome size={20} />
              Thông tin phòng
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Loại phòng
                </label>
                <p className='text-sm text-gray-900'>
                  {booking.room_type.name}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Số phòng
                </label>
                <p className='text-sm text-gray-900'>
                  {booking.room?.room_number || (
                    <span className='text-yellow-600 font-medium'>
                      Chưa gán
                    </span>
                  )}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Giá phòng
                </label>
                <p className='text-sm text-gray-900'>
                  {formatCurrency(booking.room_type.price)}₫ / night
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Diện tích
                </label>
                <p className='text-sm text-gray-900'>
                  {booking.room_type.area}m²
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h3 className='text-lg font-medium text-gray-900 mb-3 flex items-center gap-2'>
              <TbCalendar size={20} />
              Chi tiết đặt phòng
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Ngày nhận phòng
                </label>
                <p className='text-sm text-gray-900'>
                  {formatDate(booking.check_in_date)}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Ngày trả phòng
                </label>
                <p className='text-sm text-gray-900'>
                  {formatDate(booking.check_out_date)}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Ngày đặt phòng
                </label>
                <p className='text-sm text-gray-900'>
                  {formatDateTime(booking.created_at)}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Ngày cập nhật
                </label>
                <p className='text-sm text-gray-900'>
                  {formatDateTime(booking.updated_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h3 className='text-lg font-medium text-gray-900 mb-3 flex items-center gap-2'>
              <TbCurrencyDong size={20} />
              Thông tin thanh toán
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Tổng số tiền
                </label>
                <p className='text-lg font-semibold text-gray-900'>
                  {formatCurrency(booking.total_price)}₫
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Trạng thái thanh toán
                </label>
                <p
                  className={`text-sm font-semibold ${
                    booking.is_paid ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {booking.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </p>
              </div>
            </div>
          </div>

          {/* Room Images */}
          {booking.room_type.images && booking.room_type.images.length > 0 && (
            <div className='bg-gray-50 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-gray-900 mb-3'>
                Hình ảnh phòng
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {booking.room_type.images.slice(0, 6).map((image, index) => (
                  <div key={image.id} className='relative'>
                    <img
                      src={`http://localhost:8000/${image.path}`}
                      alt={`Room ${booking.room_type.name}`}
                      className='w-full h-24 object-cover rounded-lg'
                    />
                    {image.is_thumbnail && (
                      <div className='absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded'>
                        Chính
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 p-6 border-t border-gray-200'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
