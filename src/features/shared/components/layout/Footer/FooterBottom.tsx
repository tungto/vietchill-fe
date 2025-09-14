import React from 'react';
import { bottomLinks } from './constant';

const FooterBottom = () => (
	<div className='mt-10  border-t border-gray-200 pt-6 text-sm text-gray-500 text-center flex justify-center gap-6 '>
		<span>© 2025 VietStay. All rights reserved.</span>
		{bottomLinks.map(({ label, href }) => (
			<a
				key={label}
				href={href}
				className='hover:text-gray-900 transition-colors'>
				{label}
			</a>
		))}
	</div>
);

export default FooterBottom;
