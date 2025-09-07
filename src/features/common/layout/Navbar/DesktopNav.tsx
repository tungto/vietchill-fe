import Link from 'next/link';
import clsx from 'clsx';
import { NAV_LINKS } from '@/lib/routes';

export default function DesktopNav({ scrolled }: { scrolled: boolean }) {
	return (
		<nav className='hidden md:flex items-center space-x-6'>
			{NAV_LINKS.map(({ href, label }) => (
				<Link
					key={href}
					href={href}
					className={clsx(
						'text-base font-bold transition-colors duration-300',
						scrolled
							? 'text-gray-900 hover:text-black'
							: 'text-white/90 hover:text-white'
					)}>
					{label}
				</Link>
			))}
		</nav>
	);
}
