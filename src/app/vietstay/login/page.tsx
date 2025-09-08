'use client';

import FormInput from '@/features/auth/FormInput';
import { useAuthActions } from '@/features/hooks/useAuthActions';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiLock, FiMail } from 'react-icons/fi';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(loginSchema),
	});

	const { login } = useAuthActions();
	const onSubmit = async (data: LoginFormInputs) => {
		setLoading(true);
		setServerError('');

		try {
			await login(data.email, data.password);
		} catch (err: unknown) {
			console.log(err);
			setServerError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className='flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-50 to-gray-100'>
			<div className='w-full max-w-md p-8 bg-white shadow-lg rounded-2xl'>
				<h1 className='mb-6 text-2xl font-bold text-center text-gray-800'>
					Welcome Back
				</h1>
				<p className='mb-8 text-center text-gray-500'>
					Log in to continue booking your perfect stay
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<FormInput
						label='Email'
						type='email'
						placeholder='you@example.com'
						icon={<FiMail />}
						registration={register('email')}
						error={errors.email}
					/>

					<FormInput
						label='Password'
						placeholder='••••••••'
						icon={<FiLock />}
						registration={register('password')}
						error={errors.password}
						isPassword
					/>

					{serverError && (
						<div className='text-sm text-center text-red-600'>
							{serverError}
						</div>
					)}

					<button
						type='submit'
						disabled={loading}
						className='w-full bg-[#0f4c4c] hover:bg-[#0c3d3d] text-white font-medium py-2.5 rounded-lg shadow-md transition disabled:opacity-50'>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

				<p className='mt-6 text-sm text-center text-gray-500'>
					Don&apos;t have an account?{' '}
					<Link
						href='/vietstay/sign-up'
						className='text-indigo-600 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
