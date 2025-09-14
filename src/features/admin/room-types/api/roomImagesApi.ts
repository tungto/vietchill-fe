import { apiClient } from '@/features/shared/api/apiClient';

export interface RoomImage {
  id: number;
  room_type_id: number;
  path: string;
  is_thumbnail: boolean;
  created_at: string;
  updated_at: string;
  room_type?: {
    id: number;
    name: string;
  };
}

export interface CreateRoomImageData {
  room_type_id: number;
  path: string;
  is_thumbnail?: boolean;
}

export interface UpdateRoomImageData {
  room_type_id?: number;
  path?: string;
  is_thumbnail?: boolean;
}

export interface RoomImagesResponse {
  data: RoomImage[];
  pagination?: {
    total: number;
    current_page: number;
    limit: number;
    last_page: number;
  };
}

export interface RoomTypeImagesResponse {
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
  images: RoomImage[];
  total_images: number;
  thumbnail_image: RoomImage | null;
}

// Get all room images with optional filters
export async function fetchRoomImages(
  page: number = 1,
  limit: number = 20,
  roomTypeId?: number,
  isThumbnail?: boolean,
  search?: string,
): Promise<RoomImagesResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (roomTypeId) {
      params.append('room_type_id', roomTypeId.toString());
    }
    if (isThumbnail !== undefined) {
      params.append('is_thumbnail', isThumbnail.toString());
    }
    if (search) {
      params.append('search', search);
    }

    const response = await apiClient.get(`/admin/room-images?${params}`);
    return {
      data: response.data.data || [],
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error('Failed to fetch room images:', error);
    return { data: [] };
  }
}

// Get room images by room type ID
export async function fetchRoomImagesByRoomType(
  roomTypeId: number,
): Promise<RoomImage[]> {
  try {
    const response = await apiClient.get(
      `/admin/room-images/room-type/${roomTypeId}`,
    );
    return response.data.data?.images || [];
  } catch (error) {
    console.error(
      `Failed to fetch room images for room type ${roomTypeId}:`,
      error,
    );
    return [];
  }
}

// Get full room type images response (includes room type info, images, count, thumbnail)
export async function fetchRoomTypeImagesData(
  roomTypeId: number,
): Promise<RoomTypeImagesResponse | null> {
  try {
    const response = await apiClient.get(
      `/admin/room-images/room-type/${roomTypeId}`,
    );
    return response.data.data || null;
  } catch (error) {
    console.error(
      `Failed to fetch room type images data for room type ${roomTypeId}:`,
      error,
    );
    return null;
  }
}

// Get single room image by ID
export async function fetchRoomImage(id: number): Promise<RoomImage | null> {
  try {
    const response = await apiClient.get(`/admin/room-images/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch room image ${id}:`, error);
    return null;
  }
}

// Create new room image
export async function createRoomImage(
  data: CreateRoomImageData,
): Promise<RoomImage | null> {
  try {
    const response = await apiClient.post('/admin/room-images', data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to create room image:', error);
    throw error;
  }
}

// Update room image
export async function updateRoomImage(
  id: number,
  data: UpdateRoomImageData,
): Promise<RoomImage | null> {
  try {
    const response = await apiClient.put(`/admin/room-images/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to update room image ${id}:`, error);
    throw error;
  }
}

// Delete room image
export async function deleteRoomImage(id: number): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/room-images/${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete room image ${id}:`, error);
    throw error;
  }
}

// Set thumbnail for room image
export async function setRoomImageThumbnail(
  id: number,
): Promise<RoomImage | null> {
  try {
    const response = await apiClient.post(
      `/admin/room-images/${id}/set-thumbnail`,
    );
    return response.data.data;
  } catch (error) {
    console.error(`Failed to set thumbnail for room image ${id}:`, error);
    throw error;
  }
}

// Upload image and create room image record
export async function uploadAndCreateRoomImage(
  file: File,
  roomTypeId: number,
  isThumbnail: boolean = false,
): Promise<RoomImage | null> {
  try {
    // First upload the image
    const formData = new FormData();
    formData.append('image', file);

    const uploadResponse = await apiClient.post(
      '/admin/images/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const imagePath = uploadResponse.data.data.path;

    // Then create the room image record
    const roomImageData: CreateRoomImageData = {
      room_type_id: roomTypeId,
      path: imagePath,
      is_thumbnail: isThumbnail,
    };

    return await createRoomImage(roomImageData);
  } catch (error) {
    console.error('Failed to upload and create room image:', error);
    throw error;
  }
}

// Room Images API class for better organization
export class RoomImagesApi {
  // Get all room images
  static async getAll(
    page?: number,
    limit?: number,
    roomTypeId?: number,
    isThumbnail?: boolean,
    search?: string,
  ): Promise<RoomImagesResponse> {
    return fetchRoomImages(page, limit, roomTypeId, isThumbnail, search);
  }

  // Get room images by room type
  static async getByRoomType(roomTypeId: number): Promise<RoomImage[]> {
    return fetchRoomImagesByRoomType(roomTypeId);
  }

  // Get full room type images data (includes room type info, images, count, thumbnail)
  static async getRoomTypeImagesData(
    roomTypeId: number,
  ): Promise<RoomTypeImagesResponse | null> {
    return fetchRoomTypeImagesData(roomTypeId);
  }

  // Get single room image
  static async getById(id: number): Promise<RoomImage | null> {
    return fetchRoomImage(id);
  }

  // Create room image
  static async create(data: CreateRoomImageData): Promise<RoomImage | null> {
    return createRoomImage(data);
  }

  // Update room image
  static async update(
    id: number,
    data: UpdateRoomImageData,
  ): Promise<RoomImage | null> {
    return updateRoomImage(id, data);
  }

  // Delete room image
  static async delete(id: number): Promise<boolean> {
    return deleteRoomImage(id);
  }

  // Set thumbnail
  static async setThumbnail(id: number): Promise<RoomImage | null> {
    return setRoomImageThumbnail(id);
  }

  // Upload and create
  static async uploadAndCreate(
    file: File,
    roomTypeId: number,
    isThumbnail?: boolean,
  ): Promise<RoomImage | null> {
    return uploadAndCreateRoomImage(file, roomTypeId, isThumbnail);
  }

  // Get image URL
  static getImageUrl(imagePath: string): string {
    return `http://localhost:8000/${imagePath}`;
  }

  // Format file size
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get file extension
  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  // Check if file is image
  static isImageFile(filename: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const extension = this.getFileExtension(filename);
    return imageExtensions.includes(extension);
  }
}

export const roomImagesApi = new RoomImagesApi();
