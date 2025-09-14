import { createApiClient } from '@/lib/api/authApiClient';
import React from 'react';
import {
  TbCalendar,
  TbCurrencyDong,
  TbTrendingUp,
  TbHome,
  TbCheck,
  TbX,
  TbClock,
} from 'react-icons/tb';

interface BookingStats {
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_revenue: number;
  monthly_revenue: number;
  average_booking_value: number;
  occupancy_rate: number;
}

interface Booking {
  id: number;
  user: { name: string; email: string };
  room_type: { name: string; price: number };
  total_price: number;
  check_in_date: string;
  check_out_date: string;
  status: string;
  created_at: string;
}

async function fetchBookingStats(): Promise<BookingStats> {
  try {
    const api = await createApiClient();
    const response = await api.get('/admin/bookings');
    const bookings: Booking[] = response.data.data || [];

    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(
      (b) => b.status === 'pending',
    ).length;
    const confirmedBookings = bookings.filter(
      (b) => b.status === 'confirmed',
    ).length;
    const completedBookings = bookings.filter(
      (b) => b.status === 'completed',
    ).length;
    const cancelledBookings = bookings.filter(
      (b) => b.status === 'cancelled',
    ).length;

    const totalRevenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((sum, booking) => sum + booking.total_price, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = bookings
      .filter((b) => {
        const bookingDate = new Date(b.created_at);
        return (
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear &&
          b.status !== 'cancelled'
        );
      })
      .reduce((sum, booking) => sum + booking.total_price, 0);

    const averageBookingValue =
      totalBookings > 0 ? totalRevenue / totalBookings : 0;
    const occupancyRate =
      totalBookings > 0
        ? ((confirmedBookings + completedBookings) / totalBookings) * 100
        : 0;

    return {
      total_bookings: totalBookings,
      pending_bookings: pendingBookings,
      confirmed_bookings: confirmedBookings,
      completed_bookings: completedBookings,
      cancelled_bookings: cancelledBookings,
      total_revenue: totalRevenue,
      monthly_revenue: monthlyRevenue,
      average_booking_value: averageBookingValue,
      occupancy_rate: occupancyRate,
    };
  } catch (error) {
    console.error('Failed to fetch booking stats:', error);
    return {
      total_bookings: 0,
      pending_bookings: 0,
      confirmed_bookings: 0,
      completed_bookings: 0,
      cancelled_bookings: 0,
      total_revenue: 0,
      monthly_revenue: 0,
      average_booking_value: 0,
      occupancy_rate: 0,
    };
  }
}

async function fetchRecentBookings(): Promise<Booking[]> {
  try {
    const api = await createApiClient();
    const response = await api.get('/admin/bookings?limit=10');
    return response.data.data || [];
  } catch (error) {
    console.error('Failed to fetch recent bookings:', error);
    return [];
  }
}

export default async function BookingStatisticsPage() {
  const [stats, recentBookings] = await Promise.all([
    fetchBookingStats(),
    fetchRecentBookings(),
  ]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <TbClock size={16} />;
      case 'confirmed':
        return <TbCheck size={16} />;
      case 'completed':
        return <TbCheck size={16} />;
      case 'cancelled':
        return <TbX size={16} />;
      default:
        return <TbClock size={16} />;
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Thống kê đặt phòng</h1>
        <p className='text-gray-600'>Tổng quan hiệu suất và chỉ số đặt phòng</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Tổng đặt phòng
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {stats.total_bookings}
              </p>
            </div>
            <div className='p-3 bg-blue-100 rounded-full'>
              <TbCalendar className='text-blue-600' size={24} />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Doanh thu</p>
              <p className='text-2xl font-bold text-green-600'>
                {formatCurrency(stats.total_revenue)}₫
              </p>
            </div>
            <div className='p-3 bg-green-100 rounded-full'>
              <TbCurrencyDong className='text-green-600' size={24} />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Doanh thu tháng hiện tại
              </p>
              <p className='text-2xl font-bold text-purple-600'>
                {formatCurrency(stats.monthly_revenue)}₫
              </p>
            </div>
            <div className='p-3 bg-purple-100 rounded-full'>
              <TbTrendingUp className='text-purple-600' size={24} />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Tỷ lệ lấp đầy</p>
              <p className='text-2xl font-bold text-orange-600'>
                {stats.occupancy_rate.toFixed(1)}%
              </p>
            </div>
            <div className='p-3 bg-orange-100 rounded-full'>
              <TbHome className='text-orange-600' size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-yellow-100 rounded-full'>
              <TbClock className='text-yellow-600' size={20} />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Chờ xử lý</p>
              <p className='text-xl font-bold text-gray-900'>
                {stats.pending_bookings}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-100 rounded-full'>
              <TbCheck className='text-blue-600' size={20} />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Đã xác nhận</p>
              <p className='text-xl font-bold text-gray-900'>
                {stats.confirmed_bookings}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-green-100 rounded-full'>
              <TbCheck className='text-green-600' size={20} />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Đã hoàn thành</p>
              <p className='text-xl font-bold text-gray-900'>
                {stats.completed_bookings}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-red-100 rounded-full'>
              <TbX className='text-red-600' size={20} />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Đã hủy</p>
              <p className='text-xl font-bold text-gray-900'>
                {stats.cancelled_bookings}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Chỉ số quan trọng
          </h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>
                Giá trị trung bình đặt phòng
              </span>
              <span className='font-semibold text-gray-900'>
                {formatCurrency(stats.average_booking_value)}₫
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Tỷ lệ chuyển đổi</span>
              <span className='font-semibold text-gray-900'>
                {stats.total_bookings > 0
                  ? (
                      ((stats.confirmed_bookings + stats.completed_bookings) /
                        stats.total_bookings) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Tỷ lệ hủy đặt phòng</span>
              <span className='font-semibold text-red-600'>
                {stats.total_bookings > 0
                  ? (
                      (stats.cancelled_bookings / stats.total_bookings) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Recent Bookings
          </h3>
          <div className='space-y-3'>
            {recentBookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
              >
                <div className='flex-1'>
                  <p className='font-medium text-gray-900 text-sm'>
                    {booking.user.name}
                  </p>
                  <p className='text-gray-600 text-xs'>
                    {booking.room_type.name}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-semibold text-gray-900 text-sm'>
                    {formatCurrency(booking.total_price)}₫
                  </p>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status,
                    )}`}
                  >
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
