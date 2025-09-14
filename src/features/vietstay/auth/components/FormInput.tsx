'use client';

import { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface FormInputProps {
	label: string;
	type?: string;
	placeholder?: string;
	icon?: React.ReactNode;
	registration: UseFormRegisterReturn;
	error?: FieldError;
	isPassword?: boolean;
}

export default function FormInput({
	label,
	type = 'text',
	placeholder,
	icon,
	registration,
	error,
	isPassword = false,
}: FormInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div>
			<label className='block text-sm font-medium text-gray-700 mb-2'>
				{label}
			</label>
			<div className='relative'>
				{icon && (
					<span className='absolute top-3 left-3 text-gray-400'>
						{icon}
					</span>
				)}

				<input
					type={
						isPassword ? (showPassword ? 'text' : 'password') : type
					}
					placeholder={placeholder}
					{...registration}
					className={`w-full ${
						icon ? 'pl-10' : 'pl-3'
					} pr-10 py-2 border rounded-lg outline-none transition ${
						error
							? 'border-red-500 focus:ring-red-500'
							: 'border-gray-300 focus:ring-2 focus:ring-indigo-500'
					}`}
				/>

				{/* Password toggle */}
				{isPassword && (
					<button
						type='button'
						className='absolute top-2.5 right-3 text-gray-400 hover:text-gray-600'
						onClick={() => setShowPassword((prev) => !prev)}>
						{showPassword ? <FiEyeOff /> : <FiEye />}
					</button>
				)}
			</div>
			{error && (
				<p className='text-sm text-red-500 mt-1'>{error.message}</p>
			)}
		</div>
	);
}
