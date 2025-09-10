'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [pageTitle, setPageTitle] = useState('VietChill');
  const [aboutUs, setAboutUs] = useState(
    'Trải nghiệm dịch vụ đặt phòng khách sạn trực tuyến nhanh chóng, tiện lợi với đa dạng lựa chọn tại các điểm đến du lịch nổi tiếng trên khắp Việt Nam. Hãy để hành trình của bạn bắt đầu chỉ với vài cú nhấp chuột!',
  );
  const [maintenance, setMaintenance] = useState(false);
  const [address, setAddress] = useState('');
  const [googleMap, setGoogleMap] = useState('');
  const [hotline, setHotline] = useState('');
  const [email, setEmail] = useState('');
  const [socialNetwork, setSocialNetwork] = useState('');
  const [iframe, setIframe] = useState('');
  const [managementTeam, setManagementTeam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you can add your saving logic, e.g., call API
    alert('Cài đặt đã được lưu!');
  };

  return (
    <div className='w-full p-6 mx-auto'>
      <h1 className='mb-8 text-3xl font-bold'>Cài đặt trang</h1>
      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Thiết lập chung */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>Thiết lập chung</h2>
          <label className='block mb-2 font-medium' htmlFor='pageTitle'>
            Tiêu đề trang
          </label>
          <input
            id='pageTitle'
            type='text'
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </section>

        {/* Về chúng tôi */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>Về chúng tôi</h2>
          <textarea
            value={aboutUs}
            onChange={(e) => setAboutUs(e.target.value)}
            className='w-full h-24 px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </section>

        {/* Bảo trì hệ thống */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>Bảo trì hệ thống</h2>
          <label className='inline-flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={maintenance}
              onChange={(e) => setMaintenance(e.target.checked)}
              className='w-5 h-5 text-blue-600 form-checkbox'
            />
            <span>
              Người dùng sẽ không thể đặt phòng khi hệ thống đang trong trạng
              thái bảo trì.
            </span>
          </label>
        </section>

        {/* Thiết lập liên hệ */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>Thiết lập liên hệ</h2>
          <div className='space-y-4'>
            <div>
              <label htmlFor='address' className='block mb-1 font-medium'>
                Địa chỉ
              </label>
              <input
                id='address'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label htmlFor='googleMap' className='block mb-1 font-medium'>
                Google Map (Link hoặc Embed code)
              </label>
              <input
                id='googleMap'
                type='text'
                value={googleMap}
                onChange={(e) => setGoogleMap(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label htmlFor='hotline' className='block mb-1 font-medium'>
                Số tổng đài
              </label>
              <input
                id='hotline'
                type='text'
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-1 font-medium'>
                E-mail
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label htmlFor='socialNetwork' className='block mb-1 font-medium'>
                Mạng xã hội (Links)
              </label>
              <input
                id='socialNetwork'
                type='text'
                value={socialNetwork}
                onChange={(e) => setSocialNetwork(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
        </section>

        {/* iFrame */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>iFrame</h2>
          <textarea
            value={iframe}
            onChange={(e) => setIframe(e.target.value)}
            className='w-full h-24 px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Nhập mã iFrame ở đây'
          />
        </section>

        {/* Đội ngũ quản lý */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>Đội ngũ quản lý</h2>
          <textarea
            value={managementTeam}
            onChange={(e) => setManagementTeam(e.target.value)}
            className='w-full h-24 px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Nhập thông tin đội ngũ quản lý'
          />
        </section>

        <button
          type='submit'
          className='px-6 py-3 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700'
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
