'use client';
// components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
	return (
		<AppBar
			position='static'
			elevation={0}
			sx={{
				backgroundColor: 'white',
				color: 'black',
				borderBottom: '1px solid #e5e7eb', // Tailwind's border-gray-200
			}}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* Left side - Logo */}
				<Typography
					variant='h6'
					component='div'
					sx={{ fontWeight: 'bold', fontFamily: 'serif' }}>
					VietChill
				</Typography>

				{/* Middle - Navigation Links */}
				<Box
					sx={{
						display: 'flex',
						gap: 3,
						color: 'gray',
						fontSize: '0.95rem',
					}}>
					<Button sx={{ color: 'inherit', textTransform: 'none' }}>
						Trang chủ
					</Button>
					<Button sx={{ color: 'inherit', textTransform: 'none' }}>
						Danh sách phòng
					</Button>
					<Button sx={{ color: 'inherit', textTransform: 'none' }}>
						Tiện ích
					</Button>
					<Button sx={{ color: 'inherit', textTransform: 'none' }}>
						Liên hệ
					</Button>
					<Button sx={{ color: 'inherit', textTransform: 'none' }}>
						Về chúng tôi
					</Button>
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
