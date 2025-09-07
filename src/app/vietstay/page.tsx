'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
	const router = useRouter();
	useEffect(() => {
		router.push('/');
	});

	return <div>page</div>;
};

export default Page;
