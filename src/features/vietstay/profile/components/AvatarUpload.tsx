'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { UseProfileReturn } from '@/features/vietstay/profile/api/useProfile';

export default function AvatarUpload({
  profile,
  avatar,
  setAvatar,
  onSubmitAvatar,
  loading,
}: UseProfileReturn) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (avatar) {
      const url = URL.createObjectURL(avatar);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [avatar]);

  return (
    <div className='bg-white p-6 rounded-lg shadow space-y-4'>
      <h2 className='text-lg font-semibold'>Ảnh đại diện</h2>

      <div className='flex items-start gap-6'>
        {/* Current Avatar */}
        <div className='flex flex-col items-center space-y-2'>
          <div className='text-sm font-medium text-gray-700'>Ảnh hiện tại</div>
          {profile?.avatar ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.avatar}`}
              alt='Current avatar'
              width={100}
              height={100}
              className='rounded-full object-cover border-2 border-gray-200'
            />
          ) : (
            <div className='w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300'>
              <span className='text-gray-500 text-sm'>Chưa có ảnh</span>
            </div>
          )}
        </div>

        {/* Preview New Avatar */}
        {previewUrl && (
          <div className='flex flex-col items-center space-y-2'>
            <div className='text-sm font-medium text-gray-700'>Ảnh mới</div>
            <Image
              src={previewUrl}
              alt='Preview avatar'
              width={100}
              height={100}
              className='rounded-full object-cover border-2 border-blue-200'
            />
          </div>
        )}

        {/* Upload Controls */}
        <div className='flex-1 space-y-3'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Chọn ảnh mới
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
          </div>

          {avatar && (
            <div className='text-sm text-gray-600 bg-gray-50 p-2 rounded'>
              <strong>Đã chọn:</strong> {avatar.name}
              <br />
              <strong>Kích thước:</strong>{' '}
              {(avatar.size / 1024 / 1024).toFixed(2)} MB
            </div>
          )}

          <button
            onClick={onSubmitAvatar}
            disabled={!avatar || loading}
            className='w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium'
          >
            {loading ? 'Đang tải lên...' : 'Cập nhật ảnh đại diện'}
          </button>

          {avatar && (
            <button
              onClick={() => setAvatar(null)}
              disabled={loading}
              className='w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition font-medium'
            >
              Hủy chọn
            </button>
          )}
        </div>
      </div>

      <div className='text-xs text-gray-500 bg-blue-50 p-3 rounded-lg'>
        <strong>Lưu ý:</strong> Chỉ chấp nhận file ảnh (JPG, PNG, GIF) với kích
        thước tối đa 5MB.
      </div>
    </div>
  );
}
