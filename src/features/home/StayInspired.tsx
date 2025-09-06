import React from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StayInspired = () => {
	return (
		<Box
			sx={{
				bgcolor: '#121828', // màu nền tối như hình
				borderRadius: 3,
				py: 8,
				px: 25,
				textAlign: 'center',
				maxWidth: 1200,
				mx: 'auto',
				color: '#cfd8dc', // màu chữ nhạt
			}}>
			<Typography
				variant='h4'
				component='h2'
				sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
				Stay Inspired
			</Typography>

			<Typography
				variant='body2'
				sx={{ color: '#7b8794', maxWidth: 600, mx: 'auto', mb: 3 }}>
				Join our newsletter and be the first to discover new
				destinations, exclusive offers, and travel inspiration.
			</Typography>

			<Box
				component='form'
				noValidate
				autoComplete='off'
				sx={{
					display: 'inline-flex',
					gap: 1,
					mb: 2,
					width: '100%',
					maxWidth: 400,
				}}>
				<TextField
					placeholder='Enter your email'
					variant='outlined'
					size='small'
					sx={{
						bgcolor: '#1c2235',
						borderRadius: 1,
						input: { color: '#fff' },
						flexGrow: 1,
					}}
				/>

				<Button
					variant='contained'
					sx={{
						bgcolor: '#000',
						color: '#fff',
						textTransform: 'none',
						fontWeight: 'bold',
						px: 3,
						'&:hover': { bgcolor: '#333' },
					}}
					endIcon={<ArrowForwardIcon />}>
					Subscribe
				</Button>
			</Box>

			<Typography
				variant='caption'
				sx={{ color: '#5a6476', fontSize: 12, display: 'block' }}>
				By subscribing, you agree to our{' '}
				<Link href='#' underline='hover' color='#7b8794'>
					Privacy Policy
				</Link>{' '}
				and consent to receive updates.
			</Typography>
		</Box>
	);
};

export default StayInspired;
