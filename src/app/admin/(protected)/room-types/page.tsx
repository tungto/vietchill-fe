'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TbPlus, TbList, TbRefresh } from 'react-icons/tb';
import {
  RoomTypeList,
  RoomTypeDetailModal,
} from '@/features/admin/room-types/components';
import { fetchRoomTypes, RoomType } from '@/features/admin/room-types/api';

export default function RoomTypesPage() {
  const router = useRouter();
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingRoomType, setViewingRoomType] = useState<RoomType | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchRoomTypes(1, 100); // Load all room types
      setRoomTypes(response.data);
    } catch (err) {
      setError('Không thể tải danh sách loại phòng');
      console.error('Error loading room types:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomTypeUpdate = () => {
    loadRoomTypes();
    setSuccessMessage('Cập nhật loại phòng thành công!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleEdit = (roomType: RoomType) => {
    router.push(`/admin/room-types/edit/${roomType.id}`);
  };

  const handleView = (roomType: RoomType) => {
    setViewingRoomType(roomType);
  };

  const handleCloseView = () => {
    setViewingRoomType(null);
  };

  const handleCreateNew = () => {
    router.push('/admin/room-types/create');
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        <span className='ml-3 text-gray-600'>Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
        {error}
        <button
          onClick={loadRoomTypes}
          className='ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Quản lý loại phòng
          </h1>
          <p className='text-gray-600 mt-1'>
            Quản lý các loại phòng trong hệ thống khách sạn
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <button
            onClick={handleCreateNew}
            className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2'
          >
            <TbPlus />
            Thêm loại phòng
          </button>
          <button
            onClick={loadRoomTypes}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
          >
            <TbRefresh />
            Làm mới
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-between'>
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage(null)}
            className='text-green-900 hover:text-green-700 ml-2'
          >
            ✕
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center justify-between'>
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className='text-red-900 hover:text-red-700 ml-2'
          >
            ✕
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <TbList className='h-6 w-6 text-gray-400' />
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Tổng loại phòng
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {roomTypes.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <TbPlus className='h-6 w-6 text-gray-400' />
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Tổng số phòng
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {roomTypes.reduce((sum, rt) => sum + rt.quantity, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='h-6 w-6 text-gray-400'>💰</div>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Giá trung bình
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {roomTypes.length > 0
                      ? new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(
                          roomTypes.reduce((sum, rt) => sum + rt.price, 0) /
                            roomTypes.length,
                        )
                      : '0 ₫'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='h-6 w-6 text-gray-400'>📐</div>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Diện tích TB
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {roomTypes.length > 0
                      ? Math.round(
                          roomTypes.reduce((sum, rt) => sum + rt.area, 0) /
                            roomTypes.length,
                        )
                      : 0}{' '}
                    m²
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Types List */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
        <RoomTypeList
          roomTypes={roomTypes}
          onDataChange={handleRoomTypeUpdate}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>

      {/* Detail Modal */}
      {viewingRoomType && (
        <RoomTypeDetailModal
          roomType={viewingRoomType}
          isOpen={!!viewingRoomType}
          onClose={handleCloseView}
        />
      )}
    </div>
  );
}
