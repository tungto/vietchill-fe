import Box from '@mui/material/Box';
import Image from 'next/image';
import BookingForm from '../home/BookingForm/BookingForm';

const Banner = () => {
	return (
		<Box
			className='banner z-1 mb-30'
			sx={{
				position: 'relative',
				width: '100%',
				height: { xs: '60vh', md: '70vh' },
				// overflow: 'hidden',
			}}>
			<Image
				src='/images/carousel/1.png'
				alt='banner'
				fill
				priority
				style={{
					objectFit: 'cover',
					objectPosition: 'center',
				}}
			/>
			<Box className='p-30 absolute text-white w-full'>
				<p
					className='px-3.5 py-1 rounded-full mt-20 text-sm font-semibold w-60'
					style={{ backgroundColor: '#49b9ff80' }}>
					The Ultimate Hotel Experience
				</p>
				<h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-3xl mt-4 '>
					Discover Your Perfect Gateway Destination
				</h1>
				<p className='max-w-130 mt-2 text-sm md:text-base'>
					{`Unparalleled luxury and comfort await at the world's most
					exclusive hotels and resorts. Start your journey today.`}
				</p>
				<BookingForm />
			</Box>
		</Box>
	);
};

export default Banner;
