import Link from 'next/link';

interface SidebarProps {
	pathname: string; // Add pathname as a prop
	children: React.ReactNode;
}

const getLinkClass = (pathname: string, link: string): string => {
	return pathname === link ? 'bg-blue-700' : 'hover:bg-blue-700';
};

const Sidebar: React.FC<SidebarProps> = ({ children, pathname }) => {
	return (
		<div className='flex min-h-screen'>
			{/* Sidebar */}
			<aside className='w-64 bg-gray-900 text-white flex flex-col p-4'>
				<h1 className='text-xl font-bold mb-6'>VietStay</h1>

				<nav className='flex flex-col gap-5'>
					{/* Dashboard Link */}
					<Link
						href='/admin'
						className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
							pathname,
							'/admin'
						)}`}>
						Bảng theo dõi
					</Link>

					{/* Bookings Link (with a dropdown) */}
					<details className='group'>
						<summary className='cursor-pointer py-2 hover:text-blue-400 transition-all duration-200'>
							Bookings
						</summary>
						<div className='ml-3 flex flex-col gap-2 text-sm'>
							<Link
								href='/admin/bookings/new'
								className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
									pathname,
									'/admin/bookings/new'
								)}`}>
								Lượt đặt phòng mới
							</Link>
							<Link
								href='/admin/bookings/refunds'
								className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
									pathname,
									'/admin/bookings/refunds'
								)}`}>
								Yêu cầu hoàn tiền
							</Link>
							<Link
								href='/admin/bookings/stats'
								className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
									pathname,
									'/admin/bookings/stats'
								)}`}>
								Thống kê đặt phòng
							</Link>
						</div>
					</details>

					{/* Other Links */}
					<Link
						href='/admin/users'
						className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
							pathname,
							'/admin/users'
						)}`}>
						Người dùng
					</Link>
					<Link
						href='/admin/user-queries'
						className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
							pathname,
							'/admin/user-queries'
						)}`}>
						Tin nhắn
					</Link>
					<Link
						href='/admin/reviews'
						className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
							pathname,
							'/admin/reviews'
						)}`}>
						Đánh giá
					</Link>
					<Link
						href='/admin/rooms'
						className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
							pathname,
							'/admin/rooms'
						)}`}>
						Danh sách phòng
					</Link>
					<Link
						href='/admin/facilities'
						className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
							pathname,
							'/admin/facilities'
						)}`}>
						Không Gian và Tiện Nghi
					</Link>
					<Link
						href='/admin/settings'
						className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
							pathname,
							'/admin/settings'
						)}`}>
						Cài đặt trang
					</Link>
				</nav>
			</aside>

			{/* Main Content */}
			<main className='flex-1 bg-gray-50 p-6'>{children}</main>
		</div>
	);
};

export default Sidebar;
