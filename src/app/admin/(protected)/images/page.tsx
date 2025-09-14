'use client';

import { useState, useEffect } from 'react';
import { TbUpload, TbPhoto, TbRefresh } from 'react-icons/tb';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';
import { fetchImages, ImageFile, UploadImageResponse } from './api';

export default function ImagesPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchImages();
      setImages(response.data);
    } catch (err) {
      setError('Không thể tải danh sách hình ảnh');
      console.error('Error loading images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (uploadedImage: UploadImageResponse) => {
    // Add the new image to the list
    const newImage: ImageFile = {
      path: uploadedImage.path,
      size: uploadedImage.size,
      last_modified: new Date().toISOString(),
      filename: uploadedImage.filename,
      original_name: uploadedImage.original_name,
      mime_type: uploadedImage.mime_type,
    };

    setImages((prev) => [newImage, ...prev]);
    setShowUpload(false);
    setSuccessMessage('Tải lên hình ảnh thành công!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleImagesUpdate = () => {
    loadImages();
    setSuccessMessage('Cập nhật danh sách hình ảnh thành công!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleImageError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        <span className='ml-3 text-gray-600'>Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error && !showUpload && images.length === 0) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
        {error}
        <button
          onClick={loadImages}
          className='ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h1 className='text-3xl font-bold text-gray-900'>Quản lý hình ảnh</h1>
        <div className='flex flex-col sm:flex-row gap-3'>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              showUpload
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {showUpload ? (
              <>
                <TbPhoto />
                Xem thư viện
              </>
            ) : (
              <>
                <TbUpload />
                Tải lên hình ảnh
              </>
            )}
          </button>
          <button
            onClick={loadImages}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
          >
            <TbRefresh />
            Làm mới
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-between'>
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage(null)}
            className='text-green-900 hover:text-green-700 ml-2'
          >
            ✕
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center justify-between'>
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className='text-red-900 hover:text-red-700 ml-2'
          >
            ✕
          </button>
        </div>
      )}

      {/* Statistics */}
      {!showUpload && (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <TbPhoto className='h-6 w-6 text-gray-400' />
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Tổng số hình ảnh
                    </dt>
                    <dd className='text-lg font-medium text-gray-900'>
                      {images.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <TbUpload className='h-6 w-6 text-gray-400' />
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Tổng dung lượng
                    </dt>
                    <dd className='text-lg font-medium text-gray-900'>
                      {images.length > 0
                        ? (() => {
                            const totalSize = images.reduce(
                              (sum, img) => sum + img.size,
                              0,
                            );
                            const totalSizeMB = totalSize / (1024 * 1024);
                            return totalSizeMB < 1024
                              ? `${totalSizeMB.toFixed(1)} MB`
                              : `${(totalSizeMB / 1024).toFixed(1)} GB`;
                          })()
                        : '0 MB'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <TbPhoto className='h-6 w-6 text-gray-400' />
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Kích thước TB
                    </dt>
                    <dd className='text-lg font-medium text-gray-900'>
                      {images.length > 0
                        ? (() => {
                            const avgSize =
                              images.reduce((sum, img) => sum + img.size, 0) /
                              images.length;
                            return `${(avgSize / (1024 * 1024)).toFixed(1)} MB`;
                          })()
                        : '0 MB'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <TbRefresh className='h-6 w-6 text-gray-400' />
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Cập nhật gần nhất
                    </dt>
                    <dd className='text-lg font-medium text-gray-900'>
                      {images.length > 0
                        ? (() => {
                            const latestImage = images.reduce((latest, img) =>
                              new Date(img.last_modified) >
                              new Date(latest.last_modified)
                                ? img
                                : latest,
                            );
                            return new Date(
                              latestImage.last_modified,
                            ).toLocaleDateString('vi-VN');
                          })()
                        : 'Chưa có'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {showUpload ? (
        <ImageUpload
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
        />
      ) : (
        <ImageGallery
          images={images}
          onDataChange={handleImagesUpdate}
          onError={handleImageError}
        />
      )}
    </div>
  );
}
