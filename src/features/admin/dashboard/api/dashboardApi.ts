import { apiClient } from '@/features/shared/api/apiClient';
import { Booking } from '@/features/vietstay/booking/types/booking';
import { Query } from '@/features/admin/user-queries/api/queriesApi';
import { Room } from '@/features/admin/rooms/types';

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  totalRooms: number;
  availableRooms: number;
  totalUsers: number;
  totalQueries: number;
  unreadQueries: number;
  todayBookings: number;
  todayRevenue: number;
  occupancyRate: number;
}

export interface RecentBooking {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  room_type: {
    id: number;
    name: string;
    price: number;
  };
  status: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  created_at: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}

export class DashboardApi {
  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats | null> {
    try {
      // Since there's no specific dashboard stats endpoint, we'll aggregate from multiple endpoints
      const [bookingsRes, roomsRes, queriesRes] = await Promise.all([
        apiClient.get('/admin/bookings?limit=1000'),
        apiClient.get('/admin/rooms?limit=1000'),
        apiClient.get('/admin/queries?limit=1000'),
      ]);

      const bookings = bookingsRes.data.data || [];
      const rooms = roomsRes.data.data || [];
      const queries = queriesRes.data.data || [];

      // Calculate statistics
      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter(
        (b: Booking) => b.status === 'pending',
      ).length;
      const confirmedBookings = bookings.filter(
        (b: Booking) => b.status === 'confirmed',
      ).length;
      const completedBookings = bookings.filter(
        (b: Booking) => b.status === 'completed',
      ).length;
      const cancelledBookings = bookings.filter(
        (b: Booking) => b.status === 'cancelled',
      ).length;

      const totalRevenue = bookings
        .filter((b: Booking) => b.status === 'completed')
        .reduce((sum: number, b: Booking) => sum + (b.total_price || 0), 0);

      const totalRooms = rooms.length;
      const availableRooms = rooms.filter((r: Room) => r.is_active).length;

      const totalQueries = queries.length;
      const unreadQueries = queries.filter((q: Query) => !q.is_read).length;

      // Today's bookings and revenue
      const today = new Date().toISOString().split('T')[0];
      const todayBookings = bookings.filter(
        (b: Booking) => b.created_at && b.created_at.startsWith(today),
      ).length;

      const todayRevenue = bookings
        .filter(
          (b: Booking) =>
            b.created_at &&
            b.created_at.startsWith(today) &&
            b.status === 'completed',
        )
        .reduce((sum: number, b: Booking) => sum + (b.total_price || 0), 0);

      // Calculate occupancy rate (simplified)
      const occupiedRooms = bookings.filter(
        (b: Booking) => b.status === 'confirmed' || b.status === 'checked_in',
      ).length;
      const occupancyRate =
        totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

      return {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue,
        totalRooms,
        availableRooms,
        totalUsers: 0, // Will need separate endpoint
        totalQueries,
        unreadQueries,
        todayBookings,
        todayRevenue,
        occupancyRate,
      };
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      return null;
    }
  }

  // Get recent bookings
  async getRecentBookings(limit: number = 10): Promise<RecentBooking[]> {
    try {
      const response = await apiClient.get(
        `/admin/bookings?limit=${limit}&page=1`,
      );
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch recent bookings:', error);
      return [];
    }
  }

  // Get revenue data for charts (last 30 days)
  async getRevenueData(days: number = 30): Promise<RevenueData[]> {
    try {
      const response = await apiClient.get('/admin/bookings?limit=1000');
      const bookings = response.data.data || [];

      // Group bookings by date for the last 'days' days
      const revenueMap = new Map<
        string,
        { revenue: number; bookings: number }
      >();

      // Initialize last 'days' days with zero values
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        revenueMap.set(dateStr, { revenue: 0, bookings: 0 });
      }

      // Aggregate actual data
      bookings.forEach((booking: Booking) => {
        if (booking.created_at && booking.status === 'completed') {
          const bookingDate = booking.created_at.split('T')[0];
          if (revenueMap.has(bookingDate)) {
            const current = revenueMap.get(bookingDate)!;
            current.revenue += booking.total_price || 0;
            current.bookings += 1;
          }
        }
      });

      // Convert to array format
      return Array.from(revenueMap.entries()).map(([date, data]) => ({
        date,
        revenue: data.revenue,
        bookings: data.bookings,
      }));
    } catch (error) {
      console.error('Failed to fetch revenue data:', error);
      return [];
    }
  }

  // Get booking status distribution
  async getBookingStatusDistribution(): Promise<
    { status: string; count: number; percentage: number }[]
  > {
    try {
      const response = await apiClient.get('/admin/bookings?limit=1000');
      const bookings = response.data.data || [];

      const statusCounts = bookings.reduce(
        (acc: Record<string, number>, booking: Booking) => {
          acc[booking.status] = (acc[booking.status] || 0) + 1;
          return acc;
        },
        {},
      );

      const total = bookings.length;
      return Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count: count as number,
        percentage:
          total > 0 ? Math.round(((count as number) / total) * 100) : 0,
      }));
    } catch (error) {
      console.error('Failed to fetch booking status distribution:', error);
      return [];
    }
  }

  // Get top room types by bookings
  async getTopRoomTypes(
    limit: number = 5,
  ): Promise<{ name: string; bookings: number; revenue: number }[]> {
    try {
      const response = await apiClient.get('/admin/bookings?limit=1000');
      const bookings = response.data.data || [];

      const roomTypeStats = bookings.reduce(
        (
          acc: Record<string, { bookings: number; revenue: number }>,
          booking: Booking,
        ) => {
          const roomTypeName = booking.room_type?.name || 'Unknown';
          if (!acc[roomTypeName]) {
            acc[roomTypeName] = { bookings: 0, revenue: 0 };
          }
          acc[roomTypeName].bookings += 1;
          if (booking.status === 'completed') {
            acc[roomTypeName].revenue += booking.total_price || 0;
          }
          return acc;
        },
        {},
      );

      return Object.entries(roomTypeStats)
        .map(([name, stats]) => ({
          name,
          bookings: stats.bookings,
          revenue: stats.revenue,
        }))
        .sort((a, b) => b.bookings - a.bookings)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to fetch top room types:', error);
      return [];
    }
  }
}

export const dashboardApi = new DashboardApi();
