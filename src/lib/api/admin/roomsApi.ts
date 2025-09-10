import { apiClient } from '../apiClient';

const ADMIN_ROOMS_ROUTE = '/admin/rooms';

export class RoomsApi {
  async getRoom(id: number) {
    try {
      const response = await apiClient.get(`${ADMIN_ROOMS_ROUTE}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch room ${id}:`, error);
      return null;
    }
  }

  async createRoom(data: Record<string, any>) {
    try {
      const response = await apiClient.post(ADMIN_ROOMS_ROUTE, data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw error;
    }
  }

  async updateRoom(id: number, data: Record<string, any>) {
    try {
      console.log('updateRoom', data);
      const response = await apiClient.put(`${ADMIN_ROOMS_ROUTE}/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update room ${id}:`, error);
      throw error;
    }
  }

  async deleteRoom(id: number) {
    try {
      const response = await apiClient.delete(`${ADMIN_ROOMS_ROUTE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete room ${id}:`, error);
      throw error;
    }
  }
}
