'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { roomsApi, CreateRoomData } from '../api/roomsApi';
import { fetchRoomTypes, RoomType } from '@/features/admin/room-types/api';
import { TbArrowLeft, TbCheck, TbX } from 'react-icons/tb';

interface CreateRoomFormProps {
  roomTypes?: RoomType[];
}

export default function CreateRoomForm({
  roomTypes: initialRoomTypes,
}: CreateRoomFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(
    initialRoomTypes || [],
  );
  const [formData, setFormData] = useState<CreateRoomData>({
    room_type_id: 0,
    room_number: '',
  });

  // Load room types if not provided
  useEffect(() => {
    if (!initialRoomTypes || initialRoomTypes.length === 0) {
      loadRoomTypes();
    }
  }, [initialRoomTypes]);

  const loadRoomTypes = async () => {
    try {
      const response = await fetchRoomTypes(1, 1000); // Get all room types
      setRoomTypes(response.data);
    } catch (error) {
      console.error('Failed to load room types:', error);
      setError('Không thể tải danh sách loại phòng');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'room_type_id'
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.room_number.trim()) {
      setError('Vui lòng nhập số phòng');
      setLoading(false);
      return;
    }

    if (!formData.room_type_id || formData.room_type_id === 0) {
      setError('Vui lòng chọn loại phòng');
      setLoading(false);
      return;
    }

    try {
      await roomsApi.createRoom(formData);
      router.push('/admin/rooms');
      router.refresh();
    } catch (error: unknown) {
      console.error('Failed to create room:', error);
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      setError(errorMessage || 'Có lỗi xảy ra khi tạo phòng');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/rooms');
  };

  const selectedRoomType = roomTypes.find(
    (rt) => rt.id === formData.room_type_id,
  );

  return (
    <div className='bg-white rounded-lg shadow-sm border'>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <button
              onClick={handleCancel}
              className='p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100'
            >
              <TbArrowLeft className='h-5 w-5' />
            </button>
            <div>
              <h1 className='text-xl font-semibold text-gray-900'>
                Tạo phòng mới
              </h1>
              <p className='text-sm text-gray-500'>
                Thêm phòng mới vào hệ thống quản lý
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='p-6'>
        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <div className='flex items-center gap-2'>
              <TbX className='h-5 w-5 text-red-500' />
              <p className='text-red-600 text-sm'>{error}</p>
            </div>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Room Number */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Số phòng <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='room_number'
              value={formData.room_number}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Nhập số phòng (VD: 101, A201, ...)'
              required
              disabled={loading}
            />
            <p className='text-xs text-gray-500 mt-1'>
              Số phòng phải là duy nhất trong hệ thống
            </p>
          </div>

          {/* Room Type */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Loại phòng <span className='text-red-500'>*</span>
            </label>
            <select
              name='room_type_id'
              value={formData.room_type_id}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
              disabled={loading}
            >
              <option value={0}>Chọn loại phòng</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.id}>
                  {roomType.name}
                </option>
              ))}
            </select>
            <p className='text-xs text-gray-500 mt-1'>
              Chọn loại phòng để xác định thông tin và giá cả
            </p>
          </div>

          {/* Status */}
          <div className='md:col-span-2'>
            <label className='flex items-center gap-3'>
              <input
                type='checkbox'
                name='is_active'
                checked={formData.is_active}
                onChange={handleInputChange}
                className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                disabled={loading}
              />
              <span className='text-sm font-medium text-gray-700'>
                Phòng đang hoạt động
              </span>
            </label>
            <p className='text-xs text-gray-500 mt-1 ml-6'>
              Phòng không hoạt động sẽ không hiển thị trong danh sách đặt phòng
            </p>
          </div>
        </div>

        {/* Room Type Details */}
        {selectedRoomType && (
          <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
            <h3 className='text-sm font-medium text-gray-900 mb-3'>
              Thông tin loại phòng được chọn
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <div>
                <span className='text-gray-600'>Giá/đêm:</span>
                <span className='ml-2 font-medium'>
                  {new Intl.NumberFormat('vi-VN').format(
                    selectedRoomType.price,
                  )}
                  ₫
                </span>
              </div>
              <div>
                <span className='text-gray-600'>Diện tích:</span>
                <span className='ml-2 font-medium'>
                  {selectedRoomType.area}m²
                </span>
              </div>
              <div>
                <span className='text-gray-600'>Sức chứa:</span>
                <span className='ml-2 font-medium'>
                  {selectedRoomType.adult} người lớn
                  {selectedRoomType.children > 0 &&
                    `, ${selectedRoomType.children} trẻ em`}
                </span>
              </div>
            </div>
            {selectedRoomType.description && (
              <div className='mt-3'>
                <span className='text-gray-600'>Mô tả:</span>
                <p className='mt-1 text-gray-900'>
                  {selectedRoomType.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition'
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type='submit'
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                Đang tạo...
              </>
            ) : (
              <>
                <TbCheck className='h-4 w-4' />
                Tạo phòng
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
