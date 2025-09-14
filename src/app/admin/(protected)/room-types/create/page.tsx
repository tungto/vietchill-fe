'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TbArrowLeft, TbPlus } from 'react-icons/tb';
import CreateRoomTypeForm from '../CreateRoomTypeForm';
import { RoomType } from '../api';

export default function CreateRoomTypePage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateSuccess = (roomType: RoomType) => {
    setSuccessMessage(`Loại phòng "${roomType.name}" đã được tạo thành công!`);
    setErrorMessage(null);

    // Redirect to room types list after a short delay
    setTimeout(() => {
      router.push('/admin/room-types');
    }, 2000);
  };

  const handleCreateError = (error: string) => {
    setErrorMessage(error);
    setSuccessMessage(null);
  };

  const handleGoBack = () => {
    router.push('/admin/room-types');
  };

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
              <TbPlus className='text-green-600' />
              Tạo loại phòng mới
            </h1>
            <p className='text-gray-600 mt-1'>
              Thêm loại phòng mới vào hệ thống quản lý khách sạn
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
            <p className='text-red-800 font-medium'>Lỗi tạo loại phòng</p>
          </div>
          <p className='text-red-600 text-sm mt-1'>{errorMessage}</p>
        </div>
      )}

      {/* Create Form */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
        <CreateRoomTypeForm
          onSuccess={handleCreateSuccess}
          onError={handleCreateError}
        />
      </div>

      {/* Help Text */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <h3 className='text-blue-900 font-medium mb-2'>
          Hướng dẫn tạo loại phòng
        </h3>
        <ul className='text-blue-800 text-sm space-y-1'>
          <li>• Điền đầy đủ thông tin cơ bản: tên, diện tích, giá, số lượng</li>
          <li>• Chọn các tiện nghi và đặc điểm phù hợp cho loại phòng</li>
          <li>• Tải lên hình ảnh và chọn ảnh đại diện cho loại phòng</li>
          <li>
            • Kiểm tra kỹ thông tin trước khi nhấn &ldquo;Tạo loại phòng&rdquo;
          </li>
        </ul>
      </div>
    </div>
  );
}
