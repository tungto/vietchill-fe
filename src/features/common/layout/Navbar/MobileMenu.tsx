'use client';

import Link from 'next/link';
import { Profile } from '@/types';
import { NAV_LINKS } from './constants';
import AuthButtons from './AuthButtons';
import {
	FaTimes,
	FaUserCircle,
	FaHistory,
	FaSignOutAlt,
	FaHome,
	FaHotel,
	FaBed,
} from 'react-icons/fa';
import { JSX } from 'react';
import {
	MdContactMail,
	MdInfoOutline,
	MdMiscellaneousServices,
} from 'react-icons/md';

interface MobileMenuProps {
	onClose: () => void;
	scrolled: boolean;
	isLoggedIn: boolean;
	user?: Profile | null;
	onLogout: () => void;
}

const navIcons: Record<string, JSX.Element> = {
	'/': <FaHome className='inline-block mr-2' />,
	'/hotels': <FaHotel className='inline-block mr-2' />,
	'/rooms': <FaBed className='inline-block mr-2' />,
	'/bookings': <FaHistory className='inline-block mr-2' />,
	'/facilities': <MdMiscellaneousServices className='inline-block mr-2' />,
	'/contact': <MdContactMail className='inline-block mr-2' />,
	'/about': <MdInfoOutline className='inline-block mr-2' />,
};

export default function MobileMenu({
	onClose,
	scrolled,
	isLoggedIn,
	user,
	onLogout,
}: MobileMenuProps) {
	return (
		<div className='fixed inset-0 z-[999] flex'>
			{/* BACKDROP */}
			<div
				className='flex-1 bg-black/60 backdrop-blur-sm'
				onClick={onClose}
			/>

			{/* SIDEBAR */}
			<div
				className='w-3/4 sm:w-2/5 h-full bg-white shadow-lg p-6 space-y-6 transition-transform duration-300 ease-out'
				onClick={(e) => e.stopPropagation()}>
				{/* Close button */}
				<button
					className='self-end mb-4 text-gray-500 hover:text-gray-900'
					onClick={onClose}
					aria-label='Close menu'>
					<FaTimes size={20} />
				</button>

				{/* Navigation links */}
				<nav className='flex flex-col gap-4'>
					{NAV_LINKS.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={onClose}
							className='text-gray-800 hover:text-black text-base font-semibold flex items-center'>
							{navIcons[href] ?? null}
							{label}
						</Link>
					))}
				</nav>

				{/* Auth Section */}
				<div className='mt-6'>
					{isLoggedIn ? (
						<div className='flex flex-col space-y-3'>
							<Link
								href='/profile'
								className='flex items-center text-gray-700 font-semibold hover:text-gray-900'
								onClick={onClose}>
								<FaUserCircle className='mr-2' />
								{user?.name || user?.email}
							</Link>

							<Link
								href='/bookings'
								className='flex items-center font-bold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors'
								onClick={onClose}>
								<FaHistory className='mr-2' />
								Booking History
							</Link>

							<button
								onClick={() => {
									onLogout();
									onClose();
								}}
								className='flex items-center justify-center gap-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm'>
								<FaSignOutAlt />
								Logout
							</button>
						</div>
					) : (
						<AuthButtons scrolled={scrolled} onClick={onClose} />
					)}
				</div>
			</div>
		</div>
	);
}
