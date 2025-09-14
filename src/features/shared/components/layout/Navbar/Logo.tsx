import clsx from 'clsx';
import Link from 'next/link';

export default function Logo({ scrolled }: { scrolled: boolean }) {
	return (
		<Link
			href='/'
			className={clsx(
				'text-2xl lg:text-3xl font-serif font-semibold tracking-tight transition-colors duration-300',
				scrolled
					? 'text-gray-900 hover:text-black'
					: 'text-white/90 hover:text-white'
			)}>
			VietStay
		</Link>
	);
}
