'use client';

import HotelCard from '@/components/home/HotelCard/HotelCard';
import { Box } from '@mui/material';
import { hotels } from './mock';

export default function Home() {
	return (
		<Box className='homepage'>
			<Box className='p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{hotels.map((hotel) => (
					<HotelCard
						key={hotel.id}
						{...hotel}
						onBook={() => alert(`Booking ${hotel.title}`)}
					/>
				))}
			</Box>
		</Box>
	);
}
