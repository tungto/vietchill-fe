'use client';

import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface AppButtonProps {
	label?: string;
	children?: React.ReactNode;
	href?: string;
	onClick?: () => void;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	className?: string;
	variant?: 'solid' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

export default function AppButton({
	label,
	children,
	href,
	onClick,
	icon,
	iconPosition = 'right',
	className,
	variant = 'solid',
	size = 'md',
	disabled = false,
	type = 'button',
}: AppButtonProps) {
	const baseStyles =
		'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-5 py-2 text-base',
		lg: 'px-6 py-3 text-lg',
	};

	const variants = {
		solid: 'bg-[#0f4c4c] text-white hover:bg-[#121828] focus:ring-[#0f4c4c]',
		outline:
			'border border-[#0f4c4c] text-[#0f4c4c] hover:bg-[#0f4c4c] hover:text-white focus:ring-[#0f4c4c]',
		ghost: 'text-[#0f4c4c] hover:bg-[#0f4c4c]/10 focus:ring-[#0f4c4c]',
	};

	const classes = clsx(baseStyles, sizes[size], variants[variant], className);

	const content = (
		<>
			{icon && iconPosition === 'left' && icon}
			{label || children}
			{icon && iconPosition === 'right' && icon}
		</>
	);

	if (href) {
		return (
			<Link href={href} className={classes} aria-disabled={disabled}>
				{content}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			className={classes}
			disabled={disabled}>
			{content}
		</button>
	);
}
