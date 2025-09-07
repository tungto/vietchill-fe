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
				cta={{ label: 'View All Rooms', href: '/rooms' }}
				subtitle='Không gian nghỉ dưỡng đẳng cấp với thiết kế tinh tế và tiện nghi hiện đại..'
				cl='bg-slate-50'>
				<RoomTypes />
			</HomeSection>
			<HomeSection
				title='Tiện ích khách sạn'
				cta={{ label: 'View More', href: '/facilities' }}>
				<Facilities />
			</HomeSection>

			<HomeSection
				title='Khách Hàng Nói Gì Về Chúng Tôi'
				subtitle='Khám phá lý do vì sao những du khách sành điệu luôn tin tưởng lựa chọn VietStay cho các kỳ nghỉ sang trọng và độc quyền trên khắp thế giới.'
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
