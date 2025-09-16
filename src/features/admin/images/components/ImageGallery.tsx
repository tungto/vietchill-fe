'use client';

import React, { useState } from 'react';
import {
  TbTrash,
  TbEye,
  TbDownload,
  TbX,
  TbPhoto,
  TbSearch,
  TbGrid3X3,
  TbList,
} from 'react-icons/tb';
import {
  ImageFile,
  deleteImage,
  ImagesApi,
} from '@/features/admin/images/api/api';
import Image from 'next/image';

interface ImageGalleryProps {
  images: ImageFile[];
  onDataChange: () => void;
  onError?: (error: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onDataChange,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState<ImageFile[]>(images);

  // Update filtered images when images or search term changes
  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredImages(images);
    } else {
      const filtered = images.filter((image) =>
        image.path.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredImages(filtered);
    }
  }, [searchTerm, images]);

  const handleDeleteImage = async (imagePath: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      try {
        setLoading(true);
        await deleteImage(imagePath);
        onDataChange(); // Refresh data from parent
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Không thể xóa hình ảnh';
        onError?.(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewImage = (image: ImageFile) => {
    setSelectedImage(image);
  };

  const handleDownloadImage = (image: ImageFile) => {
    const link = document.createElement('a');
    link.href = ImagesApi.getImageUrl(image.path);
    link.download = image.filename || image.path.split('/').pop() || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (filteredImages.length === 0 && !searchTerm) {
    return (
      <div className='bg-white rounded-lg shadow-md p-8 text-center'>
        <TbPhoto className='mx-auto h-16 w-16 text-gray-400 mb-4' />
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          Chưa có hình ảnh nào
        </h3>
        <p className='text-gray-600'>
          Tải lên hình ảnh đầu tiên để bắt đầu quản lý thư viện ảnh.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Search and View Controls */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
          {/* Search */}
          <div className='relative flex-1 max-w-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <TbSearch className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Tìm kiếm hình ảnh...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
              >
                <TbX className='h-5 w-5 text-gray-400 hover:text-gray-600' />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Hiển thị:</span>
            <div className='flex rounded-lg border border-gray-300 overflow-hidden'>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <TbGrid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <TbList size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <p className='mt-2 text-sm text-gray-600'>
            Tìm thấy {filteredImages.length} kết quả cho &ldquo;{searchTerm}
            &rdquo;
          </p>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-lg flex items-center space-x-2'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
            <span>Đang xử lý...</span>
          </div>
        </div>
      )}

      {/* Images Display */}
      {filteredImages.length === 0 ? (
        <div className='bg-white rounded-lg shadow-md p-8 text-center'>
          <TbSearch className='mx-auto h-16 w-16 text-gray-400 mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Không tìm thấy hình ảnh nào
          </h3>
          <p className='text-gray-600'>
            Thử thay đổi từ khóa tìm kiếm hoặc xóa bộ lọc.
          </p>
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {viewMode === 'grid' ? (
            // Grid View
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4'>
              {filteredImages.map((image, index) => (
                <div
                  key={`${image.path}-${index}`}
                  className='group relative bg-gray-100 rounded-lg overflow-hidden aspect-square'
                >
                  <Image
                    src={ImagesApi.getImageUrl(image.path)}
                    width={200}
                    height={200}
                    alt={image.filename || image.path}
                    className='w-full h-full object-cover transition-transform group-hover:scale-105'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/rooms/placeholder.png';
                    }}
                  />

                  {/* Overlay */}
                  <div className='absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center'>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity flex gap-2'>
                      <button
                        onClick={() => handleViewImage(image)}
                        className='p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors'
                        title='Xem'
                      >
                        <TbEye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownloadImage(image)}
                        className='p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors'
                        title='Tải xuống'
                      >
                        <TbDownload size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.path)}
                        className='p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors'
                        title='Xóa'
                        disabled={loading}
                      >
                        <TbTrash size={16} />
                      </button>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2'>
                    <p className='text-white text-xs truncate'>
                      {image.filename || image.path.split('/').pop()}
                    </p>
                    <p className='text-white text-xs opacity-75'>
                      {ImagesApi.formatFileSize(image.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className='divide-y divide-gray-200'>
              {filteredImages.map((image, index) => (
                <div
                  key={`${image.path}-${index}`}
                  className='flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors'
                >
                  {/* Thumbnail */}
                  <div className='flex-shrink-0'>
                    <Image
                      width={200}
                      height={200}
                      src={ImagesApi.getImageUrl(image.path)}
                      alt={image.filename || image.path}
                      className='w-16 h-16 object-cover rounded-lg'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/rooms/placeholder.png';
                      }}
                    />
                  </div>

                  {/* File Info */}
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-sm font-medium text-gray-900 truncate'>
                      {image.filename || image.path.split('/').pop()}
                    </h3>
                    <div className='mt-1 flex items-center gap-4 text-xs text-gray-500'>
                      <span>{ImagesApi.formatFileSize(image.size)}</span>
                      <span>{formatDate(image.last_modified)}</span>
                      <span className='truncate'>{image.path}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => handleViewImage(image)}
                      className='p-2 text-gray-400 hover:text-blue-600 transition-colors'
                      title='Xem'
                    >
                      <TbEye size={18} />
                    </button>
                    <button
                      onClick={() => handleDownloadImage(image)}
                      className='p-2 text-gray-400 hover:text-green-600 transition-colors'
                      title='Tải xuống'
                    >
                      <TbDownload size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.path)}
                      className='p-2 text-gray-400 hover:text-red-600 transition-colors'
                      title='Xóa'
                      disabled={loading}
                    >
                      <TbTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
          <div className='relative max-w-4xl max-h-full'>
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors z-10'
            >
              <TbX size={20} />
            </button>

            <img
              src={ImagesApi.getImageUrl(selectedImage.path)}
              alt={selectedImage.filename || selectedImage.path}
              className='max-w-full max-h-full object-contain rounded-lg'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder-image.jpg';
              }}
            />

            {/* Image Info */}
            <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg'>
              <h3 className='font-medium mb-2'>
                {selectedImage.filename || selectedImage.path.split('/').pop()}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                <div>
                  <span className='opacity-75'>Kích thước:</span>{' '}
                  {ImagesApi.formatFileSize(selectedImage.size)}
                </div>
                <div>
                  <span className='opacity-75'>Ngày tải:</span>{' '}
                  {formatDate(selectedImage.last_modified)}
                </div>
                <div>
                  <span className='opacity-75'>Đường dẫn:</span>{' '}
                  <span className='truncate'>{selectedImage.path}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
