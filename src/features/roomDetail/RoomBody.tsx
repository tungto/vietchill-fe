// components/roomDetails/RoomBody.tsx
import FacilityChip from '@/features/common/FacilityChip';
import { RoomType } from '@/types/room';

const RoomBody = ({ room }: { room: RoomType }) => (
	<div className='lg:col-span-2'>
		<h2 className='text-3xl md:text-4xl font-serif'>
			Experience Luxury Like Never Before
		</h2>
		<p className='mt-4 text-gray-700'>{room.description}</p>

		<div className='mt-6 flex flex-wrap gap-3'>
			{room.facilities.slice(0, 3).map((f) => (
				<FacilityChip key={f.id} facility={f} />
			))}
		</div>

		<div className='mt-10'>
			<h3 className='text-xl font-serif font-semibold text-gray-900'>
				Included Features
			</h3>
			<ul className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6'>
				{room.features.map((ft) => (
					<li
						key={ft.id}
						className='flex items-start gap-3 group transition-all duration-200 ease-in-out cursor-default'>
						<svg
							className='w-5 h-5 mt-1 text-emerald-500 flex-shrink-0 transform transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.8'
							viewBox='0 0 24 24'>
							<path d='M5 13l4 4L19 7' />
						</svg>
						<span className='text-sm text-gray-800 group-hover:underline transition duration-150 cursor-default'>
							{ft.content}
						</span>
					</li>
				))}
			</ul>
		</div>
	</div>
);

export default RoomBody;
