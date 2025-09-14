import Link from 'next/link';

const Banner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-screen w-full text-white overflow-hidden'>
      {/* Background image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url('/images/carousel/1.jpg')`,
        }}
      />

      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Foreground content */}
      <div className='relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 lg:px-24 xl:px-32'>
        <div className='px-4 py-1.5 rounded-full bg-gradient-to-r from-white/20 to-white/10 text-sm font-medium uppercase tracking-wide backdrop-blur-md shadow-md'>
          Trải nghiệm khách sạn tuyệt đỉnh
        </div>
        <h1 className='font-playfair text-4xl md:text-6xl font-bold leading-tight drop-shadow-md'>
          Khám phá điểm đến lý tưởng của bạn
        </h1>

        {/* Description */}
        <p className='text-white/90 text-base md:text-lg leading-relaxed drop-shadow-sm max-w-xl'>
          Sự sang trọng và tiện nghi tuyệt vời đang chờ đón bạn tại những khách
          sạn và khu nghỉ dưỡng độc quyền nhất thế giới. Hãy bắt đầu hành trình
          của bạn ngay hôm nay.
        </p>

        <div className='mt-4 mb-16'>
          <Link
            href='/vietstay/rooms'
            className='inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/20 backdrop-blur-md transition-all duration-200'
          >
            Khám phá ngay
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Banner;
