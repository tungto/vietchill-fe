import { apiClient } from '@/features/shared/api/apiClient';

export interface Feature {
  id: number;
  name: string;
  content: string;
}

export interface CreateFeatureData {
  name: string;
  content: string;
}

export interface UpdateFeatureData {
  name?: string;
  content?: string;
}

export interface FeaturesResponse {
  data: Feature[];
  pagination?: {
    total: number;
    current_page: number;
    limit: number;
    last_page: number;
  };
}

// Get all features with pagination
export async function fetchFeatures(
  page: number = 1,
  limit: number = 20,
): Promise<FeaturesResponse> {
  try {
    const response = await apiClient.get(
      `/admin/features?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data || [],
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error('Failed to fetch features:', error);
    return { data: [] };
  }
}

// Get a single feature by ID
export async function fetchFeature(id: number): Promise<Feature | null> {
  try {
    const response = await apiClient.get(`/admin/features/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch feature ${id}:`, error);
    return null;
  }
}

// Create a new feature
export async function createFeature(
  data: CreateFeatureData,
): Promise<Feature | null> {
  try {
    const response = await apiClient.post('/admin/features', data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create feature:', error);
    throw error;
  }
}

// Update an existing feature
export async function updateFeature(
  id: number,
  data: UpdateFeatureData,
): Promise<Feature | null> {
  try {
    const response = await apiClient.put(`/admin/features/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to update feature ${id}:`, error);
    throw error;
  }
}

// Delete a feature
export async function deleteFeature(id: number): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/features/${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete feature ${id}:`, error);
    throw error;
  }
}

// Features API class for better organization
export class FeaturesApi {
  // Get all features
  static async getAll(
    page: number = 1,
    limit: number = 20,
  ): Promise<FeaturesResponse> {
    return fetchFeatures(page, limit);
  }

  // Get feature by ID
  static async getById(id: number): Promise<Feature | null> {
    return fetchFeature(id);
  }

  // Create new feature
  static async create(data: CreateFeatureData): Promise<Feature | null> {
    return createFeature(data);
  }

  // Update feature
  static async update(
    id: number,
    data: UpdateFeatureData,
  ): Promise<Feature | null> {
    return updateFeature(id, data);
  }

  // Delete feature
  static async delete(id: number): Promise<boolean> {
    return deleteFeature(id);
  }
}

export const featuresApi = new FeaturesApi();
