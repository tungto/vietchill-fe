'use client';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { CalendarToday, Person, ChildCare } from '@mui/icons-material';
import { useState } from 'react';
import GuestInput from './NumberInput';

export default function BookingForm() {
	const [adults, setAdults] = useState(2);
	const [children, setChildren] = useState(0);

	return (
		<Box
			component='form'
			className='bg-white p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-5 gap-4 items-end'>
			{/* Check-in */}
			<TextField
				label='Check-in'
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position='start'>
								<CalendarToday />
							</InputAdornment>
						),
					},
				}}
			/>

			{/* Check-out */}
			<TextField
				label='Check-out'
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position='start'>
								<CalendarToday />
							</InputAdornment>
						),
					},
				}}
			/>

			{/* Adults */}
			<GuestInput
				label='Người lớn'
				icon={<Person />}
				value={adults}
				onChange={() => setAdults(Number('e.target.value'))}
			/>

			{/* Children */}
			<GuestInput
				label='Trẻ em'
				icon={<ChildCare />}
				value={children}
				onChange={() => setChildren(Number('e.target.value'))}
			/>

			{/* Submit */}
			<Button
				variant='contained'
				sx={{
					bgcolor: '#49b9ff',
					py: 2,
					fontWeight: 'bold',
					borderRadius: '12px',
					'&:hover': { bgcolor: '#1f8dd6' },
				}}>
				Tìm phòng
			</Button>
		</Box>
	);
}
