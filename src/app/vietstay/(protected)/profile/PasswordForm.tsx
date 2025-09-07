'use client';

import { UseProfileReturn } from './useProfile';

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
				className='space-y-4'>
				<div>
					<label className='block text-sm font-medium'>
						Mật khẩu mới
					</label>
					<input
						type='password'
						{...registerPassword('newPassword')}
						className='mt-1 w-full border p-2 rounded'
					/>
					<p className='text-red-500 text-sm'>
						{errorsPassword.newPassword?.message}
					</p>
				</div>
				<div>
					<label className='block text-sm font-medium'>
						Xác nhận mật khẩu
					</label>
					<input
						type='password'
						{...registerPassword('confirmPassword')}
						className='mt-1 w-full border p-2 rounded'
					/>
					<p className='text-red-500 text-sm'>
						{errorsPassword.confirmPassword?.message}
					</p>
				</div>
				<button
					type='submit'
					disabled={loading}
					className='bg-red-600 text-white px-4 py-2 rounded'>
					{loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
				</button>
			</form>
		</div>
	);
}
