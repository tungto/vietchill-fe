import { formatVND } from '@/lib/utils';
import { RoomType } from '@/types/vietstay';
import PlaceIcon from '@mui/icons-material/Place';
import Image from 'next/image';
import Link from 'next/link';
import FacilityChip from '../common/FacilityChip';
import Rating from '../common/Rating';

export default function SquareRoomCard({ room }: { room: RoomType }) {
	return (
		<article className='max-w-4xl mx-auto bg-transparent p-6 md:p-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
				{/* Left image */}
				<div className='rounded-2xl overflow-hidden shadow-xl'>
					<Link
						href={`/vietstay/rooms/${room.id}`}
						className='relative w-full h-72 md:h-96 bg-gray-100 block'>
						<Image
							src={`/images/rooms/${room.images[0].path}`}
							alt={room.name}
							fill
							sizes='(max-width: 768px) 100vw, 50vw'
							className='object-cover'
						/>
					</Link>
				</div>

				{/* Right content */}
				<div className='flex flex-col justify-between'>
					<div>
						<Link href={`/vietstay/rooms/${room.id}`}>
							<div className='text-sm text-slate-500 mb-2'>
								Phu Quoc
							</div>
							<h2 className='text-3xl md:text-4xl font-serif text-slate-900 mb-2'>
								{room.name}
							</h2>
						</Link>

						<div className='flex items-center gap-4 mb-4'>
							<Rating value={4} />
							<div className='text-sm text-slate-600'>
								200+ reviews
							</div>
						</div>

						<div className='flex items-center gap-3 text-slate-600 mb-6'>
							<PlaceIcon />
							<span>
								Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang
								920000
							</span>
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
