'use client';

import { priceRanges, sortOptions } from '@/lib/constants';
import { RoomType } from '@/types';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface RoomFilterProps {
	rooms: RoomType[];
	selectedFeatures: string[];
	setSelectedFeatures: Dispatch<SetStateAction<string[]>>;
	selectedPrice: number | null;
	setSelectedPrice: (price: number | null) => void;
	sortBy: string;
	setSortBy: (sort: string) => void;
	resetFilters: () => void;
}

export default function RoomFilter({
	rooms,
	selectedFeatures,
	setSelectedFeatures,
	selectedPrice,
	setSelectedPrice,
	sortBy,
	setSortBy,
	resetFilters,
}: RoomFilterProps) {
	const allFeatures = useMemo(() => {
		const featureMap = new Map<string, string>();
		rooms.forEach((room) => {
			room.features?.forEach((f) => {
				featureMap.set(f.name, f.content);
			});
		});
		return Array.from(featureMap, ([name, content]) => ({ name, content }));
	}, [rooms]);

	const toggleFeature = (id: string): void => {
		setSelectedFeatures((prev: string[]) =>
			prev.includes(id)
				? prev.filter((f: string) => f !== id)
				: [...prev, id]
		);
	};

	return (
		<aside className='w-72 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md p-6 text-sm h-fit'>
			{/* Header */}
			<div className='flex items-center justify-between border-b pb-3 mb-5'>
				<h2 className='font-semibold text-gray-800 uppercase tracking-wide text-sm'>
					Bộ lọc
				</h2>
				<button
					onClick={resetFilters}
					className='text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer'>
					Xóa
				</button>
			</div>

			{/* Features */}
			<div className='mb-6'>
				<h3 className='font-medium text-gray-700 mb-3 uppercase text-xs tracking-wide'>
					Tiện ích phổ biến
				</h3>
				<div className='space-y-2 max-h-40 overflow-y-auto pr-1'>
					{allFeatures.map((feature) => (
						<label
							key={feature.name}
							className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition'>
							<input
								type='checkbox'
								checked={selectedFeatures.includes(
									feature.name
								)}
								onChange={() => toggleFeature(feature.name)}
								className='cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<span className='text-gray-700'>
								{feature.content}
							</span>
						</label>
					))}
				</div>
			</div>

			{/* Price Range */}
			<div className='mb-6'>
				<h3 className='font-medium text-gray-700 mb-3 uppercase text-xs tracking-wide'>
					Khoảng giá
				</h3>
				<div className='space-y-2'>
					{priceRanges.map((range) => (
						<label
							key={range.id}
							className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition'>
							<input
								type='checkbox'
								checked={selectedPrice === range.id}
								onChange={() =>
									setSelectedPrice(
										selectedPrice === range.id
											? null
											: range.id
									)
								}
								className='cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<span className='text-gray-700'>{range.label}</span>
						</label>
					))}
				</div>
			</div>

			{/* Sort By */}
			<div>
				<h3 className='font-medium text-gray-700 mb-3 uppercase text-xs tracking-wide'>
					Sắp xếp theo
				</h3>
				<div className='space-y-2'>
					{sortOptions.map((sort) => (
						<label
							key={sort.id}
							className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition'>
							<input
								type='radio'
								name='sort'
								value={sort.id}
								checked={sortBy === sort.id}
								onChange={() => setSortBy(sort.id)}
								className='cursor-pointer text-blue-600 focus:ring-blue-500'
							/>
							<span className='text-gray-700'>{sort.label}</span>
						</label>
					))}
				</div>
			</div>
		</aside>
	);
}
