import { apiClient } from '@/features/shared/api/apiClient';
import { RoomImage } from './roomImagesApi';

export interface Facility {
  id: number;
  name: string;
  content: string;
  description: string;
  pivot?: {
    room_type_id: number;
    facility_id: number;
  };
}

export interface Feature {
  id: number;
  name: string;
  content: string;
  pivot?: {
    room_type_id: number;
    feature_id: number;
  };
}

export interface Room {
  id: number;
  room_type_id: number;
  room_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomType {
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
  images: RoomImage[];
  facilities: Facility[];
  features: Feature[];
  rooms: Room[];
}

export interface CreateRoomTypeData {
  name: string;
  area: number;
  price: number;
  quantity: number;
  adult: number;
  children: number;
  description: string;
  facilities: number[];
  features: number[];
  images?: string[];
  thumbnail_image?: string;
}

export interface UpdateRoomTypeData {
  name?: string;
  area?: number;
  price?: number;
  quantity?: number;
  adult?: number;
  children?: number;
  description?: string;
  facilities?: number[];
  features?: number[];
  images?: string[];
  thumbnail_image?: string;
  replace_images?: boolean;
}

export interface RoomTypesResponse {
  data: RoomType[];
  pagination?: {
    total: number;
    current_page: number;
    limit: number;
    last_page: number;
  };
}

// Get all room types with pagination and search
export async function fetchRoomTypes(
  page: number = 1,
  limit: number = 20,
  search?: string,
): Promise<RoomTypesResponse> {
  try {
    let url = `/admin/room-types?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await apiClient.get(url);
    return {
      data: response.data.data || [],
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error('Failed to fetch room types:', error);
    return { data: [] };
  }
}

// Get a single room type by ID
export async function fetchRoomType(id: number): Promise<RoomType | null> {
  try {
    const response = await apiClient.get(`/admin/room-types/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch room type ${id}:`, error);
    return null;
  }
}

// Create a new room type
export async function createRoomType(
  data: CreateRoomTypeData,
): Promise<RoomType | null> {
  try {
    const response = await apiClient.post('/admin/room-types', data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create room type:', error);
    throw error;
  }
}

// Update an existing room type
export async function updateRoomType(
  id: number,
  data: UpdateRoomTypeData,
): Promise<RoomType | null> {
  try {
    const response = await apiClient.put(`/admin/room-types/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to update room type ${id}:`, error);
    throw error;
  }
}

// Delete a room type
export async function deleteRoomType(id: number): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/room-types/${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete room type ${id}:`, error);
    throw error;
  }
}

// Get all facilities for room type creation/editing
export async function fetchAllFacilities(): Promise<Facility[]> {
  try {
    const response = await apiClient.get('/admin/facilities?limit=100');
    return response.data.data || [];
  } catch (error) {
    console.error('Failed to fetch facilities:', error);
    return [];
  }
}

// Get all features for room type creation/editing
export async function fetchAllFeatures(): Promise<Feature[]> {
  try {
    const response = await apiClient.get('/admin/features?limit=100');
    return response.data.data || [];
  } catch (error) {
    console.error('Failed to fetch features:', error);
    return [];
  }
}

// Room Types API class for better organization
export class RoomTypesApi {
  // Get all room types
  static async getAll(
    page: number = 1,
    limit: number = 20,
    search?: string,
  ): Promise<RoomTypesResponse> {
    return fetchRoomTypes(page, limit, search);
  }

  // Get room type by ID
  static async getById(id: number): Promise<RoomType | null> {
    return fetchRoomType(id);
  }

  // Create new room type
  static async create(data: CreateRoomTypeData): Promise<RoomType | null> {
    return createRoomType(data);
  }

  // Update room type
  static async update(
    id: number,
    data: UpdateRoomTypeData,
  ): Promise<RoomType | null> {
    return updateRoomType(id, data);
  }

  // Delete room type
  static async delete(id: number): Promise<boolean> {
    return deleteRoomType(id);
  }

  // Get all facilities
  static async getAllFacilities(): Promise<Facility[]> {
    return fetchAllFacilities();
  }

  // Get all features
  static async getAllFeatures(): Promise<Feature[]> {
    return fetchAllFeatures();
  }
}

export const roomTypesApi = new RoomTypesApi();
