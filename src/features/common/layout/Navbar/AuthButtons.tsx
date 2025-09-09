import Link from 'next/link';
import clsx from 'clsx';

export default function AuthButtons({
  scrolled,
  onClick,
}: {
  scrolled: boolean;
  onClick?: () => void;
}) {
  return (
    <div className='flex items-center space-x-3 flex-col md:flex-row md:space-x-3 md:space-y-0 space-y-3'>
      <Link
        href='/vietstay/login'
        onClick={onClick}
        className={clsx(
          'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border shadow-sm',
          'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
          scrolled
            ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-800'
            : 'border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white',
        )}
      >
        Đăng nhập
      </Link>
      <Link
        href='/vietstay/sign-up'
        onClick={onClick}
        className={clsx(
          'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md',
          'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
          scrolled
            ? 'bg-[#0f4c4c] text-white hover:bg-[#0c3d3d] focus:ring-[#0f4c4c]'
            : 'bg-white text-[#0f4c4c] hover:bg-gray-100 focus:ring-white',
        )}
      >
        Đăng ký
      </Link>
    </div>
  );
}
