import { apiClient } from '@/lib/api/apiClient';

export interface Facility {
  id: number;
  name: string;
  content: string;
  description: string;
}

export interface CreateFacilityData {
  name: string;
  content: string;
  description: string;
}

export interface UpdateFacilityData {
  name?: string;
  content?: string;
  description?: string;
}

export interface FacilitiesResponse {
  data: Facility[];
  pagination?: {
    total: number;
    current_page: number;
    limit: number;
    last_page: number;
  };
}

// Get all facilities with pagination
export async function fetchFacilities(
  page: number = 1,
  limit: number = 20,
): Promise<FacilitiesResponse> {
  try {
    const response = await apiClient.get(
      `/admin/facilities?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data || [],
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error('Failed to fetch facilities:', error);
    return { data: [] };
  }
}

// Get a single facility by ID
export async function fetchFacility(id: number): Promise<Facility | null> {
  try {
    const response = await apiClient.get(`/admin/facilities/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch facility ${id}:`, error);
    return null;
  }
}

// Create a new facility
export async function createFacility(
  data: CreateFacilityData,
): Promise<Facility | null> {
  try {
    const response = await apiClient.post('/admin/facilities', data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create facility:', error);
    throw error;
  }
}

// Update an existing facility
export async function updateFacility(
  id: number,
  data: UpdateFacilityData,
): Promise<Facility | null> {
  try {
    const response = await apiClient.put(`/admin/facilities/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to update facility ${id}:`, error);
    throw error;
  }
}

// Delete a facility
export async function deleteFacility(id: number): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/facilities/${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete facility ${id}:`, error);
    throw error;
  }
}

// Facilities API class for better organization
export class FacilitiesApi {
  // Get all facilities
  static async getAll(
    page: number = 1,
    limit: number = 20,
  ): Promise<FacilitiesResponse> {
    return fetchFacilities(page, limit);
  }

  // Get facility by ID
  static async getById(id: number): Promise<Facility | null> {
    return fetchFacility(id);
  }

  // Create new facility
  static async create(data: CreateFacilityData): Promise<Facility | null> {
    return createFacility(data);
  }

  // Update facility
  static async update(
    id: number,
    data: UpdateFacilityData,
  ): Promise<Facility | null> {
    return updateFacility(id, data);
  }

  // Delete facility
  static async delete(id: number): Promise<boolean> {
    return deleteFacility(id);
  }
}

export const facilitiesApi = new FacilitiesApi();
