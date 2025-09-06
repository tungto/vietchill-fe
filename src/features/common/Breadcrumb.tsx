'use client';

import { Home } from '@mui/icons-material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function formatSegment(segment: string) {
	return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);

	const crumbs = segments.map((seg, idx) => {
		const href = '/' + segments.slice(0, idx + 1).join('/');
		return { label: formatSegment(seg), href };
	});

	return (
		<nav
			aria-label='Breadcrumb'
			className='flex items-center space-x-2 text-sm font-medium'>
			{/* Home Icon */}
			<Link
				href='/'
				className='flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors'>
				<Home className='h-4 w-4' />
				<span className='hidden sm:inline'>Trang chủ</span>
			</Link>

			{crumbs.map((crumb, idx) => {
				const isLast = idx === crumbs.length - 1;

				return (
					<div key={idx} className='flex items-center space-x-2'>
						<ChevronRight className='h-4 w-4 text-gray-400' />

						{isLast ? (
							<span className='px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'>
								{crumb.label}
							</span>
						) : (
							<Link
								href={crumb.href}
								className='text-gray-500 hover:text-blue-600 transition-colors'>
								{crumb.label}
							</Link>
						)}
					</div>
				);
			})}
		</nav>
	);
}
