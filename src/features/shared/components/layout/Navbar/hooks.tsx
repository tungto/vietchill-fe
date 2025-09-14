import { useEffect, useState } from 'react';

export function useScrollState(isHome: boolean) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (!isHome) {
			setScrolled(true);
			return;
		}
		const handleScroll = () => setScrolled(window.scrollY > 20);
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isHome]);

	return scrolled;
}

export function useBodyLock(lock: boolean) {
	useEffect(() => {
		document.body.style.overflow = lock ? 'hidden' : 'auto';
	}, [lock]);
}
