import Link from 'next/link';
import React from 'react';

export interface BookingInfo {
	hotelName: string;
	checkInDate: string;
	checkOutDate: string;
	guests: number;
}

interface SuccessModalProps {
	isOpen: boolean;
	onClose: () => void;
	bookingInfo: BookingInfo;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
	isOpen,
	onClose,
	bookingInfo,
}) => {
	if (!isOpen) return null;

	return (
		<>
			{/* Overlay */}
			<div
				className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  opacity-90'
				onClick={onClose}
			/>

			{/* Modal */}
			<div className='fixed inset-0 flex items-center justify-center z-50 pointer-events-none'>
				<div
					className='bg-white rounded-lg shadow-lg max-w-md w-full p-6 pointer-events-auto'
					onClick={(e) => e.stopPropagation()}>
					<h2 className='text-2xl font-bold mb-4 text-green-600'>
						Booking Successful!
					</h2>
					<p className='mb-2'>Thank you for booking with us.</p>
					<div className='mb-4'>
						<p>
							<strong>Hotel:</strong> {bookingInfo.hotelName}
						</p>
						<p>
							<strong>Check-in:</strong> {bookingInfo.checkInDate}
						</p>
						<p>
							<strong>Check-out:</strong>{' '}
							{bookingInfo.checkOutDate}
						</p>
						<p>
							<strong>Guests:</strong> {bookingInfo.guests}
						</p>
					</div>
					<Link
						href='/'
						onClick={onClose}
						className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mr-auto'>
						Về Trang Chủ
					</Link>
				</div>
			</div>
		</>
	);
};
