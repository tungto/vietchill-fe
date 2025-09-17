'use client';

import { useState, useEffect } from 'react';
import { dashboardApi, DashboardStats } from '@/features/admin/dashboard/api';
import {
  SimpleBarChart,
  SimplePieChart,
  ChartDataPoint,
} from '@/features/admin/dashboard/components/SimpleChart';
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

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
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

      const [statsData, statusDistribution, roomTypesData] = await Promise.all([
        dashboardApi.getDashboardStats(),
        dashboardApi.getBookingStatusDistribution(),
        dashboardApi.getTopRoomTypes(5),
      ]);

      setStats(statsData);

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
