'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	FiMail,
	FiLock,
	FiUser,
	FiPhone,
	FiMapPin,
	FiCalendar,
} from 'react-icons/fi';
import FormInput from '@/features/auth/FormInput';
import Link from 'next/link';

const registerSchema = yup.object({
	name: yup.string().required('Name is required'),

	email: yup.string().email('Invalid email').required('Email is required'),

	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),

	password_confirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Password confirmation is required'),

	address: yup.string().required('Address is required'),

	phone: yup.string().required('Phone is required'),

	dob: yup.string().required('Date of birth is required'),
});

type RegisterFormInputs = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormInputs>({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormInputs) => {
		setLoading(true);
		setServerError('');

		try {
			// ✅ Explicit payload
			const payload = {
				name: data.name,
				email: data.email,
				password: data.password,
				password_confirmation: data.password_confirmation,
				address: data.address,
				phone: data.phone,
				dob: data.dob,
			};

			const res = await fetch('http://localhost:8000/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			const result = await res.json();

			if (!result.success) {
				setServerError(result.message || 'Registration failed');
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
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 mt-16'>
			<div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mt-8 mb-8'>
				<h1 className='text-2xl font-bold text-gray-800 text-center mb-2'>
					Create Account
				</h1>
				<p className='text-center text-gray-500 mb-4'>
					Sign up to start booking hotels
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<FormInput
						label='Name'
						placeholder='Your full name'
						icon={<FiUser />}
						registration={register('name')}
						error={errors.name}
					/>

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

					<FormInput
						label='Confirm Password'
						placeholder='••••••••'
						icon={<FiLock />}
						registration={register('password_confirmation')}
						error={errors.password_confirmation}
						isPassword
					/>

					<FormInput
						label='Address'
						placeholder='123 Nguyen Van Linh, Q9, TP.HCM'
						icon={<FiMapPin />}
						registration={register('address')}
						error={errors.address}
					/>

					<FormInput
						label='Phone'
						type='tel'
						placeholder='0909090909'
						icon={<FiPhone />}
						registration={register('phone')}
						error={errors.phone}
					/>

					<FormInput
						label='Date of Birth'
						type='date'
						icon={<FiCalendar />}
						registration={register('dob')}
						error={errors.dob}
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
						{loading ? 'Registering...' : 'Sign Up'}
					</button>
				</form>

				<p className='text-center text-sm text-gray-500 mt-6'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='text-indigo-600 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
