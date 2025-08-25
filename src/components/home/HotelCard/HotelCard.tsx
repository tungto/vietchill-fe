'use client';
import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	Box,
} from '@mui/material';
import { Star, LocationOn } from '@mui/icons-material';

export interface Hotel {
	id: number;
	image: string;
	title: string;
	rating: number;
	location: string;
	price: number;
	badge?: string;
}

interface HotelCardProps extends Hotel {
	onBook: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({
	image,
	title,
	rating,
	location,
	price,
	badge,
	onBook,
}) => {
	return (
		<Card elevation={3} className='rounded-2xl overflow-hidden w-80 shadow'>
			{/* Image Section */}
			<Box className='relative'>
				<CardMedia
					component='img'
					height='180'
					image={image}
					alt={title}
				/>
				{badge && (
					<Box className='absolute top-3 left-3 bg-white text-xs font-semibold px-3 py-1 rounded-full shadow'>
						{badge}
					</Box>
				)}
			</Box>

			{/* Content Section */}
			<CardContent>
				<Box className='flex items-center justify-between'>
					<Typography variant='h6' className='font-bold'>
						{title}
					</Typography>
					<Box className='flex items-center text-orange-500'>
						<Star fontSize='small' />
						<Typography
							variant='body2'
							className='ml-1 font-semibold'>
							{rating}
						</Typography>
					</Box>
				</Box>

				<Box className='flex items-center text-gray-500 mt-1'>
					<LocationOn fontSize='small' />
					<Typography variant='body2' className='ml-1'>
						{location}
					</Typography>
				</Box>

				<Box className='flex items-center justify-between mt-4'>
					<Typography variant='h6' className='font-bold'>
						${price}
						<span className='text-gray-500 text-sm font-normal'>
							/night
						</span>
					</Typography>
					<Button
						variant='outlined'
						className='rounded-lg normal-case'
						onClick={onBook}>
						Book Now
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default HotelCard;
