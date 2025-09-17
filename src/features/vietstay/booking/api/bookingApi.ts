import { apiClient } from '@/features/shared/api/apiClient';
import { Booking } from '../types/booking';

const USER_BOOKINGS_ROUTE = '/user/bookings';

export interface BookingFilters {
  limit?: number;
  page?: number;
  status?: string;
  from_date?: string;
  to_date?: string;
}

export interface CreateBookingData {
  room_type_id: number;
  check_in_date: string;
  check_out_date: string;
  phone: string;
  adult: number;
  children: number;
}

export interface CancelBookingResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    status: string;
  };
}

export class UserBookingsApi {
  // Get user bookings with filters
  async getBookings(filters: BookingFilters = {}): Promise<{
    data: Booking[];
    pagination?: {
      total: number;
      current_page: number;
      limit: number;
      last_page: number;
    };
  }> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await apiClient.get(
        `${USER_BOOKINGS_ROUTE}?${params.toString()}`,
      );
      return {
        data: response.data.data || [],
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      return {
        data: [],
      };
    }
  }

  // Get booking by ID
  async getBooking(id: number): Promise<Booking | null> {
    try {
      const response = await apiClient.get(`${USER_BOOKINGS_ROUTE}/${id}`);
      return response.data.data.booking;
    } catch (error) {
      console.error(`Failed to fetch booking ${id}:`, error);
      return null;
    }
  }

  // Create new booking
  async createBooking(data: CreateBookingData): Promise<Booking> {
    try {
      const response = await apiClient.post(USER_BOOKINGS_ROUTE, data);
      return response.data.data.booking;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  }

  // Cancel booking
  async cancelBooking(id: number): Promise<CancelBookingResponse> {
    try {
      const response = await apiClient.post(
        `${USER_BOOKINGS_ROUTE}/${id}/cancel`,
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to cancel booking ${id}:`, error);
      throw error;
    }
  }

  // Get booking statistics
  async getBookingStatistics(): Promise<{
    total_bookings: number;
    pending_bookings: number;
    confirmed_bookings: number;
    completed_bookings: number;
    cancelled_bookings: number;
    total_spent: string;
  }> {
    try {
      const response = await apiClient.get(`${USER_BOOKINGS_ROUTE}/statistics`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch booking statistics:', error);
      return {
        total_bookings: 0,
        pending_bookings: 0,
        confirmed_bookings: 0,
        completed_bookings: 0,
        cancelled_bookings: 0,
        total_spent: '0',
      };
    }
  }
}

export const userBookingsApi = new UserBookingsApi();
