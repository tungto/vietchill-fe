'use client';

import React, { useState, useRef } from 'react';
import {
  TbUpload,
  TbTrash,
  TbStar,
  TbStarFilled,
  TbPhoto,
  TbX,
  TbLoader,
  TbEye,
} from 'react-icons/tb';
import Image from 'next/image';
import {
  RoomImage,
  RoomImagesApi,
  uploadAndCreateRoomImage,
  deleteRoomImage,
  setRoomImageThumbnail,
} from '@/features/admin/room-types/api/roomImagesApi';

interface RoomImageManagerProps {
  roomTypeId?: number; // Optional for create mode
  initialImages?: RoomImage[];
  onImagesChange?: (images: RoomImage[]) => void;
  onError?: (error: string) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  readOnly?: boolean;
}

const RoomImageManager: React.FC<RoomImageManagerProps> = ({
  roomTypeId,
  initialImages = [],
  onImagesChange,
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
  readOnly = false,
}) => {
  const [images, setImages] = useState<RoomImage[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<RoomImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update images when initialImages change
  React.useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

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

    // Check max images
    if (images.length >= maxImages) {
      return `Đã đạt giới hạn tối đa ${maxImages} hình ảnh`;
    }

    return null;
  };

  const handleFileSelect = async (files: FileList) => {
    if (readOnly || !roomTypeId) return;

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

    // Upload valid files
    try {
      setLoading(true);
      const uploadPromises = validFiles.map((file, index) =>
        uploadAndCreateRoomImage(
          file,
          roomTypeId,
          images.length === 0 && index === 0, // First image is thumbnail if no images exist
        ),
      );

      const uploadedImages = await Promise.all(uploadPromises);
      const newImages = uploadedImages.filter(
        (img): img is RoomImage => img !== null,
      );

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange?.(updatedImages);
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
    if (!readOnly) {
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

    if (readOnly) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (readOnly) return;

    if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      try {
        setLoading(true);
        await deleteRoomImage(imageId);

        const updatedImages = images.filter((img) => img.id !== imageId);
        setImages(updatedImages);
        onImagesChange?.(updatedImages);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Không thể xóa hình ảnh';
        onError?.(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSetThumbnail = async (imageId: number) => {
    if (readOnly) return;

    try {
      setLoading(true);
      await setRoomImageThumbnail(imageId);

      // Update local state
      const updatedImages = images.map((img) => ({
        ...img,
        is_thumbnail: img.id === imageId,
      }));
      setImages(updatedImages);
      onImagesChange?.(updatedImages);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Không thể đặt làm ảnh đại diện';
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openFileDialog = () => {
    if (!readOnly) {
      fileInputRef.current?.click();
    }
  };

  const handleViewImage = (image: RoomImage) => {
    setSelectedImage(image);
  };

  const thumbnailImage = images.find((img) => img.is_thumbnail);

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium text-gray-900'>
          Hình ảnh phòng ({images.length}/{maxImages})
        </h3>
        {!readOnly && roomTypeId && (
          <button
            type='button'
            onClick={openFileDialog}
            disabled={loading || images.length >= maxImages}
            className='px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
          >
            <TbUpload size={16} />
            Thêm ảnh
          </button>
        )}
      </div>

      {/* Upload Area */}
      {!readOnly && roomTypeId && images.length < maxImages && (
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
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-lg flex items-center space-x-2'>
            <TbLoader className='animate-spin h-6 w-6 text-blue-600' />
            <span>Đang xử lý...</span>
          </div>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {images.map((image) => (
            <div
              key={image.id}
              className='group relative bg-gray-100 rounded-lg overflow-hidden aspect-square'
            >
              <Image
                src={RoomImagesApi.getImageUrl(image.path)}
                alt={`Room image ${image.id}`}
                width={200}
                height={200}
                className='w-full h-full object-cover transition-transform group-hover:scale-105'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/rooms/placeholder.png';
                }}
              />

              {/* Thumbnail Badge */}
              {image.is_thumbnail && (
                <div className='absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1'>
                  <TbStarFilled size={12} />
                  Đại diện
                </div>
              )}

              {/* Overlay */}
              <div className='absolute inset-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center'>
                <div className='opacity-0 group-hover:opacity-100 transition-opacity flex gap-2'>
                  <button
                    type='button'
                    onClick={() => handleViewImage(image)}
                    className='p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors'
                    title='Xem'
                  >
                    <TbEye size={16} />
                  </button>
                  {!readOnly && (
                    <>
                      <button
                        type='button'
                        onClick={() => handleSetThumbnail(image.id)}
                        disabled={loading || image.is_thumbnail}
                        className={`p-2 bg-white rounded-full transition-colors ${
                          image.is_thumbnail
                            ? 'text-yellow-500 cursor-default'
                            : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'
                        }`}
                        title={
                          image.is_thumbnail
                            ? 'Đang là ảnh đại diện'
                            : 'Đặt làm ảnh đại diện'
                        }
                      >
                        {image.is_thumbnail ? (
                          <TbStarFilled size={16} />
                        ) : (
                          <TbStar size={16} />
                        )}
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDeleteImage(image.id)}
                        disabled={loading}
                        className='p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors'
                        title='Xóa'
                      >
                        <TbTrash size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-8 text-gray-500'>
          <TbPhoto className='mx-auto h-12 w-12 text-gray-300 mb-2' />
          <p>Chưa có hình ảnh nào</p>
          {!readOnly && roomTypeId && (
            <p className='text-sm'>Thêm hình ảnh để hiển thị phòng</p>
          )}
        </div>
      )}

      {/* Thumbnail Info */}
      {thumbnailImage && (
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
          <div className='flex items-center gap-2 text-yellow-800'>
            <TbStarFilled size={16} />
            <span className='text-sm font-medium'>
              Ảnh đại diện: {thumbnailImage.path.split('/').pop()}
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
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
          <div className='relative max-w-4xl max-h-full'>
            <button
              type='button'
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors z-10'
            >
              <TbX size={20} />
            </button>

            <Image
              src={RoomImagesApi.getImageUrl(selectedImage.path)}
              alt={`Room image ${selectedImage.id}`}
              width={800}
              height={600}
              className='max-w-full max-h-full object-contain rounded-lg'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/rooms/placeholder.png';
              }}
            />

            {/* Image Info */}
            <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium mb-1'>
                    {selectedImage.path.split('/').pop()}
                  </h3>
                  <p className='text-sm opacity-75'>
                    Tạo:{' '}
                    {new Date(selectedImage.created_at).toLocaleDateString(
                      'vi-VN',
                    )}
                  </p>
                </div>
                {selectedImage.is_thumbnail && (
                  <div className='flex items-center gap-1 bg-yellow-500 px-2 py-1 rounded-full text-xs'>
                    <TbStarFilled size={12} />
                    Ảnh đại diện
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomImageManager;
