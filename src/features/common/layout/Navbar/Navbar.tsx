'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NAV_LINKS = [
	{ href: '/', label: 'Trang chủ' },
	{ href: '/rooms', label: 'Danh sách phòng' },
	{ href: '/facilities', label: 'Tiện ích' },
	{ href: '/contact', label: 'Liên hệ' },
	{ href: '/about-us', label: 'Về chúng tôi' },
];

const Logo = () => (
	<div className='text-2xl lg:text-3xl font-serif font-semibold tracking-tight text-white dark:text-white'>
		VietChill
	</div>
);

const DesktopNav = ({ scrolled }: { scrolled: boolean }) => (
	<nav className='hidden md:flex items-center space-x-6'>
		{NAV_LINKS.map(({ href, label }) => (
			<Link
				key={href}
				href={href}
				className={clsx(
					'text-base font-bold transition-colors duration-300',
					scrolled
						? 'text-gray-900 hover:text-black'
						: 'text-white/90 hover:text-white'
				)}>
				{label}
			</Link>
		))}
	</nav>
);

const AuthButtons = ({
	scrolled,
	onClick,
}: {
	scrolled: boolean;
	onClick?: () => void;
}) => (
	<div className='flex items-center space-x-3 flex-col md:flex-row md:space-x-3 md:space-y-0 space-y-3'>
		{/* Login Button */}
		<Link
			href='/login'
			onClick={onClick}
			className={clsx(
				'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border shadow-sm',
				'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
				scrolled
					? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-800'
					: 'border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white'
			)}>
			Đăng nhập
		</Link>

		{/* Sign Up Button */}
		<Link
			href='/sign-up'
			onClick={onClick}
			className={clsx(
				'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md',
				'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
				scrolled
					? 'bg-[#0f4c4c] text-white hover:bg-[#0c3d3d] focus:ring-[#0f4c4c]'
					: 'bg-white text-[#0f4c4c] hover:bg-gray-100 focus:ring-white'
			)}>
			Đăng ký
		</Link>
	</div>
);

const MobileMenu = ({ onClose }: { onClose: () => void }) => (
	<div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-end'>
		<div className='w-3/4 sm:w-2/5 h-full bg-white shadow-lg p-6 space-y-6 transition-transform duration-300 ease-out'>
			<button
				className='self-end mb-4 text-gray-500 hover:text-gray-900'
				onClick={onClose}
				aria-label='Close menu'>
				✕
			</button>
			<nav className='flex flex-col gap-4'>
				{NAV_LINKS.map(({ href, label }) => (
					<Link
						key={href}
						href={href}
						onClick={onClose}
						className='text-gray-800 hover:text-black text-base font-semibold'>
						{label}
					</Link>
				))}
			</nav>
			<div className='mt-6'>
				<AuthButtons scrolled={true} onClick={onClose} />
			</div>
		</div>
	</div>
);

const Navbar: React.FC = () => {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	const isHome = pathname === '/' || pathname === '/home';

	// 🔑 Handle scroll + pathname changes
	useEffect(() => {
		if (!isHome) {
			setScrolled(true); // force "scrolled look"
			return;
		}

		const handleScroll = () => setScrolled(window.scrollY > 20);
		handleScroll(); // ✅ run once on mount/path change
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [isHome]);

	// Disable body scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
	}, [mobileOpen]);

	return (
		<header
			className={clsx(
				'fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 ease-in-out',
				scrolled
					? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-sm'
					: 'bg-transparent border-transparent'
			)}>
			<div
				className={clsx(
					'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ease-in-out',
					scrolled ? 'py-3' : 'py-5'
				)}>
				<Logo />
				<DesktopNav scrolled={scrolled} />
				<div className='hidden md:flex'>
					<AuthButtons scrolled={scrolled} />
				</div>

				{/* Mobile button */}
				<button
					className='md:hidden text-white'
					onClick={() => setMobileOpen(!mobileOpen)}
					aria-label='Toggle menu'>
					<svg
						className='h-6 w-6'
						fill='none'
						stroke='currentColor'
						strokeWidth={2}
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M4 6h16M4 12h16M4 18h16'
						/>
					</svg>
				</button>
			</div>

			{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
		</header>
	);
};

export default Navbar;
