// components/FacilityList.tsx
import { Facility, Pagination } from '@/types/admin';
import React from 'react';

interface FacilityListProps {
	facilities: Facility[];
	pagination: Pagination;
	onPageChange: (page: number) => void;
}

const FacilityList: React.FC<FacilityListProps> = ({
	facilities,
	pagination,
	onPageChange,
}) => {
	return (
		<div>
			<h2 className='text-2xl mb-4'>Facilities List</h2>
			<table className='table-auto w-full border-collapse'>
				<thead>
					<tr>
						<th className='border p-2'>ID</th>
						<th className='border p-2'>Name</th>
						<th className='border p-2'>Content</th>
						<th className='border p-2'>Description</th>
					</tr>
				</thead>
				<tbody>
					{facilities.map((facility) => (
						<tr key={facility.id}>
							<td className='border p-2'>{facility.id}</td>
							<td className='border p-2'>{facility.name}</td>
							<td className='border p-2'>{facility.content}</td>
							<td className='border p-2'>
								{facility.description}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='mt-4'>
				<button
					onClick={() => onPageChange(pagination.current_page - 1)}
					disabled={pagination.current_page <= 1}
					className='bg-blue-500 text-white p-2 mr-4'>
					Previous
				</button>
				<button
					onClick={() => onPageChange(pagination.current_page + 1)}
					disabled={pagination.current_page >= pagination.last_page}
					className='bg-blue-500 text-white p-2'>
					Next
				</button>
			</div>
		</div>
	);
};

export default FacilityList;
