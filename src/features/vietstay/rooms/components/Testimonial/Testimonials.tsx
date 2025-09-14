import React from 'react';
import TestimonialCard from './TestimonialCard';
import { mockTestimonials } from './mock';

const Testimonials = () => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
			{mockTestimonials.data.map((t) => (
				<TestimonialCard key={t.id} testimonial={t} />
			))}
		</div>
	);
};

export default Testimonials;
