'use client';

import { useState, useEffect } from 'react';
import {
  dashboardApi,
  DashboardStats,
  RecentBooking,
} from '@/lib/api/admin/dashboardApi';
import { bookingsApi } from '@/lib/api/admin/bookingsApi';
import {
  SimpleBarChart,
  SimplePieChart,
  ChartDataPoint,
} from '@/components/admin/SimpleChart';
import {
  TbDashboard,
  TbHourglass,
  TbCurrencyDollar,
  TbBuilding,
  TbBed,
  TbCalendar,
  TbMail,
  TbCircleCheck,
  TbConfetti,
  TbRefresh,
  TbClipboardList,
  TbMessageCircle,
  TbHome,
  TbStar,
  TbCoins,
} from 'react-icons/tb';

// Statistics Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
}) => {
  return (
    <div
      className='bg-white rounded-lg shadow-md p-6 border-l-4'
      style={{ borderLeftColor: color }}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
          {trend && (
            <p
              className={`text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '↗' : '↘'} {trend.value}%
            </p>
          )}
        </div>
        <div style={{ color }}>
          <Icon className='text-3xl' />
        </div>
      </div>
    </div>
  );
};

// Recent Booking Item Component
interface RecentBookingItemProps {
  booking: RecentBooking;
  onStatusUpdate: (id: number, status: string) => void;
}

const RecentBookingItem: React.FC<RecentBookingItemProps> = ({
  booking,
  onStatusUpdate,
}) => {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className='flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50'>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium text-gray-900'>
            #{booking.id} - {booking.user.name}
          </h4>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
              booking.status,
            )}`}
          >
            {booking.status}
          </span>
        </div>
        <p className='text-sm text-gray-600'>{booking.room_type.name}</p>
        <p className='text-sm text-gray-500'>
          {formatDate(booking.check_in_date)} -{' '}
          {formatDate(booking.check_out_date)}
        </p>
        <p className='text-sm font-medium text-gray-900'>
          {formatCurrency(booking.total_price)}
        </p>
      </div>
      {booking.status === 'pending' && (
        <div className='flex gap-2 ml-4'>
          <button
            onClick={() => onStatusUpdate(booking.id, 'confirmed')}
            className='px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Xác nhận
          </button>
          <button
            onClick={() => onStatusUpdate(booking.id, 'cancelled')}
            className='px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700'
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

// Quick Action Button Component
interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 text-left w-full'
      style={{ borderLeftColor: color }}
    >
      <div className='flex items-center'>
        <div className='mr-3' style={{ color }}>
          <Icon className='text-2xl' />
        </div>
        <div>
          <h3 className='font-medium text-gray-900'>{title}</h3>
          <p className='text-sm text-gray-600'>{description}</p>
        </div>
      </div>
    </button>
  );
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [bookingStatusData, setBookingStatusData] = useState<ChartDataPoint[]>(
    [],
  );
  const [topRoomTypes, setTopRoomTypes] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, bookingsData, statusDistribution, roomTypesData] =
        await Promise.all([
          dashboardApi.getDashboardStats(),
          dashboardApi.getRecentBookings(10),
          dashboardApi.getBookingStatusDistribution(),
          dashboardApi.getTopRoomTypes(5),
        ]);

      setStats(statsData);
      setRecentBookings(bookingsData);

      // Transform status distribution for pie chart
      const statusColors = {
        pending: '#F59E0B',
        confirmed: '#3B82F6',
        completed: '#10B981',
        cancelled: '#EF4444',
        'checked-in': '#8B5CF6',
        'checked-out': '#06B6D4',
      };

      setBookingStatusData(
        statusDistribution.map((item) => ({
          label: item.status,
          value: item.count,
          color:
            statusColors[item.status as keyof typeof statusColors] || '#6B7280',
        })),
      );

      // Transform room types data for bar chart
      setTopRoomTypes(
        roomTypesData.map((item, index) => ({
          label: item.name,
          value: item.bookings,
          color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][
            index % 5
          ],
        })),
      );
    } catch (err) {
      setError('Không thể tải dữ liệu dashboard');
      console.error('Dashboard loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingStatusUpdate = async (
    bookingId: number,
    status: string,
  ) => {
    try {
      await bookingsApi.updateBookingStatus(bookingId, status);
      // Reload recent bookings
      const updatedBookings = await dashboardApi.getRecentBookings(10);
      setRecentBookings(updatedBookings);
      // Reload stats
      const updatedStats = await dashboardApi.getDashboardStats();
      setStats(updatedStats);
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
        {error}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>Bảng theo dõi</h1>
        <button
          onClick={loadDashboardData}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'
        >
          <TbRefresh className='text-lg' />
          Làm mới
        </button>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          title='Tổng đặt phòng'
          value={stats?.totalBookings || 0}
          icon={TbDashboard}
          color='#3B82F6'
        />
        <StatCard
          title='Đặt phòng chờ'
          value={stats?.pendingBookings || 0}
          icon={TbHourglass}
          color='#F59E0B'
        />
        <StatCard
          title='Doanh thu'
          value={formatCurrency(stats?.totalRevenue || 0)}
          icon={TbCurrencyDollar}
          color='#10B981'
        />
        <StatCard
          title='Tỷ lệ lấp đầy'
          value={`${stats?.occupancyRate || 0}%`}
          icon={TbBuilding}
          color='#8B5CF6'
        />
      </div>

      {/* Secondary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        <StatCard
          title='Phòng khả dụng'
          value={stats?.availableRooms || 0}
          icon={TbBed}
          color='#06B6D4'
        />
        <StatCard
          title='Đặt phòng hôm nay'
          value={stats?.todayBookings || 0}
          icon={TbCalendar}
          color='#F97316'
        />
        <StatCard
          title='Doanh thu hôm nay'
          value={formatCurrency(stats?.todayRevenue || 0)}
          icon={TbCoins}
          color='#84CC16'
        />
        <StatCard
          title='Tin nhắn chưa đọc'
          value={stats?.unreadQueries || 0}
          icon={TbMail}
          color='#EF4444'
        />
        <StatCard
          title='Đã xác nhận'
          value={stats?.confirmedBookings || 0}
          icon={TbCircleCheck}
          color='#22C55E'
        />
        <StatCard
          title='Đã hoàn thành'
          value={stats?.completedBookings || 0}
          icon={TbConfetti}
          color='#A855F7'
        />
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Bookings */}
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow-md'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Đặt phòng gần đây
              </h2>
            </div>
            <div className='max-h-96 overflow-y-auto'>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <RecentBookingItem
                    key={booking.id}
                    booking={booking}
                    onStatusUpdate={handleBookingStatusUpdate}
                  />
                ))
              ) : (
                <div className='p-6 text-center text-gray-500'>
                  Không có đặt phòng nào gần đây
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Thao tác nhanh
          </h2>

          <QuickAction
            title='Quản lý đặt phòng'
            description='Xem và quản lý tất cả đặt phòng'
            icon={TbClipboardList}
            color='#3B82F6'
            onClick={() => (window.location.href = '/admin/bookings')}
          />

          <QuickAction
            title='Tin nhắn khách hàng'
            description={`${stats?.unreadQueries || 0} tin nhắn chưa đọc`}
            icon={TbMessageCircle}
            color='#EF4444'
            onClick={() => (window.location.href = '/admin/user-queries')}
          />

          <QuickAction
            title='Quản lý phòng'
            description='Thêm, sửa, xóa phòng'
            icon={TbHome}
            color='#10B981'
            onClick={() => (window.location.href = '/admin/rooms')}
          />

          <QuickAction
            title='Tiện nghi & Không gian'
            description='Quản lý tiện nghi và không gian'
            icon={TbStar}
            color='#F59E0B'
            onClick={() => (window.location.href = '/admin/facilities')}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Booking Status Distribution */}
        <SimplePieChart
          data={bookingStatusData}
          title='Phân bổ trạng thái đặt phòng'
          size={180}
        />

        {/* Top Room Types */}
        <SimpleBarChart
          data={topRoomTypes}
          title='Top 5 loại phòng được đặt nhiều nhất'
          height={200}
        />
      </div>

      {/* Status Overview */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Tổng quan trạng thái đặt phòng
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-600'>
              {stats?.pendingBookings || 0}
            </div>
            <div className='text-sm text-gray-600'>Chờ xử lý</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-600'>
              {stats?.confirmedBookings || 0}
            </div>
            <div className='text-sm text-gray-600'>Đã xác nhận</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-600'>
              {stats?.completedBookings || 0}
            </div>
            <div className='text-sm text-gray-600'>Hoàn thành</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-red-600'>
              {stats?.cancelledBookings || 0}
            </div>
            <div className='text-sm text-gray-600'>Đã hủy</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-gray-600'>
              {stats?.totalBookings || 0}
            </div>
            <div className='text-sm text-gray-600'>Tổng cộng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
