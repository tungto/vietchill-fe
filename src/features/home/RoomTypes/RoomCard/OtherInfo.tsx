import { RoomFacility, RoomFeature } from '@/types';
import React from 'react';

const OtherInfo = ({
	info,
	name,
}: {
	info: RoomFacility[] | RoomFeature[];
	name: string;
}) => {
	return (
		<div className='flex flex-col text-gray-700 mt-4'>
			<p className='font-medium text-sm text-gray-800'>{name}</p>
			<div className='flex flex-wrap'>
				{info.slice(0, 3).map((item) => (
					<span
						key={item.id}
						className='inline-flex items-center rounded-full bg-[#0f4c4c]/10 px-3 py-1 text-xs font-medium text-[#0f4c4c] border border-[#0f4c4c]/20 mr-2 mt-2'>
						{item.name}
					</span>
				))}
			</div>
		</div>
	);
};

export default OtherInfo;
