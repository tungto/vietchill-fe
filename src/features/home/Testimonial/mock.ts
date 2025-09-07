// lib/mockTestimonials.ts
import { TestimonialResponse } from '@/types/testimonial';

export const mockTestimonials: TestimonialResponse = {
	success: true,
	data: [
		{
			id: 1,
			name: 'Emma Rodriguez',
			avatar: '/images/users/chill-guy.png',
			rating: 4,
			content:
				"I've used many booking platforms before, but none compare to the personalized experience and attention to detail that VietStay provides. Their curated selection of hotels is unmatched.",
		},
		{
			id: 2,
			name: 'John Carter',
			avatar: '/images/users/chill-guy.png',
			rating: 5,
			content:
				'Booking with VietStay was seamless and stress-free. Highly recommend to anyone looking for quality stays!',
		},
		{
			id: 3,
			name: 'John Carter',
			avatar: '/images/users/chill-guy.png',
			rating: 5,
			content:
				'Booking with VietStay was seamless and stress-free. Highly recommend to anyone looking for quality stays!',
		},
	],
};
