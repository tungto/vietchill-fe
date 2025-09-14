'use client';

import React, { useState, useEffect } from 'react';
import {
  TbEdit,
  TbTrash,
  TbEye,
  TbChevronLeft,
  TbChevronRight,
  TbSearch,
  TbX,
} from 'react-icons/tb';
import { RoomType, deleteRoomType } from './api';

type RoomTypeListProps = {
  roomTypes: RoomType[];
  onDataChange: () => void;
  onEdit?: (roomType: RoomType) => void;
  onView?: (roomType: RoomType) => void;
};

const ITEMS_PER_PAGE = 10;

const RoomTypeList: React.FC<RoomTypeListProps> = ({
  roomTypes,
  onDataChange,
  onEdit,
  onView,
}) => {
  const [data, setData] = useState<RoomType[]>(roomTypes);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<RoomType[]>(roomTypes);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Update data when roomTypes prop changes
  useEffect(() => {
    setData(roomTypes);
    setFilteredData(roomTypes);
  }, [roomTypes]);

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (roomType) =>
          roomType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          roomType.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page when searching
    }
  }, [searchTerm, data]);

  const handleDeleteRoomType = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa loại phòng này?')) {
      try {
        setLoading(true);
        setError(null);

        await deleteRoomType(id);

        // Update local state
        setData((prev) => prev.filter((rt) => rt.id !== id));

        // Adjust pagination if last item on last page removed
        const newTotalPages = Math.ceil(
          (filteredData.length - 1) / ITEMS_PER_PAGE,
        );
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }

        onDataChange(); // Refresh data from parent
      } catch (err) {
        setError('Không thể xóa loại phòng');
        console.error('Error deleting room type:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Pagination slicing
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className='space-y-4'>
      {/* Search Bar */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <TbSearch className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Tìm kiếm theo tên hoặc mô tả...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
            >
              <TbX className='h-5 w-5 text-gray-400 hover:text-gray-600' />
            </button>
          )}
        </div>
        {searchTerm && (
          <p className='mt-2 text-sm text-gray-600'>
            Tìm thấy {filteredData.length} kết quả cho &ldquo;{searchTerm}
            &rdquo;
          </p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
          <button
            onClick={() => setError(null)}
            className='ml-2 text-red-900 hover:text-red-700'
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-lg flex items-center space-x-2'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
            <span>Đang xử lý...</span>
          </div>
        </div>
      )}

      {/* Room Types Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-indigo-100'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Tên loại phòng
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Diện tích
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Giá
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Số lượng
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Sức chứa
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Tiện nghi
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Không gian
                </th>
                <th className='px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className='px-6 py-8 text-center text-gray-500'
                  >
                    {searchTerm
                      ? 'Không tìm thấy loại phòng nào'
                      : 'Chưa có loại phòng nào'}
                  </td>
                </tr>
              ) : (
                paginatedData.map((roomType) => (
                  <tr
                    key={roomType.id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {roomType.id}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>
                        {roomType.name}
                      </div>
                      <div className='text-sm text-gray-500 text-wrap max-w-full'>
                        {roomType.description}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {roomType.area} m²
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {formatPrice(roomType.price)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {roomType.quantity}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {roomType.adult} người lớn
                      {roomType.children > 0 && `, ${roomType.children} trẻ em`}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      <div className='flex flex-wrap gap-1'>
                        {roomType.facilities.slice(0, 2).map((facility) => (
                          <span
                            key={facility.id}
                            className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
                          >
                            {facility.content}
                          </span>
                        ))}
                        {roomType.facilities.length > 2 && (
                          <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                            +{roomType.facilities.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      <div className='flex flex-wrap gap-1'>
                        {roomType.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature.id}
                            className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'
                          >
                            {feature.content}
                          </span>
                        ))}
                        {roomType.features.length > 2 && (
                          <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                            +{roomType.features.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                      <div className='flex items-center justify-center space-x-2'>
                        <button
                          onClick={() => onView?.(roomType)}
                          className='text-blue-600 hover:text-blue-800 transition-colors'
                          title='Xem chi tiết'
                          disabled={loading}
                        >
                          <TbEye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit?.(roomType)}
                          className='text-yellow-600 hover:text-yellow-800 transition-colors'
                          title='Chỉnh sửa'
                          disabled={loading}
                        >
                          <TbEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteRoomType(roomType.id)}
                          className='text-red-600 hover:text-red-800 transition-colors'
                          title='Xóa'
                          disabled={loading}
                        >
                          <TbTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
            <div className='flex-1 flex justify-between sm:hidden'>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Trước
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
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
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{' '}
                  đến{' '}
                  <span className='font-medium'>
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredData.length,
                    )}
                  </span>{' '}
                  trong tổng số{' '}
                  <span className='font-medium'>{filteredData.length}</span> kết
                  quả
                </p>
              </div>
              <div>
                <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <TbChevronLeft size={20} />
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <TbChevronRight size={20} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomTypeList;
