'use client';

import { Profile } from '@/types/vietstay';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function DesktopNavActions({
  scrolled,
  user,
  logout,
}: {
  scrolled: boolean;
  user: Profile;
  logout: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // No need for document listener now, we control hover state on container div

  return (
    <div className='hidden md:flex items-center space-x-6'>
      {/* Container wraps both button and dropdown to fix flicker */}
      <div
        ref={containerRef}
        className='relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Trigger button */}
        <button
          type='button'
          className={clsx(
            'flex items-center space-x-2 cursor-pointer select-none p-2',
            scrolled ? 'text-gray-900' : 'text-white/90',
            'transition-colors duration-300 font-semibold focus:outline-none'
          )}
        >
          {/* Avatar with gradient ring */}
          <div className='relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#0f2e2e] via-[#235555] to-[#1a3f3f] shadow-md'>
            <Image
              src={
                user?.avatar
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.avatar}`
                  : '/default-avatar.png'
              }
              alt='User Avatar'
              className='rounded-full object-cover'
              fill
              sizes='40px'
            />
          </div>

          {/* Username */}
          <span>{user?.name || user?.email}</span>

          {/* Dropdown arrow */}
          <svg
            className={clsx(
              'w-4 h-4 mt-[2px] transition-transform duration-300',
              isHovered ? 'rotate-180' : 'rotate-0'
            )}
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        <div
          className={clsx(
            'absolute right-0   mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/10 z-20 overflow-hidden origin-top-right top-12',
            'isolate',
            isHovered
              ? 'opacity-100 scale-100 pointer-events-auto transition ease-out duration-200'
              : 'opacity-0 scale-95 pointer-events-none transition ease-in duration-150'
          )}
        >
          <Link
            href='/vietstay/profile'
            className='font-bold block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors'
          >
            Trang cá nhân
          </Link>
          <Link
            href='/vietstay/bookings'
            className='font-bold block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors'
          >
            Lịch sử đặt phòng
          </Link>
          <button
            onClick={logout}
            className='font-bold block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 cursor-pointer transition-colors'
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
