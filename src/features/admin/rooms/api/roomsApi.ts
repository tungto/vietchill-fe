import { apiClient } from '@/features/shared/api/apiClient';

const ADMIN_ROOMS_ROUTE = '/admin/rooms';

export interface Room {
  id: number;
  room_type_id: number;
  room_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  room_type: {
    id: number;
    name: string;
    area: number;
    price: number;
    quantity: number;
    adult: number;
    children: number;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

export interface RoomFilters {
  limit?: number;
  page?: number;
  room_type_id?: number;
  is_active?: boolean;
  search?: string;
}

export interface CreateRoomData {
  room_type_id: number;
  room_number: string;
  is_active?: boolean;
}

export interface UpdateRoomData {
  room_type_id?: number;
  room_number?: string;
  is_active?: boolean;
}

export class RoomsApi {
  // Get all rooms with filters
  async getRooms(filters: RoomFilters = {}): Promise<{
    data: Room[];
    pagination: {
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
        `${ADMIN_ROOMS_ROUTE}?${params.toString()}`,
      );
      return {
        data: response.data.data || [],
        pagination: response.data.pagination || {},
      };
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      return {
        data: [],
        pagination: {
          total: 0,
          current_page: 1,
          limit: 10,
          last_page: 1,
        },
      };
    }
  }

  // Get room by ID
  async getRoom(id: number): Promise<Room | null> {
    try {
      const response = await apiClient.get(`${ADMIN_ROOMS_ROUTE}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch room ${id}:`, error);
      return null;
    }
  }

  // Create new room
  async createRoom(data: CreateRoomData): Promise<Room> {
    try {
      const response = await apiClient.post(ADMIN_ROOMS_ROUTE, data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw error;
    }
  }

  // Update room
  async updateRoom(id: number, data: UpdateRoomData): Promise<Room> {
    try {
      const response = await apiClient.put(`${ADMIN_ROOMS_ROUTE}/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update room ${id}:`, error);
      throw error;
    }
  }

  // Delete room
  async deleteRoom(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`${ADMIN_ROOMS_ROUTE}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete room ${id}:`, error);
      throw error;
    }
  }

  // Get rooms by room type
  async getRoomsByType(roomTypeId: number): Promise<Room[]> {
    try {
      const response = await apiClient.get(
        `${ADMIN_ROOMS_ROUTE}/room-type/${roomTypeId}`,
      );
      return response.data.data || [];
    } catch (error) {
      console.error(
        `Failed to fetch rooms for room type ${roomTypeId}:`,
        error,
      );
      return [];
    }
  }
}

export const roomsApi = new RoomsApi();
