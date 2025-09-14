import Link from 'next/link';
import React, { ReactNode } from 'react';

type CTA = {
	href: string;
	label: string;
};

type HomeSectionProps = {
	title?: string;
	subtitle?: string;
	children?: ReactNode;
	cta?: CTA;
	cl?: string;
};

const HomeSection: React.FC<HomeSectionProps> = ({
	title,
	subtitle,
	children,
	cta,
	cl,
}) => {
	return (
		<section
			className={`flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 ${cl}`}>
			{title && (
				<div className='flex flex-col justify-center items-center text-center px-4 mb-16'>
					<h1 className='text-4xl md:text-5xl font-playfair font-semibold tracking-tight text-gray-900 font-serif'>
						{title}
					</h1>

					{subtitle && (
						<p className='mt-4 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed'>
							{subtitle}
						</p>
					)}
				</div>
			)}

			{children}

			{cta && (
				<Link
					href={cta.href}
					className='mt-16 mb-6 inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-gray-800 bg-white/70 rounded-xl shadow-sm backdrop-blur-sm hover:bg-white/90 hover:shadow-md transition-all duration-300'>
					{cta.label}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'
						className='w-5 h-5'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</Link>
			)}
		</section>
	);
};

export default HomeSection;
