'use client';

import { UseProfileReturn } from '@/features/vietstay/profile/api/useProfile';

export default function ProfileForm({
  register,
  handleSubmit,
  errors,
  onSubmitProfile,
  loading,
}: UseProfileReturn) {
  return (
    <div className='bg-white p-6 rounded-lg shadow space-y-4'>
      <h2 className='text-lg font-semibold'>Thông tin cơ bản</h2>
      <form
        onSubmit={handleSubmit(onSubmitProfile)}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <div>
          <label className='block mb-1'>Tên</label>
          <input {...register('name')} className='w-full border p-2 rounded' />
          <p className='text-red-500 text-sm'>{errors.name?.message}</p>
        </div>

        <div>
          <label className='block mb-1'>Số điện thoại</label>
          <input {...register('phone')} className='w-full border p-2 rounded' />
          <p className='text-red-500 text-sm'>{errors.phone?.message}</p>
        </div>

        <div>
          <label className='block mb-1'>Ngày sinh</label>
          <input
            type='date'
            {...register('dob')}
            className='w-full border p-2 rounded'
          />
          <p className='text-red-500 text-sm'>{errors.dob?.message}</p>
        </div>

        <div className='md:col-span-2'>
          <label className='block mb-1'>Địa chỉ</label>
          <textarea
            {...register('address')}
            className='w-full border p-2 rounded'
          />
          <p className='text-red-500 text-sm'>{errors.address?.message}</p>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-green-700 text-white px-4 py-2 rounded mt-2 md:col-span-2'
        >
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </form>
    </div>
  );
}
