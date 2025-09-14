'use client';

import React, { useState, useEffect } from 'react';
import {
  TbEye,
  TbEdit,
  TbTrash,
  TbFilter,
  TbSearch,
  TbHome,
  TbCalendar,
  TbUser,
  TbCurrencyDong,
} from 'react-icons/tb';
import { bookingsApi, Booking } from '@/lib/api/admin/bookingsApi';
import BookingDetailModal from './BookingDetailModal';

interface BookingsListProps {
  initialBookings: Booking[];
  initialPagination: {
    total: number;
    current_page: number;
    limit: number;
    last_page: number;
  };
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  'checked-in': 'bg-green-100 text-green-800',
  'checked-out': 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  'checked-in': 'Đã nhận phòng',
  'checked-out': 'Đã trả phòng',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export default function BookingsList({
  initialBookings,
  initialPagination,
}: BookingsListProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const loadBookings = async (
    filters: Record<string, string | number> = {},
  ) => {
    try {
      setLoading(true);
      setError(null);
      const result = await bookingsApi.getBookings({
        limit: 50,
        ...filters,
        ...(statusFilter && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
        ...(dateFilter && { from_date: dateFilter }),
      });
      setBookings(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBooking = (bookingId: number) => {
    window.location.href = `/admin/bookings/edit/${bookingId}`;
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      setLoading(true);
      await bookingsApi.deleteBooking(bookingId);
      await loadBookings();
      setError(null);
    } catch (err) {
      setError('Failed to delete booking');
      console.error('Error deleting booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm || statusFilter || dateFilter) {
        loadBookings();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, statusFilter, dateFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='space-y-6'>
      {/* Filters */}
      <div className='bg-white p-4 rounded-lg shadow-sm border'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='relative'>
            <TbSearch
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              placeholder='Tìm theo tên, email, hoặc điện thoại...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className='relative'>
            <TbFilter
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none'
            >
              <option value=''>Tất cả trạng thái</option>
              <option value='pending'>Chờ xác nhận</option>
              <option value='confirmed'>Đã xác nhận</option>
              <option value='checked-in'>Đã nhận phòng</option>
              <option value='checked-out'>Đã trả phòng</option>
              <option value='completed'>Hoàn thành</option>
              <option value='cancelled'>Đã hủy</option>
            </select>
          </div>

          <div className='relative'>
            <TbCalendar
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='date'
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setDateFilter('');
              loadBookings();
            }}
            className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
          {error}
        </div>
      )}

      {/* Bookings Table */}
      <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <div className='flex items-center gap-2'>
                    <TbUser size={16} />
                    Khách hàng
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <div className='flex items-center gap-2'>
                    <TbHome size={16} />
                    Chi tiết phòng
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <div className='flex items-center gap-2'>
                    <TbCalendar size={16} />
                    Ngày
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <div className='flex items-center gap-2'>
                    <TbCurrencyDong size={16} />
                    Số tiền
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Trạng thái
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {loading ? (
                <tr>
                  <td colSpan={6} className='px-6 py-12 text-center'>
                    <div className='flex items-center justify-center'>
                      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                      <span className='ml-2 text-gray-600'>
                        Đang tải đặt phòng...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className='px-6 py-12 text-center text-gray-500'
                  >
                    Không tìm thấy đặt phòng
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {booking.user.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {booking.user.email}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {booking.phone}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {booking.room_type.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          Phòng: {booking.room?.room_number || 'Chưa gán'}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {booking.adult} người lớn, {booking.children} trẻ em
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm text-gray-900'>
                          Ngày nhận phòng: {formatDate(booking.check_in_date)}
                        </div>
                        <div className='text-sm text-gray-900'>
                          Ngày trả phòng: {formatDate(booking.check_out_date)}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {formatCurrency(booking.total_price)}₫
                        </div>
                        <div
                          className={`text-sm ${
                            booking.is_paid ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {booking.is_paid
                            ? 'Đã thanh toán'
                            : 'Chưa thanh toán'}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                          statusColors[booking.status]
                        }`}
                      >
                        {statusLabels[booking.status]}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className='text-blue-600 hover:text-blue-900 p-1 rounded'
                          title='Xem chi tiết'
                        >
                          <TbEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditBooking(booking.id)}
                          className='text-green-600 hover:text-green-900 p-1 rounded'
                          title='Sửa đặt phòng'
                        >
                          <TbEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className='text-red-600 hover:text-red-900 p-1 rounded'
                          title='Xóa đặt phòng'
                          disabled={loading}
                        >
                          <TbTrash size={16} />
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
        {pagination.total > 0 && (
          <div className='bg-white px-4 py-3 border-t border-gray-200 sm:px-6'>
            <div className='flex items-center justify-between'>
              <div className='flex-1 flex justify-between sm:hidden'>
                <button
                  onClick={() =>
                    loadBookings({ page: pagination.current_page - 1 })
                  }
                  disabled={pagination.current_page <= 1}
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50'
                >
                  Trang trước
                </button>
                <button
                  onClick={() =>
                    loadBookings({ page: pagination.current_page + 1 })
                  }
                  disabled={pagination.current_page >= pagination.last_page}
                  className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50'
                >
                  Trang sau
                </button>
              </div>
              <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div>
                  <p className='text-sm text-gray-700'>
                    Hiển thị trang{' '}
                    <span className='font-medium'>
                      {pagination.current_page}
                    </span>{' '}
                    của{' '}
                    <span className='font-medium'>{pagination.last_page}</span>{' '}
                    ({pagination.total} đặt phòng)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showDetailModal && selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedBooking(null);
          }}
          onUpdate={() => {
            loadBookings();
            setShowDetailModal(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
}
