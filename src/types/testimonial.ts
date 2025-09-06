// types/testimonial.ts
export type Testimonial = {
	id: number;
	name: string;
	avatar: string;
	rating: number; // from 1–5
	content: string;
};

export type TestimonialResponse = {
	success: boolean;
	data: Testimonial[];
};
