'use client';

import React, { useState } from 'react';
import { TbPlus, TbLoader } from 'react-icons/tb';
import {
  createFacility,
  CreateFacilityData,
  Facility,
} from '@/features/admin/facilities/api/api';

interface CreateFacilityFormProps {
  onSuccess?: (facility: Facility) => void;
  onError?: (error: string) => void;
}

const CreateFacilityForm: React.FC<CreateFacilityFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<CreateFacilityData>({
    name: '',
    content: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateFacilityData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateFacilityData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên tiện nghi là bắt buộc';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
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
      const newFacility = await createFacility(formData);

      if (newFacility) {
        // Reset form
        setFormData({ name: '', content: '', description: '' });
        setErrors({});
        onSuccess?.(newFacility);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Không thể tạo tiện nghi mới';
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateFacilityData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <TbPlus className='text-2xl text-blue-600' />
        <h2 className='text-2xl font-bold text-gray-900'>Thêm tiện nghi mới</h2>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Name Field */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Tên tiện nghi *
          </label>
          <input
            id='name'
            type='text'
            placeholder='Nhập tên tiện nghi'
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

        {/* Content Field */}
        <div>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Nội dung *
          </label>
          <input
            id='content'
            type='text'
            placeholder='Nhập nội dung tiện nghi'
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {errors.content && (
            <p className='mt-1 text-sm text-red-600'>{errors.content}</p>
          )}
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
            placeholder='Nhập mô tả chi tiết về tiện nghi'
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
              Tạo tiện nghi
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateFacilityForm;
