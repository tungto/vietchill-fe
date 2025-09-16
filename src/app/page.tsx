import Banner from '@/features/vietstay/rooms/components/Banner';
import BookingForm from '@/features/vietstay/rooms/components/BookingForm/BookingForm';
import Facilities from '@/features/vietstay/rooms/components/Facilities/HomepageFacilities';
import HomeSection from '@/features/vietstay/rooms/components/HomeSection/HomeSection';
import RoomTypes from '@/features/vietstay/rooms/components/RoomTypes/RoomTypes';
import Testimonials from '@/features/vietstay/rooms/components/Testimonial/Testimonials';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box className='homepage'>
      <Banner>
        <BookingForm />
      </Banner>
      <HomeSection
        title='Danh sách phòng'
        cta={{ label: 'Xem tất cả', href: '/vietstay/rooms' }}
        subtitle='Không gian nghỉ dưỡng đẳng cấp với thiết kế tinh tế và tiện nghi hiện đại..'
        cl='bg-slate-50'
      >
        <RoomTypes />
      </HomeSection>
      <HomeSection
        title='Tiện ích khách sạn'
        cta={{ label: 'Xem thêm', href: '/vietstay/facilities' }}
      >
        <Facilities />
      </HomeSection>

      <HomeSection
        title='Khách Hàng Nói Gì Về Chúng Tôi'
        subtitle='Khám phá lý do vì sao những du khách sành điệu luôn tin tưởng lựa chọn VietStay cho các kỳ nghỉ sang trọng và độc quyền trên khắp thế giới.'
        cta={{ label: 'Xem thêm', href: '/vietstay/about' }}
        cl='bg-slate-50'
      >
        <Testimonials />
      </HomeSection>
    </Box>
  );
}
