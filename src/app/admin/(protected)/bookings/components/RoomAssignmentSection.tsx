import React, { useState } from 'react';
import { TbHome, TbX, TbCheck, TbLoader, TbSearch } from 'react-icons/tb';
import { Room } from '@/features/admin/rooms/type'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { RoomAssignmentProps, formatCurrency } from '../types';

export default function RoomAssignmentSection({
  booking,
  formData,
  setFormData,
  availableRooms,
  loadingRooms,
  onRefreshRooms,
}: RoomAssignmentProps) {
  const [roomSearchTerm, setRoomSearchTerm] = useState('');

  // Filter rooms based on search only (keep it simple)
  const filteredRooms = availableRooms.filter((room) => {
    if (!roomSearchTerm) return true;
    return (
      room.room_number.toLowerCase().includes(roomSearchTerm.toLowerCase()) ||
      room.room_type.name.toLowerCase().includes(roomSearchTerm.toLowerCase())
    );
  });

  // Only show room assignment section for confirmed or checked-in bookings
  if (formData.status !== 'confirmed' && formData.status !== 'checked-in') {
    return null;
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
          <TbHome size={20} />
          Gán phòng
        </h3>
        <p className='text-sm text-gray-600 mt-1'>
          Chọn phòng để gán cho đặt phòng này
        </p>
      </div>

      {/* Current Room Display */}
      {booking.room && (
        <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
          <p className='text-sm text-blue-800'>
            <span className='font-medium'>Phòng hiện tại:</span>{' '}
            {booking.room.room_number}
          </p>
        </div>
      )}

      {loadingRooms ? (
        <div className='flex items-center justify-center py-12'>
          <TbLoader className='animate-spin' size={32} />
          <span className='ml-3 text-gray-600 text-lg'>
            Đang tải phòng trống...
          </span>
        </div>
      ) : availableRooms.length === 0 && !booking.room ? (
        <div className='text-center py-12 text-gray-500'>
          <TbHome size={64} className='mx-auto mb-4 text-gray-300' />
          <h4 className='text-lg font-medium mb-2'>Không có phòng trống</h4>
          <p>Không có phòng nào trống cho ngày và loại phòng đã chọn.</p>
          <button
            type='button'
            onClick={onRefreshRooms}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Làm mới danh sách phòng
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {/* Simple Search */}
          {availableRooms.length > 5 && (
            <div className='relative'>
              <TbSearch
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Tìm phòng...'
                value={roomSearchTerm}
                onChange={(e) => setRoomSearchTerm(e.target.value)}
                className='w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          )}

          {/* Room Selection Grid */}
          <div className='space-y-3'>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Chọn phòng ({filteredRooms.length} phòng có sẵn)
            </label>

            {/* Option to remove room assignment */}
            {booking.room && (
              <label className='flex items-center p-3 border border-red-200 rounded-lg cursor-pointer hover:bg-red-50 mb-3'>
                <input
                  type='radio'
                  name='room'
                  value=''
                  checked={formData.room_id === null}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      room_id: null,
                    }))
                  }
                  className='mr-3 text-red-600 focus:ring-red-500'
                />
                <TbX size={16} className='text-red-600 mr-2' />
                <span className='text-red-800 font-medium'>Bỏ gán phòng</span>
              </label>
            )}

            {filteredRooms.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <TbSearch size={48} className='mx-auto mb-2 text-gray-300' />
                <p>Không có phòng nào phù hợp với tiêu chí tìm kiếm</p>
              </div>
            ) : (
              <div className='space-y-2'>
                {filteredRooms.map((room) => (
                  <label
                    key={room.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.room_id === room.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type='radio'
                      name='room'
                      value={room.id}
                      checked={formData.room_id === room.id}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          room_id: Number(e.target.value),
                        }))
                      }
                      className='mr-3 text-blue-600 focus:ring-blue-500'
                    />
                    <div className='flex-1'>
                      <div className='flex items-center justify-between'>
                        <span className='font-medium text-gray-900'>
                          Phòng {room.room_number}
                        </span>
                        <span className='text-sm text-gray-600'>
                          {formatCurrency(room.room_type?.price)}₫/đêm
                        </span>
                      </div>
                      <div className='text-sm text-gray-600 mt-1'>
                        {room.room_type?.name} • {room.room_type?.area}m²
                      </div>
                    </div>
                    {formData.room_id === room.id && (
                      <TbCheck size={16} className='text-blue-600 ml-2' />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
