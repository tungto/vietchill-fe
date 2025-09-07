import Image from 'next/image';
import { Divider } from '@mui/material';
import { Booking } from '@/types/vietstay/booking';
import BookingStatusBadge from './BookingStatusBadge';

export default function BookingCard({ booking }: { booking: Booking }) {
	const thumbnail =
		booking.room_type.images.find((img) => img.is_thumbnail)?.path ||
		'placeholder.png';

	const checkIn = new Date(booking.check_in_date).toLocaleDateString();
	const checkOut = new Date(booking.check_out_date).toLocaleDateString();
	const createdAt = new Date(booking.created_at).toLocaleDateString();

	const formattedPrice = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(booking.total_price);

	return (
		<li className='flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300'>
			<div className='relative w-full md:w-1/3 aspect-[4/3] flex-shrink-0'>
				<Image
					src={`/images/rooms/${thumbnail}`}
					alt={booking.room_type.name}
					fill
					className='object-cover'
					sizes='(min-width: 768px) 33vw, 100vw'
					priority
				/>
			</div>

			<div className='flex flex-col flex-grow p-5 space-y-3 md:w-2/3'>
				<div className='flex justify-between items-center'>
					<h2 className='text-xl font-semibold text-gray-900'>
						{booking.room_type.name}
					</h2>
					<BookingStatusBadge status={booking.status} />
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-6 text-gray-600 text-base'>
					<p>
						Check-in: <strong>{checkIn}</strong>
					</p>
					<p>
						Check-out: <strong>{checkOut}</strong>
					</p>

					<p>
						Guests: <strong>{booking.adult}</strong> adult
						{booking.adult > 1 ? 's' : ''},{' '}
						<strong>{booking.children}</strong> children
					</p>

					<p>Phone: {booking.phone}</p>

					<p>
						Booked on: <strong>{createdAt}</strong>
					</p>
				</div>

				<p className='text-lg font-semibold text-gray-900'>
					{formattedPrice}
				</p>

				<Divider />

				{booking.review ? (
					<div className='text-gray-700 text-base pt-2'>
						<strong>Review:</strong>{' '}
						{booking.review.review || 'No review text'}
						<br />
						<strong>Rating:</strong> {booking.review.rating} / 5
					</div>
				) : (
					<div className='italic text-gray-400 text-base pt-2'>
						No review yet
					</div>
				)}
			</div>
		</li>
	);
}
