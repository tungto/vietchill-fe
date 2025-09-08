'use client';

import React, { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    // Xử lý gửi email lên backend ở đây
  };

  return (
    <div>
      <h3 className='font-semibold text-gray-900 mb-3 uppercase text-sm'>
        Cập nhật bản tin
      </h3>
      <p className='text-sm text-gray-600 mb-3'>
        Đăng ký nhận bản tin của chúng tôi để nhận cảm hứng du lịch và các ưu
        đãi đặc biệt.
      </p>
      <form className='flex max-w-xs' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Your email'
          className='flex-grow rounded-l border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type='submit'
          aria-label='Subscribe'
          className='bg-black hover:bg-gray-800 text-white px-3 rounded-r flex items-center justify-center transition-colors'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
