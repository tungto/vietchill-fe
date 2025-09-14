import { RoomImage } from './roomImagesApi';

export interface ImageSyncResult {
  success: boolean;
  error?: string;
  updatedImages?: RoomImage[];
}

export interface ImageSyncOperation {
  type: 'create' | 'delete' | 'set_thumbnail';
  imagePath?: string;
  imageId?: number;
}

/**
 * Validates that desired image paths exist and are valid
 */
export function validateImagePaths(
  desiredImagePaths: string[],
  desiredThumbnailPath: string,
): { isValid: boolean; error?: string } {
  // Check if thumbnail is in selected images
  if (
    desiredThumbnailPath &&
    !desiredImagePaths.includes(desiredThumbnailPath)
  ) {
    return {
      isValid: false,
      error: 'Ảnh đại diện phải được chọn trong danh sách hình ảnh',
    };
  }

  // Check for duplicate paths
  const uniquePaths = new Set(desiredImagePaths);
  if (uniquePaths.size !== desiredImagePaths.length) {
    return {
      isValid: false,
      error: 'Có hình ảnh trùng lặp trong danh sách',
    };
  }

  // Check for empty paths
  const hasEmptyPaths = desiredImagePaths.some((path) => !path || !path.trim());
  if (hasEmptyPaths) {
    return {
      isValid: false,
      error: 'Có đường dẫn hình ảnh không hợp lệ',
    };
  }

  return { isValid: true };
}
