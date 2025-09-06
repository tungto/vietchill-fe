import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
	return (
		<div className='max-w-5xl mx-auto px-6 py-20'>
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
							Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ
							đặt phòng tại InterContinental Phu Quoc Long Beach
							Resort. Chúng tôi rất mong được phục vụ bạn.
						</p>
					</div>

					<div className='space-y-6'>
						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm'>
								<FiMapPin size={20} />
							</div>
							<span className='text-slate-700'>
								Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang, Việt
								Nam
							</span>
						</div>

						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm'>
								<FiPhone size={20} />
							</div>
							<span className='text-slate-700'>
								+84 297 397 8888
							</span>
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
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0911!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809caaaaaa!2sHotel!5e0!3m2!1sen!2sus!4v1689943200000!5m2!1sen!2sus'
							width='100%'
							height='260'
							loading='lazy'
							className='border-0'
						/>
					</div>
				</div>

				{/* Bên phải: Form gọn, căn giữa, thanh thoát */}
				<div className='flex justify-center'>
					<div className='w-full max-w-md bg-white shadow-lg rounded-3xl p-10 border border-slate-200'>
						<h2 className='text-2xl font-semibold text-slate-800 mb-8 text-center'>
							Gửi tin nhắn cho chúng tôi
						</h2>

						<form className='space-y-6'>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-2'>
									Họ và tên
								</label>
								<input
									type='text'
									placeholder='Nhập họ và tên'
									className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-slate-700 mb-2'>
									Email
								</label>
								<input
									type='email'
									placeholder='Nhập email'
									className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-slate-700 mb-2'>
									Số điện thoại
								</label>
								<input
									type='text'
									placeholder='Nhập số điện thoại'
									className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-slate-700 mb-2'>
									Tin nhắn
								</label>
								<textarea
									rows={4}
									placeholder='Viết tin nhắn của bạn...'
									className='w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition resize-none'
								/>
							</div>

							<button
								type='submit'
								className='w-full bg-slate-900 text-white py-3 rounded-2xl font-medium hover:bg-slate-800 transition shadow-md hover:shadow-lg'>
								Gửi tin nhắn
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
