'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  roomsApi,
  Room,
  RoomFilters,
} from '@/features/admin/rooms/api/roomsApi';
import {
  TbHome,
  TbEdit,
  TbTrash,
  TbEye,
  TbSearch,
  TbRefresh,
  TbCheck,
  TbX,
  TbPlus,
} from 'react-icons/tb';

interface Pagination {
  total: number;
  current_page: number;
  limit: number;
  last_page: number;
}

interface RoomTableProps {
  initialRooms?: Room[];
}

export default function RoomTable({ initialRooms = [] }: RoomTableProps) {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    current_page: 1,
    limit: 50,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | undefined>(
    undefined,
  );
  const [filterRoomType, setFilterRoomType] = useState<number | undefined>(
    undefined,
  );
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const loadRooms = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const filters: RoomFilters = {
          page,
          limit: pagination.limit,
          search: searchTerm || undefined,
          is_active: filterActive,
          room_type_id: filterRoomType,
        };

        const response = await roomsApi.getRooms(filters);
        setRooms(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Failed to load rooms:', error);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchTerm, filterActive, filterRoomType],
  );

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  const handleToggleStatus = async (roomId: number, isActive: boolean) => {
    try {
      await roomsApi.updateRoom(roomId, { is_active: isActive });
      setRooms((prev) =>
        prev.map((room) =>
          room.id === roomId ? { ...room, is_active: isActive } : room,
        ),
      );
    } catch (error) {
      console.error('Failed to update room status:', error);
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phòng này?')) return;

    try {
      await roomsApi.deleteRoom(roomId);
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {isActive ? 'Hoạt động' : 'Không hoạt động'}
      </span>
    );
  };

  // Get unique room types for filter
  const roomTypes = Array.from(
    new Map(rooms.map((room) => [room.room_type.id, room.room_type])).values(),
  );

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                Quản lý phòng
              </h1>
              <p className='text-gray-600'>
                Quản lý danh sách phòng và trạng thái
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/rooms/create')}
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            >
              <TbPlus className='h-4 w-4' />
              Thêm phòng mới
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Tổng phòng</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {pagination.total}
                </p>
              </div>
              <TbHome className='h-8 w-8 text-blue-600' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Đang hoạt động
                </p>
                <p className='text-2xl font-bold text-green-600'>
                  {rooms.filter((room) => room.is_active).length}
                </p>
              </div>
              <TbCheck className='h-8 w-8 text-green-600' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Không hoạt động
                </p>
                <p className='text-2xl font-bold text-red-600'>
                  {rooms.filter((room) => !room.is_active).length}
                </p>
              </div>
              <TbX className='h-8 w-8 text-red-600' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Loại phòng</p>
                <p className='text-2xl font-bold text-purple-600'>
                  {roomTypes.length}
                </p>
              </div>
              <TbHome className='h-8 w-8 text-purple-600' />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className='bg-white p-4 rounded-lg shadow-sm border mb-6'>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <div className='flex flex-col sm:flex-row gap-4 flex-1'>
              {/* Search */}
              <div className='relative flex-1 max-w-md'>
                <TbSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <input
                  type='text'
                  placeholder='Tìm kiếm theo số phòng...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              {/* Status Filter */}
              <select
                value={
                  filterActive === undefined ? '' : filterActive.toString()
                }
                onChange={(e) =>
                  setFilterActive(
                    e.target.value === ''
                      ? undefined
                      : e.target.value === 'true',
                  )
                }
                className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value=''>Tất cả trạng thái</option>
                <option value='true'>Hoạt động</option>
                <option value='false'>Không hoạt động</option>
              </select>

              {/* Room Type Filter */}
              <select
                value={filterRoomType || ''}
                onChange={(e) =>
                  setFilterRoomType(
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value=''>Tất cả loại phòng</option>
                {roomTypes.map((roomType) => (
                  <option key={roomType.id} value={roomType.id}>
                    {roomType.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex gap-2'>
              <button
                onClick={() => loadRooms(pagination.current_page)}
                className='flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                <TbRefresh className='h-4 w-4' />
                Làm mới
              </button>
            </div>
          </div>
        </div>

        {/* Rooms Table */}
        <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
          {loading ? (
            <div className='p-8 text-center'>
              <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              <p className='mt-2 text-gray-600'>Đang tải...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className='p-8 text-center'>
              <TbHome className='mx-auto h-12 w-12 text-gray-400' />
              <h3 className='mt-2 text-sm font-medium text-gray-900'>
                Không có phòng
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Chưa có phòng nào được tạo.
              </p>
              <button className='mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                <TbPlus className='h-4 w-4' />
                Thêm phòng đầu tiên
              </button>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Số phòng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Loại phòng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Giá/đêm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Diện tích
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Sức chứa
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {rooms.map((room) => (
                    <tr key={room.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          Phòng {room.room_number}
                        </div>
                        <div className='text-sm text-gray-500'>
                          ID: {room.id}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900 font-medium'>
                          {room.room_type.name}
                        </div>
                        <div className='text-sm text-gray-500 text-wrap max-w-full'>
                          {room.room_type.description}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {formatCurrency(room.room_type.price)}₫
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {room.room_type.area}m²
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {room.room_type.adult} người lớn
                        {room.room_type.children > 0 &&
                          `, ${room.room_type.children} trẻ em`}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <button
                          onClick={() =>
                            handleToggleStatus(room.id, !room.is_active)
                          }
                          className='cursor-pointer'
                        >
                          {getStatusBadge(room.is_active)}
                        </button>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() =>
                              router.push(`/admin/rooms/edit/${room.id}`)
                            }
                            className='text-blue-600 hover:text-blue-900'
                            title='Chỉnh sửa'
                          >
                            <TbEdit className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => setSelectedRoom(room)}
                            className='text-green-600 hover:text-green-900'
                            title='Xem chi tiết'
                          >
                            <TbEye className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className='text-red-600 hover:text-red-900'
                            title='Xóa'
                          >
                            <TbTrash className='h-4 w-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className='bg-white px-4 py-3 border-t border-gray-200 sm:px-6'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 flex justify-between sm:hidden'>
                  <button
                    onClick={() => loadRooms(pagination.current_page - 1)}
                    disabled={pagination.current_page <= 1}
                    className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => loadRooms(pagination.current_page + 1)}
                    disabled={pagination.current_page >= pagination.last_page}
                    className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Sau
                  </button>
                </div>
                <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                  <div>
                    <p className='text-sm text-gray-700'>
                      Hiển thị{' '}
                      <span className='font-medium'>
                        {(pagination.current_page - 1) * pagination.limit + 1}
                      </span>{' '}
                      đến{' '}
                      <span className='font-medium'>
                        {Math.min(
                          pagination.current_page * pagination.limit,
                          pagination.total,
                        )}
                      </span>{' '}
                      trong tổng số{' '}
                      <span className='font-medium'>{pagination.total}</span>{' '}
                      kết quả
                    </p>
                  </div>
                  <div>
                    <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
                      <button
                        onClick={() => loadRooms(pagination.current_page - 1)}
                        disabled={pagination.current_page <= 1}
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Trước
                      </button>
                      {Array.from(
                        { length: Math.min(5, pagination.last_page) },
                        (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => loadRooms(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === pagination.current_page
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        },
                      )}
                      <button
                        onClick={() => loadRooms(pagination.current_page + 1)}
                        disabled={
                          pagination.current_page >= pagination.last_page
                        }
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Room Detail Modal */}
        {selectedRoom && (
          <div className='fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50'>
            <div className='relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Chi tiết phòng
                </h3>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <TbX className='h-6 w-6' />
                </button>
              </div>

              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Số phòng
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      Phòng {selectedRoom.room_number}
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Trạng thái
                    </label>
                    <div className='mt-1'>
                      {getStatusBadge(selectedRoom.is_active)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Loại phòng
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedRoom.room_type.name}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Mô tả
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedRoom.room_type.description}
                  </p>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Giá/đêm
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {formatCurrency(selectedRoom.room_type.price)}₫
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Diện tích
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {selectedRoom.room_type.area}m²
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Sức chứa
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {selectedRoom.room_type.adult} người lớn
                      {selectedRoom.room_type.children > 0 &&
                        `, ${selectedRoom.room_type.children} trẻ em`}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Ngày tạo
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {new Date(selectedRoom.created_at).toLocaleString(
                        'vi-VN',
                      )}
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Cập nhật cuối
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {new Date(selectedRoom.updated_at).toLocaleString(
                        'vi-VN',
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-6 flex justify-end gap-3'>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
