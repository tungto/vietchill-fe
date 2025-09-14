'use client';

import { useAuth } from '@/features/vietstay/auth/components/AuthContext';
import { useAuthActions } from '@/features/shared/hooks/useAuthActions';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import AuthButtons from './AuthButtons';
import DesktopNav from './DesktopNav';
import DesktopNavActions from './LoggedInButtons';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useBodyLock, useScrollState } from './hooks';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { logout } = useAuthActions();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === '/' || pathname === '/home';
  const scrolled = useScrollState(isHome);
  useBodyLock(mobileOpen);

  console.log('mobileOpen', mobileOpen);

  const isLoggedIn = !!user;

  return (
    <>
      {/* HEADER */}
      <header
        className={clsx(
          'fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 ease-in-out',
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-sm'
            : 'bg-transparent border-transparent',
        )}
      >
        <div
          className={clsx(
            'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ease-in-out',
            scrolled ? 'py-3' : 'py-5',
          )}
        >
          <Logo scrolled={scrolled} />
          <DesktopNav scrolled={scrolled} />

          <div className='hidden md:flex min-w-[140px] justify-end'>
            {loading ? (
              <div className='w-24 h-6 bg-gray-200 rounded animate-pulse' />
            ) : isLoggedIn ? (
              <DesktopNavActions
                scrolled={scrolled}
                logout={logout}
                user={user}
              />
            ) : (
              <AuthButtons scrolled={scrolled} />
            )}
          </div>

          {/* Hamburger */}
          <button
            className={clsx(
              'md:hidden cursor-pointer',
              scrolled ? 'text-gray-900' : 'text-white',
            )}
            onClick={() => setMobileOpen(true)}
            aria-label='Toggle menu'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OUTSIDE HEADER */}
      {mobileOpen && (
        <MobileMenu
          onClose={() => setMobileOpen(false)}
          scrolled={scrolled}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={logout}
        />
      )}
    </>
  );
};

export default Navbar;
