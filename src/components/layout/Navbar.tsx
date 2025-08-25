'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const Navbar: React.FC = () => {
	return (
		<AppBar
			position='sticky'
			elevation={0}
			sx={{
				backgroundColor: 'white',
				color: 'black',
				borderBottom: '1px solid #e5e7eb', // Tailwind's border-gray-200
			}}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Typography
					variant='h6'
					component='div'
					sx={{ fontWeight: 'bold', fontFamily: 'serif' }}>
					VietChill
				</Typography>

				<Box
					sx={{
						display: 'flex',
						gap: 3,
						color: 'gray',
						fontSize: '0.95rem',
					}}>
					<Link href={'/'}>Trang chủ</Link>
					<Link href='/rooms'>Danh sách phòng</Link>
					<Link href='/facilities'>Tiện ích</Link>
					<Link href='/contact'>Liên hệ</Link>
					<Link href='/about-us'>Về chúng tôi</Link>
				</Box>

				{/* Right side - Auth Buttons */}
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button
						variant='outlined'
						sx={{
							textTransform: 'none',
							borderRadius: '6px',
							borderColor: '#000',
							color: '#000',
							'&:hover': {
								backgroundColor: '#f5f5f5',
								borderColor: '#000',
							},
						}}>
						Đăng nhập
					</Button>
					<Button
						variant='outlined'
						sx={{
							textTransform: 'none',
							borderRadius: '6px',
							borderColor: '#000',
							color: '#000',
							'&:hover': {
								backgroundColor: '#f5f5f5',
								borderColor: '#000',
							},
						}}>
						Đăng ký
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
