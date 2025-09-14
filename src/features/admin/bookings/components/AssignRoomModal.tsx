'use client';

import React, { useState, useEffect } from 'react';
import { TbX, TbHome, TbLoader } from 'react-icons/tb';
import {
  Booking,
  bookingsApi,
} from '@/features/admin/bookings/api/bookingsApi';

interface Room {
  id: number;
  room_number: string;
  room_type_id: number;
  is_active: boolean;
  room_type: {
    id: number;
    name: string;
  };
}

interface AssignRoomModalProps {
  booking: Booking;
  onClose: () => void;
  onAssign: () => void;
}

export default function AssignRoomModal({
  booking,
  onClose,
  onAssign,
}: AssignRoomModalProps) {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  useEffect(() => {
    loadAvailableRooms();
  }, []);

  const loadAvailableRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const rooms = await bookingsApi.getAvailableRooms(
        booking.room_type.id,
        booking.check_in_date,
        booking.check_out_date,
      );
      setAvailableRooms(rooms);
    } catch (err) {
      setError('Failed to load available rooms');
      console.error('Error loading available rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRoom = async () => {
    if (!selectedRoomId) return;

    try {
      setAssigning(true);
      setError(null);
      await bookingsApi.assignRoom(booking.id, selectedRoomId);
      onAssign();
    } catch (err) {
      setError('Failed to assign room');
      console.error('Error assigning room:', err);
    } finally {
      setAssigning(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
            <TbHome size={24} />
            Gán phòng
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100'
          >
            <TbX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-4'>
          {/* Booking Info */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h3 className='font-medium text-gray-900 mb-2'>
              Thông tin đặt phòng
            </h3>
            <div className='text-sm text-gray-600 space-y-1'>
              <p>
                <strong>Khách hàng:</strong> {booking.user.name}
              </p>
              <p>
                <strong>Loại phòng:</strong> {booking.room_type.name}
              </p>
              <p>
                <strong>Ngày nhận phòng:</strong>{' '}
                {formatDate(booking.check_in_date)}
              </p>
              <p>
                <strong>Ngày trả phòng:</strong>{' '}
                {formatDate(booking.check_out_date)}
              </p>
              <p>
                <strong>Khách:</strong> {booking.adult} người lớn,{' '}
                {booking.children} trẻ em
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
              {error}
            </div>
          )}

          {/* Available Rooms */}
          <div>
            <h3 className='font-medium text-gray-900 mb-3'>Phòng có sẵn</h3>

            {loading ? (
              <div className='flex items-center justify-center py-8'>
                <TbLoader className='animate-spin' size={24} />
                <span className='ml-2 text-gray-600'>Đang tải phòng...</span>
              </div>
            ) : availableRooms.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <TbHome size={48} className='mx-auto mb-2 text-gray-300' />
                <p>Không tìm thấy phòng</p>
              </div>
            ) : (
              <div className='space-y-2 max-h-60 overflow-y-auto'>
                {availableRooms.map((room) => (
                  <label
                    key={room.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedRoomId === room.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type='radio'
                      name='room'
                      value={room.id}
                      checked={selectedRoomId === room.id}
                      onChange={(e) =>
                        setSelectedRoomId(Number(e.target.value))
                      }
                      className='mr-3'
                    />
                    <div className='flex-1'>
                      <div className='font-medium text-gray-900'>
                        Phòng {room.room_number}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {room.room_type.name}
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        room.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {room.is_active ? 'Hoạt động' : 'Không hoạt động'}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 p-6 border-t border-gray-200'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
            disabled={assigning}
          >
            Hủy
          </button>
          <button
            onClick={handleAssignRoom}
            disabled={!selectedRoomId || assigning || loading}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {assigning && <TbLoader className='animate-spin' size={16} />}
            {assigning ? 'Assigning...' : 'Assign Room'}
          </button>
        </div>
      </div>
    </div>
  );
}
