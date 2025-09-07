import { Booking } from '@/types/booking';
import { cookies } from 'next/headers';
import axios from 'axios';
import BookingCard from './BookingCard';

async function getBookings(): Promise<Booking[]> {
	const cookieStore = cookies();
	const token = (await cookieStore).get('auth_token')?.value;

	if (!token) {
		throw new Error('No auth token found');
	}

	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/bookings`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const json = response.data;

	if (!json.success) {
		throw new Error(json.message || 'Error loading bookings');
	}

	return json.data;
}

export default async function BookingsPage() {
	let bookings: Booking[] = [];

	try {
		bookings = await getBookings();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return (
			<div className='p-6 max-w-5xl mx-auto mt-16'>
				<h1 className='text-3xl font-bold mb-6'>Booking History</h1>
				<p className='text-red-600'>
					Error loading bookings: {error.message}
				</p>
			</div>
		);
	}

	if (bookings.length === 0) {
		return (
			<div className='p-6 max-w-5xl mx-auto mt-16'>
				<h1 className='text-3xl font-bold mb-6'>Booking History</h1>
				<p className='text-gray-500'>No bookings found.</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-5xl mx-auto'>
				<h1 className='text-3xl font-bold mb-10 text-gray-900'>
					Booking History
				</h1>
				<ul className='space-y-8'>
					{bookings.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))}
				</ul>
			</div>
		</div>
	);
}
