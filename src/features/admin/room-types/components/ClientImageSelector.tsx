'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  TbStar,
  TbStarFilled,
  TbPhoto,
  TbX,
  TbLoader,
  TbEye,
  TbPlus,
} from 'react-icons/tb';
import Image from 'next/image';
import {
  uploadImage,
  fetchImages,
  ImageFile,
} from '@/features/admin/images/api/api';

interface ClientImageSelectorProps {
  selectedImages?: string[]; // Array of image paths
  thumbnailImage?: string; // Path of thumbnail image
  onImagesChange?: (images: string[]) => void;
  onThumbnailChange?: (thumbnailPath: string) => void;
  onError?: (error: string) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  disabled?: boolean; // For form submission state
}

const ClientImageSelector: React.FC<ClientImageSelectorProps> = ({
  selectedImages = [],
  thumbnailImage = '',
  onImagesChange,
  onThumbnailChange,
  onError,
  maxImages = 10,
  maxFileSize = 5,
  acceptedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/webp',
  ],
  disabled = false,
}) => {
  const [availableImages, setAvailableImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAvailableImages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAvailableImages = async () => {
    try {
      setLoadingImages(true);
      const response = await fetchImages();
      setAvailableImages(response.data);
    } catch (error) {
      console.error('Failed to load available images:', error);
      onError?.('Không thể tải danh sách hình ảnh');
    } finally {
      setLoadingImages(false);
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${acceptedTypes
        .map((type) => type.split('/')[1])
        .join(', ')}`;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `Kích thước file quá lớn. Tối đa ${maxFileSize}MB`;
    }

    return null;
  };

  const handleFileSelect = async (files: FileList) => {
    if (disabled) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    // Validate all files first
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        onError?.(error);
        return;
      }
      validFiles.push(file);
    }

    // Upload valid files to image library only
    try {
      setLoading(true);
      const uploadPromises = validFiles.map((file) => uploadImage(file));
      const uploadedImages = await Promise.all(uploadPromises);

      // Refresh available images
      await loadAvailableImages();

      // Auto-select newly uploaded images (client-side only)
      const newImagePaths = uploadedImages
        .filter((img) => img !== null)
        .map((img) => img!.path);

      const updatedSelectedImages = [...selectedImages, ...newImagePaths].slice(
        0,
        maxImages,
      );
      onImagesChange?.(updatedSelectedImages);

      // Set first uploaded image as thumbnail if no thumbnail is set
      if (!thumbnailImage && newImagePaths.length > 0) {
        onThumbnailChange?.(newImagePaths[0]);
      }

      setShowUpload(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Không thể tải lên hình ảnh';
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  // Client-side only image selection toggle
  const handleImageToggle = (imagePath: string) => {
    if (disabled) return;

    const isSelected = selectedImages.includes(imagePath);

    if (isSelected) {
      // Remove from selection (client-side only)
      const updatedImages = selectedImages.filter((path) => path !== imagePath);
      onImagesChange?.(updatedImages);

      // If this was the thumbnail, clear thumbnail or set to first remaining image
      if (thumbnailImage === imagePath) {
        onThumbnailChange?.(updatedImages.length > 0 ? updatedImages[0] : '');
      }
    } else {
      // Add to selection (client-side only)
      if (selectedImages.length < maxImages) {
        const updatedImages = [...selectedImages, imagePath];
        onImagesChange?.(updatedImages);

        // Set as thumbnail if no thumbnail is set
        if (!thumbnailImage) {
          onThumbnailChange?.(imagePath);
        }
      } else {
        onError?.(`Đã đạt giới hạn tối đa ${maxImages} hình ảnh`);
      }
    }
  };

  // Client-side only thumbnail setting
  const handleSetThumbnail = (imagePath: string) => {
    if (disabled) return;

    if (selectedImages.includes(imagePath)) {
      onThumbnailChange?.(imagePath);
    }
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleViewImage = (image: ImageFile) => {
    setSelectedImage(image);
  };

  const getImageUrl = (imagePath: string): string => {
    return `http://localhost:8000/${imagePath}`;
  };

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium text-gray-900'>
          Hình ảnh phòng ({selectedImages.length}/{maxImages})
          {disabled && (
            <span className='ml-2 text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded'>
              Chỉ xem - Nhấn &quot;Cập nhật&quot; để lưu thay đổi
            </span>
          )}
        </h3>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setShowUpload(!showUpload)}
            disabled={disabled}
            className={`px-3 py-2 text-white text-sm rounded-lg transition-colors flex items-center gap-2 ${
              disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <TbPlus size={16} />
            {showUpload ? 'Ẩn upload' : 'Tải lên mới'}
          </button>
          <button
            type='button'
            onClick={loadAvailableImages}
            disabled={disabled}
            className={`px-3 py-2 text-white text-sm rounded-lg transition-colors ${
              disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Làm mới
          </button>
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && !disabled && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <TbPhoto className='mx-auto h-8 w-8 text-gray-400 mb-2' />
          <p className='text-sm text-gray-600 mb-2'>
            Kéo thả hình ảnh vào đây hoặc{' '}
            <button
              type='button'
              onClick={openFileDialog}
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              chọn file
            </button>
          </p>
          <p className='text-xs text-gray-500'>
            Hỗ trợ: JPG, PNG, GIF, WebP. Tối đa {maxFileSize}MB
          </p>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-lg flex items-center space-x-2'>
            <TbLoader className='animate-spin h-6 w-6 text-blue-600' />
            <span>Đang tải lên...</span>
          </div>
        </div>
      )}

      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div>
          <h4 className='text-sm font-medium text-gray-700 mb-2'>
            Hình ảnh đã chọn ({selectedImages.length})
          </h4>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {selectedImages.map((imagePath, index) => {
              return (
                <div
                  key={imagePath}
                  className='relative bg-gray-100 rounded-lg overflow-hidden aspect-square'
                >
                  <Image
                    src={getImageUrl(imagePath)}
                    alt={`Selected image ${index + 1}`}
                    width={150}
                    height={150}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/rooms/placeholder.png';
                    }}
                  />

                  {/* Thumbnail Badge */}
                  {thumbnailImage === imagePath && (
                    <div className='absolute top-1 left-1 bg-yellow-500 text-white px-1 py-0.5 rounded text-xs font-medium flex items-center gap-1'>
                      <TbStarFilled size={10} />
                      Đại diện
                    </div>
                  )}

                  {/* Actions */}
                  <div className='absolute top-1 right-1 flex gap-1'>
                    <button
                      type='button'
                      onClick={() => handleSetThumbnail(imagePath)}
                      disabled={disabled}
                      className={`p-1 rounded text-xs transition-colors ${
                        thumbnailImage === imagePath
                          ? 'bg-yellow-500 text-white'
                          : disabled
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-white text-yellow-600 hover:bg-yellow-50'
                      }`}
                      title='Đặt làm ảnh đại diện'
                    >
                      <TbStar size={12} />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleImageToggle(imagePath)}
                      disabled={disabled}
                      className={`p-1 rounded text-xs transition-colors ${
                        disabled
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      title='Xóa khỏi danh sách'
                    >
                      <TbX size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Images */}
      <div>
        <h4 className='text-sm font-medium text-gray-700 mb-2'>
          Thư viện hình ảnh ({availableImages.length})
        </h4>
        {loadingImages ? (
          <div className='flex items-center justify-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            <span className='ml-2 text-gray-600'>Đang tải hình ảnh...</span>
          </div>
        ) : availableImages.length > 0 ? (
          <div className='grid grid-cols-3 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-2'>
            {availableImages.map((image) => {
              const isSelected = selectedImages.includes(image.path);
              return (
                <div
                  key={image.path}
                  className={`relative bg-gray-100 rounded-lg overflow-hidden aspect-square transition-colors ${
                    disabled
                      ? 'cursor-not-allowed opacity-60'
                      : 'cursor-pointer'
                  } border-2 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => !disabled && handleImageToggle(image.path)}
                >
                  <Image
                    src={getImageUrl(image.path)}
                    alt={image.path.split('/').pop() || 'Image'}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/rooms/placeholder.png';
                    }}
                  />

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className='absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center'>
                      <div className='bg-blue-500 text-white rounded-full p-1'>
                        <TbStar size={16} />
                      </div>
                    </div>
                  )}

                  {/* View Button */}
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewImage(image);
                    }}
                    className='absolute bottom-1 right-1 p-1 bg-black/50 text-white rounded hover:bg-opacity-75'
                    title='Xem chi tiết'
                  >
                    <TbEye size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-center py-8 text-gray-500 border border-gray-200 rounded-lg'>
            <TbPhoto className='mx-auto h-12 w-12 text-gray-300 mb-2' />
            <p>Chưa có hình ảnh nào trong thư viện</p>
            <p className='text-sm'>Tải lên hình ảnh để bắt đầu</p>
          </div>
        )}
      </div>

      {/* Thumbnail Info */}
      {thumbnailImage && (
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
          <div className='flex items-center gap-2 text-yellow-800'>
            <TbStarFilled size={16} />
            <span className='text-sm font-medium'>
              Ảnh đại diện: {thumbnailImage.split('/').pop()}
            </span>
            {disabled && (
              <span className='text-xs text-orange-600'>
                (Chưa lưu - nhấn &quot;Cập nhật&quot; để áp dụng)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Pending Changes Notice */}
      {disabled && selectedImages.length > 0 && (
        <div className='bg-orange-50 border border-orange-200 rounded-lg p-3'>
          <div className='flex items-center gap-2 text-orange-800'>
            <TbLoader size={16} />
            <span className='text-sm font-medium'>
              Có {selectedImages.length} hình ảnh chờ cập nhật. Nhấn nút
              &quot;Cập nhật loại phòng&quot; để lưu thay đổi.
            </span>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        multiple
        className='hidden'
      />

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='relative max-w-4xl max-h-full'>
            <button
              type='button'
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors z-10'
            >
              <TbX size={20} />
            </button>

            <Image
              src={getImageUrl(selectedImage.path)}
              alt={selectedImage.path.split('/').pop() || 'Image'}
              width={800}
              height={600}
              className='max-w-full max-h-full object-contain rounded-lg'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/rooms/placeholder.png';
              }}
            />

            {/* Image Info */}
            <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium mb-1'>
                    {selectedImage.path.split('/').pop()}
                  </h3>
                  <p className='text-sm opacity-75'>
                    Kích thước:{' '}
                    {((selectedImage.size || 0) / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={() => handleImageToggle(selectedImage.path)}
                    disabled={disabled}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      selectedImages.includes(selectedImage.path)
                        ? disabled
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                        : disabled
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {selectedImages.includes(selectedImage.path)
                      ? 'Bỏ chọn'
                      : 'Chọn'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientImageSelector;
