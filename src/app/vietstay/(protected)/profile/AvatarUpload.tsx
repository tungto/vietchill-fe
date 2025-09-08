'use client';

import Image from 'next/image';
import { UseProfileReturn } from './useProfile';

export default function AvatarUpload({
  profile,
  avatar,
  setAvatar,
  handleSubmit,
  onSubmitProfile,
  loading,
}: UseProfileReturn) {
  return (
    <div className='bg-white p-6 rounded-lg shadow space-y-4'>
      <h2 className='text-lg font-semibold'>Ảnh đại diện</h2>
      <div className='flex items-center gap-4'>
        {profile?.avatar && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.avatar}`}
            alt='avatar'
            width={100}
            height={100}
            className='rounded-full'
          />
        )}
        <div>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={handleSubmit(onSubmitProfile)}
            disabled={!avatar || loading}
            className='bg-green-700 text-white px-4 py-2 rounded mt-2 block'
          >
            {loading ? 'Đang tải...' : 'Lưu ảnh'}
          </button>
        </div>
      </div>
    </div>
  );
}
