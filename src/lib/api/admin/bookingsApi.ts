import { Room } from '@/features/admin/rooms/type';
import { apiClient } from '../apiClient';

export interface BookingResponse {
  data: { booking: Booking; nights: number; available_rooms: Room[] };
  message: string;
  success: boolean;
}

export interface Booking {
  id: number;
  user_id: number;
  room_type_id: number;
  room_id: number | null;
  status:
    | 'pending'
    | 'confirmed'
    | 'checked-in'
    | 'checked-out'
    | 'completed'
    | 'cancelled';
  check_in_date: string;
  check_out_date: string;
  phone: string;
  adult: number;
  children: number;
  total_price: number;
  is_paid: boolean;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: number;
  };
  room_type: {
    id: number;
    name: string;
    area: number;
    price: number;
    images?: Array<{
      id: number;
      room_type_id: number;
      path: string;
      is_thumbnail: boolean;
    }>;
  };
  room: {
    id: number;
    room_number: string;
    room_type_id: number;
  } | null;
}

export interface BookingFilters {
  limit?: number;
  page?: number;
  status?: string;
  from_date?: string;
  to_date?: string;
  search?: string;
}

export class BookingsApi {
  // Get all bookings with filters
  async getBookings(
    filters: BookingFilters = {},
  ): Promise<{ data: Booking[]; pagination: Record<string, number> }> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await apiClient.get(
        `/admin/bookings?${params.toString()}`,
      );
      return {
        data: response.data.data || [],
        pagination: response.data.pagination || {},
      };
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      return { data: [], pagination: {} };
    }
  }

  // Get booking by ID
  async getBooking(id: number): Promise<Booking | null> {
    try {
      const response = await apiClient.get(`/admin/bookings/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch booking ${id}:`, error);
      return null;
    }
  }

  // Update booking (including status, room assignment, payment, etc.)
  async updateBooking(
    id: number,
    updates: Partial<{
      status: string;
      room_id: number | null;
      is_paid: boolean;
      check_in_date: string;
      check_out_date: string;
      phone: string;
      adult: number;
      children: number;
      total_price: number;
    }>,
  ): Promise<Booking | null> {
    try {
      const response = await apiClient.put(`/admin/bookings/${id}`, updates);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update booking ${id}:`, error);
      throw error;
    }
  }

  // Update booking status (legacy method - now uses updateBooking)
  async updateBookingStatus(
    id: number,
    status: string,
  ): Promise<Booking | null> {
    return this.updateBooking(id, { status });
  }

  // Assign room to booking (legacy method - now uses updateBooking)
  async assignRoom(bookingId: number, roomId: number): Promise<Booking | null> {
    return this.updateBooking(bookingId, { room_id: roomId });
  }

  // Remove room from booking
  async removeRoom(bookingId: number): Promise<Booking | null> {
    return this.updateBooking(bookingId, { room_id: null });
  }

  // Delete booking
  async deleteBooking(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/admin/bookings/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete booking ${id}:`, error);
      throw error;
    }
  }

  // Get available rooms for a booking
  async getAvailableRooms(
    roomTypeId: number,
    checkInDate: string,
    checkOutDate: string,
    excludeBookingId?: number,
  ): Promise<Room[]> {
    try {
      const params = new URLSearchParams({
        room_type_id: roomTypeId.toString(),
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
      });

      if (excludeBookingId) {
        params.append('exclude_booking_id', excludeBookingId.toString());
      }

      const response = await apiClient.get(
        `/admin/bookings/available-rooms?${params.toString()}`,
      );
      return response.data.data?.available_rooms || [];
    } catch (error) {
      console.error('Failed to fetch available rooms:', error);
      return [];
    }
  }
}

export const bookingsApi = new BookingsApi();
