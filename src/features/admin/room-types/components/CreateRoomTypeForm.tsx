'use client';

import React, { useState, useEffect } from 'react';
import { TbPlus, TbLoader, TbX } from 'react-icons/tb';
import {
  createRoomType,
  CreateRoomTypeData,
  RoomType,
  Facility,
  Feature,
  fetchAllFacilities,
  fetchAllFeatures,
} from '@/features/admin/room-types/api/api';
import ClientImageSelector from './ClientImageSelector';

interface CreateRoomTypeFormProps {
  onSuccess?: (roomType: RoomType) => void;
  onError?: (error: string) => void;
}

const CreateRoomTypeForm: React.FC<CreateRoomTypeFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<CreateRoomTypeData>({
    name: '',
    area: 0,
    price: 0,
    quantity: 0,
    adult: 1,
    children: 0,
    description: '',
    facilities: [],
    features: [],
    images: [],
    thumbnail_image: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateRoomTypeData, string>>
  >({});
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoadingData(true);
      const [facilitiesData, featuresData] = await Promise.all([
        fetchAllFacilities(),
        fetchAllFeatures(),
      ]);
      setFacilities(facilitiesData);
      setFeatures(featuresData);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      onError?.('Không thể tải dữ liệu ban đầu');
    } finally {
      setLoadingData(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateRoomTypeData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên loại phòng là bắt buộc';
    }
    if (formData.area <= 0) {
      newErrors.area = 'Diện tích phải lớn hơn 0';
    }
    if (formData.price < 0) {
      newErrors.price = 'Giá phải lớn hơn hoặc bằng 0';
    }
    if (formData.quantity < 0) {
      newErrors.quantity = 'Số lượng phải lớn hơn hoặc bằng 0';
    }
    if (formData.adult < 1 || formData.adult > 10) {
      newErrors.adult = 'Số người lớn phải từ 1 đến 10';
    }
    if (formData.children < 0 || formData.children > 10) {
      newErrors.children = 'Số trẻ em phải từ 0 đến 10';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    }
    if (formData.facilities.length === 0) {
      newErrors.facilities = 'Phải chọn ít nhất một tiện nghi';
    }
    if (formData.features.length === 0) {
      newErrors.features = 'Phải chọn ít nhất một không gian';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const newRoomType = await createRoomType(formData);

      if (newRoomType) {
        // Reset form
        setFormData({
          name: '',
          area: 0,
          price: 0,
          quantity: 0,
          adult: 1,
          children: 0,
          description: '',
          facilities: [],
          features: [],
          images: [],
          thumbnail_image: '',
        });
        setErrors({});
        onSuccess?.(newRoomType);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Không thể tạo loại phòng mới';
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateRoomTypeData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFacilityToggle = (facilityId: number) => {
    const currentFacilities = formData.facilities;
    const newFacilities = currentFacilities.includes(facilityId)
      ? currentFacilities.filter((id) => id !== facilityId)
      : [...currentFacilities, facilityId];

    handleInputChange('facilities', newFacilities);
  };

  const handleFeatureToggle = (featureId: number) => {
    const currentFeatures = formData.features;
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter((id) => id !== featureId)
      : [...currentFeatures, featureId];

    handleInputChange('features', newFeatures);
  };

  const handleImagesChange = (images: string[]) => {
    handleInputChange('images', images);
  };

  const handleThumbnailChange = (thumbnailPath: string) => {
    handleInputChange('thumbnail_image', thumbnailPath);
  };

  if (loadingData) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center justify-center h-32'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='ml-2'>Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <TbPlus className='text-2xl text-blue-600' />
        <h2 className='text-2xl font-bold text-gray-900'>
          Thêm loại phòng mới
        </h2>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Basic Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Name Field */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Tên loại phòng *
            </label>
            <input
              id='name'
              type='text'
              placeholder='Nhập tên loại phòng'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
            )}
          </div>

          {/* Area Field */}
          <div>
            <label
              htmlFor='area'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Diện tích (m²) *
            </label>
            <input
              id='area'
              type='number'
              min='1'
              placeholder='Nhập diện tích'
              value={formData.area || ''}
              onChange={(e) =>
                handleInputChange('area', parseInt(e.target.value) || 0)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.area ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.area && (
              <p className='mt-1 text-sm text-red-600'>{errors.area}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Giá (VND) *
            </label>
            <input
              id='price'
              type='number'
              min='0'
              placeholder='Nhập giá phòng'
              value={formData.price || ''}
              onChange={(e) =>
                handleInputChange('price', parseInt(e.target.value) || 0)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.price && (
              <p className='mt-1 text-sm text-red-600'>{errors.price}</p>
            )}
          </div>

          {/* Quantity Field */}
          <div>
            <label
              htmlFor='quantity'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Số lượng phòng *
            </label>
            <input
              id='quantity'
              type='number'
              min='0'
              placeholder='Nhập số lượng phòng'
              value={formData.quantity || ''}
              onChange={(e) =>
                handleInputChange('quantity', parseInt(e.target.value) || 0)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.quantity && (
              <p className='mt-1 text-sm text-red-600'>{errors.quantity}</p>
            )}
          </div>

          {/* Adult Field */}
          <div>
            <label
              htmlFor='adult'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Số người lớn *
            </label>
            <input
              id='adult'
              type='number'
              min='1'
              max='10'
              placeholder='Nhập số người lớn'
              value={formData.adult || ''}
              onChange={(e) =>
                handleInputChange('adult', parseInt(e.target.value) || 1)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.adult ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.adult && (
              <p className='mt-1 text-sm text-red-600'>{errors.adult}</p>
            )}
          </div>

          {/* Children Field */}
          <div>
            <label
              htmlFor='children'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Số trẻ em
            </label>
            <input
              id='children'
              type='number'
              min='0'
              max='10'
              placeholder='Nhập số trẻ em'
              value={formData.children || ''}
              onChange={(e) =>
                handleInputChange('children', parseInt(e.target.value) || 0)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.children ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.children && (
              <p className='mt-1 text-sm text-red-600'>{errors.children}</p>
            )}
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Mô tả *
          </label>
          <textarea
            id='description'
            placeholder='Nhập mô tả chi tiết về loại phòng'
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {errors.description && (
            <p className='mt-1 text-sm text-red-600'>{errors.description}</p>
          )}
        </div>

        {/* Facilities Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Tiện nghi *
          </label>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3'>
            {facilities.map((facility) => (
              <label
                key={facility.id}
                className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded'
              >
                <input
                  type='checkbox'
                  checked={formData.facilities.includes(facility.id)}
                  onChange={() => handleFacilityToggle(facility.id)}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  disabled={loading}
                />
                <span className='text-sm text-gray-700'>
                  {facility.content}
                </span>
              </label>
            ))}
          </div>
          {errors.facilities && (
            <p className='mt-1 text-sm text-red-600'>{errors.facilities}</p>
          )}
        </div>

        {/* Features Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Không gian *
          </label>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3'>
            {features.map((feature) => (
              <label
                key={feature.id}
                className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded'
              >
                <input
                  type='checkbox'
                  checked={formData.features.includes(feature.id)}
                  onChange={() => handleFeatureToggle(feature.id)}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  disabled={loading}
                />
                <span className='text-sm text-gray-700'>{feature.content}</span>
              </label>
            ))}
          </div>
          {errors.features && (
            <p className='mt-1 text-sm text-red-600'>{errors.features}</p>
          )}
        </div>

        {/* Image Selection */}
        <div>
          <ClientImageSelector
            selectedImages={formData.images}
            thumbnailImage={formData.thumbnail_image}
            onImagesChange={handleImagesChange}
            onThumbnailChange={handleThumbnailChange}
            onError={onError}
            maxImages={10}
            disabled={loading}
          />
          {errors.images && (
            <p className='mt-1 text-sm text-red-600'>{errors.images}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {loading ? (
            <>
              <TbLoader className='animate-spin' />
              Đang tạo...
            </>
          ) : (
            <>
              <TbPlus />
              Tạo loại phòng
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateRoomTypeForm;
