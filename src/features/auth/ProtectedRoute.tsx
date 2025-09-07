'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated === false) {
			router.replace('/login');
		}
	}, [isAuthenticated, router]);

	if (isAuthenticated === null) {
		// still checking auth (e.g. loading from storage)
		return (
			<div className='p-6 text-center'>Checking authentication...</div>
		);
	}

	if (!isAuthenticated) return null;

	return <>{children}</>;
}
