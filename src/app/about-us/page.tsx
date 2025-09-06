'use client';

import Image from 'next/image';
import { FiAward, FiUsers, FiGlobe } from 'react-icons/fi';

export default function AboutPage() {
	return (
		<div className='max-w-6xl mx-auto px-6 py-20'>
			{/* Title */}
			<h1 className='text-4xl md:text-5xl font-serif font-bold text-slate-900 text-center mb-16'>
				Về chúng tôi
			</h1>

			{/* Giới thiệu */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24'>
				{/* Ảnh */}
				<div>
					<Image
						src='/images/carousel/1.jpg'
						alt='Resort view'
						className='rounded-3xl shadow-lg w-full object-cover'
						width={500}
						height={600}
					/>
				</div>

				{/* Nội dung */}
				<div className='space-y-6'>
					<h2 className='text-3xl font-semibold text-slate-800'>
						InterContinental Phu Quoc Long Beach Resort
					</h2>
					<p className='text-slate-600 leading-relaxed'>
						Nằm tại Bãi Trường tuyệt đẹp, InterContinental Phu Quoc
						Long Beach Resort mang đến trải nghiệm nghỉ dưỡng sang
						trọng bậc nhất với không gian thoáng đãng, kiến trúc
						hiện đại hòa quyện cùng vẻ đẹp thiên nhiên của đảo ngọc.
					</p>
					<p className='text-slate-600 leading-relaxed'>
						Chúng tôi tự hào mang đến dịch vụ đẳng cấp quốc tế, từ
						các phòng nghỉ tiện nghi, ẩm thực phong phú đến những
						tiện ích giải trí và chăm sóc sức khỏe đa dạng. Tại đây,
						mỗi khoảnh khắc đều trở thành một kỷ niệm khó quên.
					</p>
				</div>
			</div>

			{/* Sứ mệnh & Giá trị */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-12 text-center'>
				<div className='bg-white rounded-3xl shadow-md p-8 border border-slate-200'>
					<div className='w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm mb-6'>
						<FiAward size={24} />
					</div>
					<h3 className='text-xl font-semibold text-slate-800 mb-3'>
						Đẳng cấp quốc tế
					</h3>
					<p className='text-slate-600 leading-relaxed'>
						Chúng tôi mang đến dịch vụ và trải nghiệm nghỉ dưỡng
						chuẩn mực 5 sao quốc tế tại đảo ngọc Phú Quốc.
					</p>
				</div>

				<div className='bg-white rounded-3xl shadow-md p-8 border border-slate-200'>
					<div className='w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm mb-6'>
						<FiUsers size={24} />
					</div>
					<h3 className='text-xl font-semibold text-slate-800 mb-3'>
						Dịch vụ tận tâm
					</h3>
					<p className='text-slate-600 leading-relaxed'>
						Đội ngũ nhân viên chuyên nghiệp, thân thiện, luôn sẵn
						sàng mang đến cho bạn sự thoải mái và hài lòng nhất.
					</p>
				</div>

				<div className='bg-white rounded-3xl shadow-md p-8 border border-slate-200'>
					<div className='w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm mb-6'>
						<FiGlobe size={24} />
					</div>
					<h3 className='text-xl font-semibold text-slate-800 mb-3'>
						Hòa quyện thiên nhiên
					</h3>
					<p className='text-slate-600 leading-relaxed'>
						Kiến trúc tinh tế và cảnh quan tuyệt đẹp giúp du khách
						tận hưởng sự yên bình và gần gũi với thiên nhiên biển
						đảo.
					</p>
				</div>
			</div>
		</div>
	);
}
