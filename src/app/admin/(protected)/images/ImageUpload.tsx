'use client';

import React, { useState, useRef } from 'react';
import { TbUpload, TbLoader, TbPhoto, TbX } from 'react-icons/tb';
import { uploadImage, UploadImageResponse } from './api';

interface ImageUploadProps {
  onSuccess?: (uploadedImage: UploadImageResponse) => void;
  onError?: (error: string) => void;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSuccess,
  onError,
  maxFileSize = 5,
  acceptedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/webp',
  ],
}) => {
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
      onError?.(error);
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const result = await uploadImage(selectedFile);

      if (result) {
        onSuccess?.(result);
        // Reset form
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Không thể tải lên hình ảnh';
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <TbUpload className='text-2xl text-blue-600' />
        <h2 className='text-2xl font-bold text-gray-900'>Tải lên hình ảnh</h2>
      </div>

      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <TbPhoto className='mx-auto h-12 w-12 text-gray-400 mb-4' />
          <p className='text-lg font-medium text-gray-900 mb-2'>
            Kéo thả hình ảnh vào đây
          </p>
          <p className='text-sm text-gray-600 mb-4'>
            hoặc{' '}
            <button
              type='button'
              onClick={openFileDialog}
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              chọn file từ máy tính
            </button>
          </p>
          <p className='text-xs text-gray-500'>
            Hỗ trợ: JPG, PNG, GIF, WebP. Tối đa {maxFileSize}MB
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {/* Preview */}
          <div className='relative'>
            <img
              src={preview || ''}
              alt='Preview'
              className='w-full max-w-md mx-auto rounded-lg shadow-md'
            />
            <button
              onClick={handleCancel}
              className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors'
              disabled={loading}
            >
              <TbX size={16} />
            </button>
          </div>

          {/* File Info */}
          <div className='bg-gray-50 rounded-lg p-4'>
            <h3 className='font-medium text-gray-900 mb-2'>Thông tin file:</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600'>
              <div>
                <span className='font-medium'>Tên:</span> {selectedFile.name}
              </div>
              <div>
                <span className='font-medium'>Kích thước:</span>{' '}
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </div>
              <div>
                <span className='font-medium'>Định dạng:</span>{' '}
                {selectedFile.type}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <button
              onClick={handleUpload}
              disabled={loading}
              className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              {loading ? (
                <>
                  <TbLoader className='animate-spin' />
                  Đang tải lên...
                </>
              ) : (
                <>
                  <TbUpload />
                  Tải lên
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className='px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        className='hidden'
      />
    </div>
  );
};

export default ImageUpload;
