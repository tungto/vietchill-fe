import { apiClient } from '@/lib/api/apiClient';

export interface ImageFile {
  path: string;
  size: number;
  last_modified: string;
  filename?: string;
  original_name?: string;
  mime_type?: string;
}

export interface UploadImageResponse {
  path: string;
  filename: string;
  original_name: string;
  size: number;
  mime_type: string;
}

export interface ImagesResponse {
  data: ImageFile[];
}

// Get all images
export async function fetchImages(): Promise<ImagesResponse> {
  try {
    const response = await apiClient.get('/admin/images');
    return {
      data: response.data.data || [],
    };
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return { data: [] };
  }
}

// Upload image
export async function uploadImage(
  file: File,
): Promise<UploadImageResponse | null> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post('/admin/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
}

// Delete image
export async function deleteImage(imagePath: string): Promise<boolean> {
  try {
    await apiClient.delete('/admin/images', {
      data: { path: imagePath },
    });
    return true;
  } catch (error) {
    console.error(`Failed to delete image ${imagePath}:`, error);
    throw error;
  }
}

// Images API class for better organization
export class ImagesApi {
  // Get all images
  static async getAll(): Promise<ImagesResponse> {
    return fetchImages();
  }

  // Upload image
  static async upload(file: File): Promise<UploadImageResponse | null> {
    return uploadImage(file);
  }

  // Delete image
  static async delete(imagePath: string): Promise<boolean> {
    return deleteImage(imagePath);
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

export const imagesApi = new ImagesApi();
