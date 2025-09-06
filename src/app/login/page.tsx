'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock } from 'react-icons/fi';
import FormInput from '@/features/auth/FormInput';

const loginSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormInputs) => {
		setLoading(true);
		setServerError('');

		try {
			const res = await fetch('http://localhost:8000/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!result.success) {
				setServerError(result.message || 'Login failed');
			} else {
				localStorage.setItem('token', result.data.token);
				router.push('/');
			}
		} catch {
			setServerError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4'>
			<div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-lg'>
				<h1 className='text-2xl font-bold text-gray-800 text-center mb-6'>
					Welcome Back
				</h1>
				<p className='text-center text-gray-500 mb-8'>
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
						<div className='text-sm text-red-600 text-center'>
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

				<p className='text-center text-sm text-gray-500 mt-6'>
					Don&apos;t have an account?{' '}
					<a
						href='/sign-up'
						className='text-indigo-600 hover:underline'>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
