'use client';

import { UseProfileReturn } from '@/features/vietstay/profile/api/useProfile';

export default function PasswordForm({
  registerPassword,
  handleSubmitPassword,
  errorsPassword,
  onSubmitPassword,
  loading,
}: UseProfileReturn) {
  return (
    <div className='bg-white p-6 rounded-lg shadow space-y-4'>
      <h2 className='text-lg font-semibold'>Đổi mật khẩu</h2>
      <form
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        className='space-y-4'
      >
        <div>
          <label className='block text-sm font-medium'>Mật khẩu hiện tại</label>
          <input
            type='password'
            {...registerPassword('current_password')}
            className='mt-1 w-full border p-2 rounded'
            placeholder='Nhập mật khẩu hiện tại'
          />
          <p className='text-red-500 text-sm'>
            {errorsPassword.current_password?.message}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium'>Mật khẩu mới</label>
          <input
            type='password'
            {...registerPassword('password')}
            className='mt-1 w-full border p-2 rounded'
            placeholder='Nhập mật khẩu mới (tối thiểu 6 ký tự)'
          />
          <p className='text-red-500 text-sm'>
            {errorsPassword.password?.message}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium'>
            Xác nhận mật khẩu mới
          </label>
          <input
            type='password'
            {...registerPassword('password_confirmation')}
            className='mt-1 w-full border p-2 rounded'
            placeholder='Nhập lại mật khẩu mới'
          />
          <p className='text-red-500 text-sm'>
            {errorsPassword.password_confirmation?.message}
          </p>
        </div>
        <button
          type='submit'
          disabled={loading}
          className='bg-red-600 text-white px-4 py-2 rounded'
        >
          {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
        </button>
      </form>
    </div>
  );
}
