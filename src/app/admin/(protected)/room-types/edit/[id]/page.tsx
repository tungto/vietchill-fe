'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TbArrowLeft, TbEdit, TbLoader } from 'react-icons/tb';
import EditRoomTypeForm from '@/features/admin/room-types/components/EditRoomTypeForm';
import { RoomType, fetchRoomType } from '@/features/admin/room-types/api/api';
// Simple currency formatting function
const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN');
};

export default function EditRoomTypePage() {
  const router = useRouter();
  const params = useParams();
  const roomTypeId = params.id as string;

  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use client-side currency formatting to prevent hydration mismatch
  const formattedPrice = formatCurrency(roomType?.price || 0);

  useEffect(() => {
    if (roomTypeId) {
      loadRoomType();
    }
  }, [roomTypeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadRoomType = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRoomType(parseInt(roomTypeId));
      if (data) {
        setRoomType(data);
      } else {
        setError('Không tìm thấy loại phòng');
      }
    } catch (err) {
      console.error('Failed to load room type:', err);
      setError('Không thể tải thông tin loại phòng');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSuccess = (updatedRoomType: RoomType) => {
    setSuccessMessage(
      `Loại phòng "${updatedRoomType.name}" đã được cập nhật thành công!`,
    );
    setErrorMessage(null);
    setRoomType(updatedRoomType);

    // Redirect to room types list after a short delay
    setTimeout(() => {
      router.push('/admin/room-types');
    }, 2000);
  };

  const handleEditError = (error: string) => {
    setErrorMessage(error);
    setSuccessMessage(null);
  };

  const handleGoBack = () => {
    router.push('/admin/room-types');
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <TbLoader className='animate-spin mx-auto h-8 w-8 text-blue-600 mb-4' />
          <p className='text-gray-600'>Đang tải thông tin loại phòng...</p>
        </div>
      </div>
    );
  }

  if (error || !roomType) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={handleGoBack}
            className='flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <TbArrowLeft size={20} />
            Quay lại
          </button>
        </div>

        <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
          <div className='text-red-600 mb-4'>
            <TbEdit className='mx-auto h-12 w-12 mb-2' />
            <h2 className='text-lg font-semibold'>Không thể tải loại phòng</h2>
          </div>
          <p className='text-red-700 mb-4'>{error}</p>
          <div className='flex gap-2 justify-center'>
            <button
              onClick={loadRoomType}
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              Thử lại
            </button>
            <button
              onClick={handleGoBack}
              className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={handleGoBack}
            className='flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <TbArrowLeft size={20} />
            Quay lại
          </button>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
              <TbEdit className='text-blue-600' />
              Chỉnh sửa loại phòng
            </h1>
            <p className='text-gray-600 mt-1'>
              Cập nhật thông tin loại phòng &ldquo;{roomType.name}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <p className='text-green-800 font-medium'>{successMessage}</p>
          </div>
          <p className='text-green-600 text-sm mt-1'>
            Đang chuyển hướng về danh sách loại phòng...
          </p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-red-500 rounded-full'></div>
            <p className='text-red-800 font-medium'>Lỗi cập nhật loại phòng</p>
          </div>
          <p className='text-red-600 text-sm mt-1'>{errorMessage}</p>
        </div>
      )}

      {/* Room Type Info */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <h3 className='text-blue-900 font-medium mb-2'>Thông tin hiện tại</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
          <div>
            <span className='text-blue-700 font-medium'>ID:</span>
            <span className='text-blue-800 ml-2'>#{roomType.id}</span>
          </div>
          <div>
            <span className='text-blue-700 font-medium'>Diện tích:</span>
            <span className='text-blue-800 ml-2'>{roomType.area}m²</span>
          </div>
          <div>
            <span className='text-blue-700 font-medium'>Giá:</span>
            <span className='text-blue-800 ml-2'>{formattedPrice} VND</span>
          </div>
          <div>
            <span className='text-blue-700 font-medium'>Số lượng:</span>
            <span className='text-blue-800 ml-2'>
              {roomType.quantity} phòng
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
        <EditRoomTypeForm
          roomType={roomType}
          onSuccess={handleEditSuccess}
          onError={handleEditError}
          onCancel={handleGoBack}
        />
      </div>

      {/* Help Text */}
      <div className='bg-amber-50 border border-amber-200 rounded-lg p-4'>
        <h3 className='text-amber-900 font-medium mb-2'>Lưu ý khi chỉnh sửa</h3>
        <ul className='text-amber-800 text-sm space-y-1'>
          <li>
            • Thay đổi thông tin sẽ ảnh hưởng đến tất cả phòng thuộc loại này
          </li>
          <li>
            • Hình ảnh mới sẽ được đồng bộ với server khi nhấn &ldquo;Cập
            nhật&rdquo;
          </li>
          <li>• Kiểm tra kỹ thông tin trước khi lưu thay đổi</li>
          <li>
            • Có thể hủy bỏ thay đổi bằng cách nhấn &ldquo;Hủy&rdquo; hoặc
            &ldquo;Quay lại&rdquo;
          </li>
        </ul>
      </div>
    </div>
  );
}
