import React from 'react';

const FooterLinks = ({
	title,
	links,
}: {
	title: string;
	links: { label: string; href: string }[];
}) => (
	<div>
		<h3 className='font-semibold text-gray-900 mb-3 uppercase text-sm'>
			{title}
		</h3>
		<ul className='space-y-2 text-sm text-gray-600'>
			{links.map(({ label, href }) => (
				<li key={label}>
					<a
						href={href}
						className='hover:text-gray-900 transition-colors'>
						{label}
					</a>
				</li>
			))}
		</ul>
	</div>
);

export default FooterLinks;
