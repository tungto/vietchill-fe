import Sidebar from '@/features/admin/Sidebar';

// app/admin/dashboard/page.tsx
export default function DashboardPage() {
	return (
		<Sidebar>
			<h2 className='text-2xl font-bold mb-4'>Bảng theo dõi</h2>
			<p>Welcome to the admin dashboard!</p>
		</Sidebar>
	);
}
