// components/roomDetails/RoomHeader.tsx
import Rating from '@/features/common/Rating';
import PlaceIcon from '@mui/icons-material/Place';

interface RoomHeaderProps {
	title: string;
	price: number;
}

const RoomHeader = ({ title }: RoomHeaderProps) => (
	<div className='flex items-start justify-between gap-6 mt-8'>
		<div>
			<h1 className='text-3xl md:text-4xl font-serif tracking-tight'>
				{title}{' '}
				<span className='text-sm text-gray-500 font-normal'>
					(Double Bed)
				</span>
				<div className='ml-8 inline-block bg-orange-500 text-white text-sm px-3 py-1 rounded-full'>
					20% OFF
				</div>
			</h1>
			<div className='mt-3 flex items-center gap-4'>
				<Rating value={4} />
				<div className='flex items-center text-sm text-gray-500 gap-2'>
					<PlaceIcon />
					<span>
						Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang 920000
					</span>
				</div>
			</div>
		</div>
	</div>
);

export default RoomHeader;
