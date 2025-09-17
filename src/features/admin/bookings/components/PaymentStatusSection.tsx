import React from 'react';
import { TbCurrencyDong } from 'react-icons/tb';
import { FormSectionProps, formatCurrency, statusOptions } from '../types';

export default function PaymentStatusSection({
  booking,
  formData,
  setFormData,
  loading = false,
}: FormSectionProps) {
  const currentStatus = statusOptions.find(
    (option) => option.value === formData.status,
  );

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
        <TbCurrencyDong size={20} />
        Thanh toán & Trạng thái
      </h3>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Tổng tiền
          </label>
          <p className='text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg'>
            {formatCurrency(booking.total_price)}₫
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Trạng thái thanh toán
          </label>
          <div className='flex items-center gap-4'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='is_paid'
                value='false'
                checked={!formData.is_paid}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, is_paid: false }))
                }
                className='mr-2'
                disabled={loading}
              />
              <span className='text-sm text-red-600 font-medium'>
                Chưa thanh toán
              </span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='is_paid'
                value='true'
                checked={formData.is_paid}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, is_paid: true }))
                }
                className='mr-2'
                disabled={loading}
              />
              <span className='text-sm text-green-600 font-medium'>
                Đã thanh toán
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Trạng thái đặt phòng
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value as typeof formData.status,
              }))
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            disabled={loading}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {currentStatus && (
            <div className='mt-2'>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${currentStatus.color}`}
              >
                {currentStatus.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
