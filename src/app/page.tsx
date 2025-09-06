import Banner from '@/features/home/Banner';
import BookingForm from '@/features/home/BookingForm/BookingForm';
import Facilities from '@/features/home/Facilities/HomepageFacilities';
import HomeSection from '@/features/home/HomeSection/HomeSection';
import RoomTypes from '@/features/home/RoomTypes/RoomTypes';
import StayInspired from '@/features/home/StayInspired';
import Testimonials from '@/features/home/Testimonial/Testimonials';
import { Box } from '@mui/material';

export default function Home() {
	return (
		<Box className='homepage'>
			<Banner>
				<BookingForm />
			</Banner>
			<HomeSection
				title='Danh sách phòng'
				cta={{ label: 'View All Destinations', href: '/rooms' }}
				subtitle='Discover our handpicked selection of exceptional properties
					around the world, offering unparalleled luxury and
					unforgettable experiences.'
				cl='bg-slate-50'>
				<RoomTypes />
			</HomeSection>
			<HomeSection
				title='Tiện ích khách sạn'
				cta={{ label: 'View More', href: '/facilities' }}>
				<Facilities />
			</HomeSection>

			<HomeSection
				title='What Our Guests Say'
				subtitle='Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.'
				cta={{ label: 'View More', href: '/facilities' }}
				cl='bg-slate-50'>
				<Testimonials />
			</HomeSection>

			<HomeSection>
				<StayInspired />
			</HomeSection>
		</Box>
	);
}
