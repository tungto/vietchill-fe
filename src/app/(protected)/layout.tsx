import { requireAuth } from '@/lib/api/authGuard';

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const profile = await requireAuth();

	console.log('======');

	// You could also wrap with a context provider if you want profile everywhere
	return (
		<div>
			<header className='p-4 bg-gray-100 border-b'>
				<p>Welcome, {profile.name}</p>
			</header>
			<main>{children}</main>
		</div>
	);
}
