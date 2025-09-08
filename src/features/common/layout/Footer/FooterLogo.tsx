import React from 'react';
import { socialLinks } from './constant';

// Components
const FooterLogo = () => (
  <div className='flex flex-col gap-4 md:max-w-xs'>
    <div className='flex items-center gap-2 font-bold text-xl text-gray-900'>
      <div className='bg-gray-800 rounded p-1'>
        {/* Logo svg */}
        <svg
          className='w-6 h-6 text-white'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7M3 7l9-4 9 4m-9 0v11'
          />
        </svg>
      </div>
      VietStay
    </div>
    <p className='text-sm text-gray-500'>
      Khám phá những nơi lưu trú tuyệt vời nhất thế giới, từ khách sạn đến biệt
      thự sang trọng và đảo riêng.
    </p>
    <div className='flex space-x-4 text-gray-400'>
      {socialLinks.map(({ icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className='hover:text-gray-900 transition-colors'
        >
          {icon}
        </a>
      ))}
    </div>
  </div>
);
export default FooterLogo;
