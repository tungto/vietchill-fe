// components/Rating.tsx
import React from 'react';

export default function Rating({ value = 4.5 }: { value?: number }) {
	const full = Math.floor(value);
	const half = value - full >= 0.5;
	const stars = Array.from({ length: 5 }).map((_, i) => {
		if (i < full) return 'full';
		if (i === full && half) return 'half';
		return 'empty';
	});

	return (
		<div className='flex items-center space-x-2 text-orange-500'>
			<div className='flex'>
				{stars.map((s, i) => (
					<svg
						key={i}
						className='w-5 h-5'
						viewBox='0 0 24 24'
						fill={s === 'full' ? 'currentColor' : 'none'}
						stroke='currentColor'>
						<path
							strokeWidth='1.2'
							d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
						/>
						{s === 'half' && (
							<path
								d='M12 2v15.27L5.82 21l1.64-7.03L2 9.24l7.19-.61L12 2z'
								fill='currentColor'
							/>
						)}
					</svg>
				))}
			</div>
			<div className='text-sm text-gray-600'>200+ reviews</div>
		</div>
	);
}
