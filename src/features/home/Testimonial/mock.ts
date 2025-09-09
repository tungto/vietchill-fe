// lib/mockTestimonials.ts
import { TestimonialResponse } from '@/types/vietstay/testimonial';

export const mockTestimonials: TestimonialResponse = {
  success: true,
  data: [
    {
      id: 1,
      name: 'Emma Rodriguez',
      avatar: '/images/users/user-4.jpg',
      rating: 4,
      content:
        "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that VietStay provides. Their curated selection of hotels is unmatched.",
    },
    {
      id: 2,
      name: 'John Carter',
      avatar: '/images/users/user-2.jpg',
      rating: 5,
      content:
        'Booking with VietStay was seamless and stress-free. Highly recommend to anyone looking for quality stays!',
    },
    {
      id: 3,
      name: 'Vân Nguyễn',
      avatar: '/images/users/user-3.jpg',
      rating: 5,
      content:
        'Đặt phòng với VietStay thật dễ dàng và thoải mái. Rất khuyến khích cho bất kỳ ai đang tìm kiếm một kỳ nghỉ chất lượng!',
    },
  ],
};
