import { RoomType } from '@/types';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import FacilityChip from '../common/FacilityChip';
import { formatVND } from '@/lib/utils';

export default function SquareRoomCard({ room }: { room: RoomType }) {
	return (
		<article className='max-w-4xl mx-auto bg-transparent p-6 md:p-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
				{/* Left image */}
				<div className='rounded-2xl overflow-hidden shadow-xl'>
					<div className='relative w-full h-72 md:h-96 bg-gray-100'>
						<Image
							src={`/images/rooms/${room.images[0].path}`}
							alt={room.name}
							fill
							sizes='(max-width: 768px) 100vw, 50vw'
							className='object-cover'
						/>
					</div>
				</div>

				{/* Right content */}
				<div className='flex flex-col justify-between'>
					<div>
						<div className='text-sm text-slate-500 mb-2'>
							New York
						</div>
						<h2 className='text-3xl md:text-4xl font-serif text-slate-900 mb-2'>
							{room.name}
						</h2>

						<div className='flex items-center gap-4 mb-4'>
							<Rating
								name='read-only'
								defaultValue={4}
								precision={0.5}
								readOnly
							/>
							<div className='text-sm text-slate-600'>
								200+ reviews
							</div>
						</div>

						<div className='flex items-center gap-3 text-slate-600 mb-6'>
							<svg
								className='w-5 h-5'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'>
								<path
									d='M12 2c3 0 8 4 8 8 0 5-8 12-8 12S4 15 4 10c0-4 5-8 8-8z'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<span>Main Road 123 Street , 23 Colony</span>
						</div>

						{/* Facilities list */}
						<div className='flex flex-wrap gap-3 mb-6'>
							{room.facilities.slice(0, 4).map((f) => (
								<FacilityChip facility={f} key={f.id} />
							))}
						</div>

						<p className='text-slate-600 mb-6'>
							{room.description}
						</p>
					</div>

					<div className='flex items-center justify-between mt-4'>
						<div>
							<div className='text-2xl md:text-3xl font-semibold text-slate-900'>
								{formatVND(room.price)}/
								<span className='text-sm font-normal'>
									night
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}
