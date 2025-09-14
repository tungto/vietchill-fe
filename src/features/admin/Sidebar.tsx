'use client'; // Mark this file as a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  // pathname: string; // Add pathname as a prop
  children: React.ReactNode;
}

const getLinkClass = (pathname: string, link: string): string => {
  return pathname === link ? 'bg-blue-700' : 'hover:bg-blue-700';
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname using usePathname()
  return (
    <div className='flex w-full min-h-screen'>
      {/* Sidebar */}
      <aside className='sticky top-0 flex flex-col min-w-64 h-screen p-4 text-white bg-gray-900'>
        <h1 className='mb-6 text-xl font-bold'>VietStay</h1>

        <nav className='flex flex-col gap-5'>
          {/* Dashboard Link */}
          <Link
            href='/admin'
            className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
              pathname,
              '/admin',
            )}`}
          >
            Bảng theo dõi
          </Link>

          {/* Bookings Link (with a dropdown) */}
          <details className='group'>
            <summary className='py-2 transition-all duration-200 cursor-pointer hover:text-blue-400'>
              Quản lý đặt phòng
            </summary>
            <div className='flex flex-col gap-2 ml-3 text-sm'>
              <Link
                href='/admin/bookings'
                className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
                  pathname,
                  '/admin/bookings',
                )}`}
              >
                Danh sách đặt phòng
              </Link>
              <Link
                href='/admin/bookings/statistics'
                className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
                  pathname,
                  '/admin/bookings/statistics',
                )}`}
              >
                Thống kê đặt phòng
              </Link>
            </div>
          </details>

          <Link
            href='/admin/room-types'
            className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
              pathname,
              '/admin/room-types',
            )}`}
          >
            Danh sách loại phòng
          </Link>
          <Link
            href='/admin/rooms'
            className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
              pathname,
              '/admin/rooms',
            )}`}
          >
            Danh sách phòng
          </Link>
          <Link
            href='/admin/features'
            className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
              pathname,
              '/admin/features',
            )}`}
          >
            Không Gian
          </Link>
          <Link
            href='/admin/facilities'
            className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
              pathname,
              '/admin/facilities',
            )}`}
          >
            Tiện Nghi
          </Link>
          <Link
            href='/admin/images'
            className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
              pathname,
              '/admin/images',
            )}`}
          >
            Quản lý hình ảnh
          </Link>
          <Link
            href='/admin/user-queries'
            className={`rounded px-3 py-2 transition-colors duration-200 ${getLinkClass(
              pathname,
              '/admin/user-queries',
            )}`}
          >
            Tin nhắn
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6 bg-gray-50'>{children}</main>
    </div>
  );
};

export default Sidebar;
