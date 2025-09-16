// app/components/TestimonialCard.tsx
import Image from 'next/image';
import { Rating } from '@mui/material';
import { Testimonial } from '../../types/testimonial';

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className='bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col h-full'>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={48}
          height={48}
          className='rounded-full object-cover'
        />
        <div>
          <p className='font-semibold text-gray-900 text-base sm:text-lg'>
            {testimonial.name}
          </p>
          <Rating
            name='read-only'
            value={testimonial.rating}
            readOnly
            size='small'
          />
        </div>
      </div>

      <div className='flex-grow'>
        <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
          {testimonial.content}
        </p>
      </div>
    </div>
  );
}
