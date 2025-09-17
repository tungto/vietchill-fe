'use client';

import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';
import {
  userQueriesApi,
  CreateQueryData,
} from '@/features/vietstay/contact/api/userQueriesApi';

export default function ContactPage() {
  const [formData, setFormData] = useState<CreateQueryData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Vui lòng nhập địa chỉ email hợp lệ.');
        return;
      }

      await userQueriesApi.submitQuery(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Failed to submit query:', error);
      setError(
        error.response?.data?.message ||
          'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='max-w-5xl mx-auto px-6 py-20 mt-16'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <FiCheck className='w-8 h-8 text-green-600' />
          </div>
          <h1 className='text-3xl font-bold text-slate-900 mb-4'>
            Cảm ơn bạn đã liên hệ!
          </h1>
          <p className='text-slate-600 mb-8 max-w-md mx-auto'>
            Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời
            gian sớm nhất.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className='bg-slate-900 text-white px-6 py-3 rounded-2xl font-medium hover:bg-slate-800 transition'
          >
            Gửi tin nhắn khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto px-6 py-20 mt-16'>
      {/* Tiêu đề */}
      <h1 className='text-4xl md:text-5xl font-serif font-bold text-slate-900 text-center mb-16'>
        Liên hệ với chúng tôi
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
        {/* Bên trái: Thông tin liên hệ */}
        <div className='space-y-10'>
          <div>
            <h2 className='text-2xl font-semibold text-slate-800 mb-4'>
              Thông tin liên hệ
            </h2>
            <p className='text-slate-600 leading-relaxed'>
              Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ đặt phòng tại
              VietStay Phu Quoc Long Beach Resort. Chúng tôi rất mong được phục
              vụ bạn.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm'>
                <FiMapPin size={20} />
              </div>
              <span className='text-slate-700'>
                Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang, Việt Nam
              </span>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm'>
                <FiPhone size={20} />
              </div>
              <span className='text-slate-700'>+84 297 397 8888</span>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm'>
                <FiMail size={20} />
              </div>
              <div className='text-slate-700'>
                <div>info.icpq@ihg.com</div>
                <div>Reservations.ICPQ@ihg.com</div>
              </div>
            </div>
          </div>

          {/* Bản đồ */}
          <div className='rounded-2xl overflow-hidden shadow-md border border-slate-200'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.401961635007!2d103.96303107503536!3d10.160538971721604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a7140af9b8c9e9%3A0x95d5f2ac3531768a!2sInterContinental%20Phu%20Quoc%20Long%20Beach%20Resort%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1694092978189!5m2!1sen!2s'
              width='100%'
              height='260'
              loading='lazy'
              className='border-0'
              allowFullScreen
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>
        </div>

        {/* Bên phải: Form gọn, căn giữa, thanh thoát */}
        <div className='flex justify-center'>
          <div className='w-full max-w-md bg-white shadow-lg rounded-3xl p-10 border border-slate-200'>
            <h2 className='text-2xl font-semibold text-slate-800 mb-8 text-center'>
              Gửi tin nhắn cho chúng tôi
            </h2>

            {error && (
              <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl'>
                <p className='text-red-600 text-sm'>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Họ và tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Nhập họ và tên'
                  className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Email <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Nhập email'
                  className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Chủ đề <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder='Nhập chủ đề tin nhắn'
                  className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  Tin nhắn <span className='text-red-500'>*</span>
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder='Viết tin nhắn của bạn...'
                  className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition resize-none'
                  required
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full bg-slate-900 text-white py-3 rounded-2xl font-medium hover:bg-slate-800 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              >
                {loading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    Gửi tin nhắn
                  </>
                )}
              </button>
            </form>

            <p className='text-xs text-slate-500 text-center mt-4'>
              Các trường có dấu <span className='text-red-500'>*</span> là bắt
              buộc
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
