'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { roomsApi, Room } from '@/lib/api/admin/roomsApi';
import { TbArrowLeft, TbCheck, TbX } from 'react-icons/tb';

interface RoomType {
  id: number;
  name: string;
  area: number;
  price: number;
  adult: number;
  children: number;
  description: string;
}

interface EditRoomFormProps {
  room: Room;
  roomTypes: RoomType[];
}

export default function EditRoomForm({ room, roomTypes }: EditRoomFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    room_number: room.room_number,
    room_type_id: room.room_type_id,
    is_active: room.is_active,
  });

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

    try {
      await roomsApi.updateRoom(room.id, formData);
      router.push('/admin/rooms');
      router.refresh();
    } catch (error: unknown) {
      console.error('Failed to update room:', error);
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      setError(errorMessage || 'Có lỗi xảy ra khi cập nhật phòng');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/rooms');
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border'>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center gap-4'>
          <button
            onClick={handleCancel}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-900'
          >
            <TbArrowLeft className='h-5 w-5' />
            Quay lại
          </button>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>
              Chỉnh sửa phòng {room.room_number}
            </h2>
            <p className='text-sm text-gray-600'>
              Loại phòng: {room.room_type.name}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='p-6'>
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-red-600 text-sm'>{error}</p>
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
              placeholder='Nhập số phòng'
              required
            />
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
            >
              <option value=''>Chọn loại phòng</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.id}>
                  {roomType.name}
                </option>
              ))}
            </select>
            <p className='text-xs text-gray-500 mt-1'>
              Lưu ý: Không thể thay đổi loại phòng nếu phòng có đặt phòng đang
              hoạt động
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

        {/* Room Type Details (Read-only) */}
        {(() => {
          const selectedRoomType =
            roomTypes.find((rt) => rt.id === formData.room_type_id) ||
            room.room_type;
          return (
            <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
              <h3 className='text-sm font-medium text-gray-900 mb-3'>
                Thông tin loại phòng được chọn
              </h3>
              {selectedRoomType ? (
                <>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                    <div>
                      <span className='text-gray-600'>Giá/đêm:</span>
                      <span className='ml-2 font-medium'>
                        {new Intl.NumberFormat('vi-VN').format(
                          selectedRoomType.price || 0,
                        )}
                        ₫
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Diện tích:</span>
                      <span className='ml-2 font-medium'>
                        {selectedRoomType.area || 0}m²
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Sức chứa:</span>
                      <span className='ml-2 font-medium'>
                        {selectedRoomType.adult || 0} người lớn
                        {(selectedRoomType.children || 0) > 0 &&
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
                </>
              ) : (
                <p className='text-gray-500 text-sm'>
                  Chọn loại phòng để xem thông tin chi tiết
                </p>
              )}
            </div>
          );
        })()}

        {/* Action Buttons */}
        <div className='mt-8 flex items-center justify-end gap-4'>
          <button
            type='button'
            onClick={handleCancel}
            className='flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'
          >
            <TbX className='h-4 w-4' />
            Hủy
          </button>
          <button
            type='submit'
            disabled={loading}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Đang cập nhật...
              </>
            ) : (
              <>
                <TbCheck className='h-4 w-4' />
                Cập nhật phòng
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
