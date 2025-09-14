'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TbArrowLeft, TbDeviceFloppy, TbLoader } from 'react-icons/tb';
import { bookingsApi } from '@/features/admin/bookings/api/bookingsApi';
import { Room } from '@/features/admin/rooms/types';
import {
  CustomerInfoSection,
  RoomInfoSection,
  BookingDetailsSection,
  PaymentStatusSection,
  RoomAssignmentSection,
} from '@/features/admin/bookings/components/index';
import {
  BookingUpdateFormProps,
  BookingFormData,
  statusOptions,
} from '@/features/admin/bookings/types/types';

export default function BookingUpdateForm({
  booking,
  availableRooms = [],
  nights = 0,
}: BookingUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [roomsFromApi, setRoomsFromApi] = useState<Room[]>(availableRooms);
  const [loadingRooms, setLoadingRooms] = useState(false);

  // Form state
  const [formData, setFormData] = useState<BookingFormData>({
    status: booking.status,
    room_id: booking.room?.id || null,
    is_paid: booking.is_paid,
  });

  const loadAvailableRooms = async () => {
    try {
      setLoadingRooms(true);
      const rooms = await bookingsApi.getAvailableRooms(
        booking.room_type.id,
        booking.check_in_date.split('T')[0], // Extract date part
        booking.check_out_date.split('T')[0], // Extract date part
        booking.id, // Exclude current booking from availability check
      );
      setRoomsFromApi(rooms);
    } catch (err) {
      console.error('Error loading available rooms:', err);
      setError('Failed to load available rooms');
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    // If we have available rooms from props, use them
    if (availableRooms.length > 0) {
      setRoomsFromApi(availableRooms);
    } else if (
      (formData.status === 'confirmed' || formData.status === 'checked-in') &&
      roomsFromApi.length === 0
    ) {
      // Only load from API if we don't have rooms and status requires room assignment
      loadAvailableRooms();
    }
  }, [formData.status, availableRooms]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validate room assignment
    const validationError = validateRoomAssignment();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const updates: string[] = [];
      const updateData: Record<string, string | number | boolean | null> = {};

      // Collect all changes
      if (formData.status !== booking.status) {
        updateData.status = formData.status;
        updates.push(
          `Trạng thái đã cập nhật thành ${
            statusOptions.find((s) => s.value === formData.status)?.label
          }`,
        );
      }

      if (formData.room_id !== booking.room?.id) {
        updateData.room_id = formData.room_id;
        if (formData.room_id) {
          const selectedRoom = roomsFromApi.find(
            (r) => r.id === formData.room_id,
          );
          updates.push(
            `Phòng ${
              selectedRoom?.room_number || formData.room_id
            } đã được gán`,
          );
        } else {
          updates.push('Đã bỏ gán phòng');
        }
      }

      if (formData.is_paid !== booking.is_paid) {
        updateData.is_paid = formData.is_paid;
        updates.push(
          `Trạng thái thanh toán đã cập nhật thành ${
            formData.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán'
          }`,
        );
      }

      // Update booking with all changes in one API call
      if (Object.keys(updateData).length > 0) {
        await bookingsApi.updateBooking(booking.id, updateData);
      }

      const successMessage =
        updates.length > 0
          ? `Đặt phòng đã được cập nhật thành công! Thay đổi: ${updates.join(
              ', ',
            )}`
          : 'Đặt phòng đã được cập nhật thành công!';

      setSuccess(successMessage);

      // Redirect back to bookings list after a short delay
      setTimeout(() => {
        router.push('/admin/bookings');
      }, 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Lỗi khi cập nhật đặt phòng';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/bookings');
  };

  // Refresh available rooms (simplified - no longer needed in UI but kept for functionality)
  const refreshRooms = async () => {
    await loadAvailableRooms();
  };

  // Validate room assignment
  const validateRoomAssignment = (): string | null => {
    if (
      (formData.status === 'confirmed' || formData.status === 'checked-in') &&
      !formData.room_id
    ) {
      return 'Gán phòng là bắt buộc cho đặt phòng đã xác nhận hoặc đã nhận phòng.';
    }

    if (
      formData.room_id &&
      !roomsFromApi.find((r) => r.id === formData.room_id) &&
      formData.room_id !== booking.room?.id
    ) {
      return 'Phòng đã chọn không khả dụng hoặc không hợp lệ.';
    }

    return null;
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Header Actions */}
        <div className='flex items-center justify-between'>
          <button
            type='button'
            onClick={handleCancel}
            className='flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
          >
            <TbArrowLeft size={20} />
            Quay lại
          </button>

          <button
            type='submit'
            disabled={loading}
            className='flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (
              <TbLoader className='animate-spin' size={20} />
            ) : (
              <TbDeviceFloppy size={20} />
            )}
            {loading ? 'Cập nhật...' : 'Cập nhật đặt phòng'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg'>
            {success}
          </div>
        )}

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
            {error}
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <CustomerInfoSection
            booking={booking}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />

          <RoomInfoSection
            booking={booking}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />

          <BookingDetailsSection
            booking={booking}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            nights={nights}
          />

          <PaymentStatusSection
            booking={booking}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />
        </div>

        <RoomAssignmentSection
          booking={booking}
          formData={formData}
          setFormData={setFormData}
          availableRooms={roomsFromApi}
          loadingRooms={loadingRooms}
          onRefreshRooms={refreshRooms}
        />
      </form>
    </div>
  );
}
