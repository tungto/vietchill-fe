import AppButton from '@/features/common/AppButton';
import Rating from '@/features/common/Rating';
import { formatVND } from '@/lib/utils/formatPrice';
import { RoomType } from '@/types/room';
import { Box, CardContent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import OtherInfo from './OtherInfo';

interface RoomCardProps extends RoomType {
	onBook?: () => void; // optional, passed to client
}

interface RoomCardProps extends RoomType {
	onBook?: () => void;
}

const RoomCard = ({
	images,
	name,
	price,
	description,
	features,
	facilities,
	id,
}: RoomCardProps) => {
	return (
		<div className='relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl overflow-hidden bg-white text-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300'>
			{/* Image Section */}
			<Link className='relative block' href={`/rooms/${id}`}>
				<div className='relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl rounded-b-none'>
					<Image
						src={`/images/rooms/${images[0].path}`}
						alt={name}
						fill
						className='object-cover transition-transform duration-500 hover:scale-105'
						sizes='(max-width: 768px) 100vw, 400px'
						priority={false}
					/>
				</div>
				<Box className='absolute top-4 left-4 bg-[#0f4c4c] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md'>
					Best Seller
				</Box>

				{/* Content Section */}
				<CardContent className='p-5 sm:p-6'>
					{/* Title & Rating */}
					<div className='flex items-center justify-between'>
						<h5 className='font-semibold text-lg text-gray-900'>
							{name}
						</h5>
						<Rating value={4} />
					</div>

					{/* Description */}
					<p className='text-sm text-gray-600 mt-2 line-clamp-2'>
						{description}
					</p>

					{/* Other info */}
					<OtherInfo info={features} name='Space' />
					<OtherInfo info={facilities} name='Facilities' />

					{/* Price & Book Button */}
				</CardContent>
			</Link>
			<Box className='flex items-center justify-between mt-0 p-5 sm:p-6'>
				<h6 className='font-semibold text-lg text-gray-900'>
					{formatVND(price)}
					<span className='text-gray-500 text-sm font-normal'>
						{' '}
						/ night
					</span>
				</h6>

				<AppButton
					label='Book Now'
					href={`/booking-confirm?id=${id}`}
				/>
			</Box>
		</div>
	);
};

export default RoomCard;
