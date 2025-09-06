import { useMemo, useState } from 'react';
import { RoomType } from '@/types';
import { priceRanges } from '@/lib/constants';

export function useRoomFilters(rooms: RoomType[]) {
	const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
	const [sortBy, setSortBy] = useState<string>('price-asc');

	const filteredRooms = useMemo(() => {
		let result = [...rooms];

		if (selectedFeatures.length > 0) {
			result = result.filter((room) =>
				room.features?.some((f) => selectedFeatures.includes(f.name))
			);
		}

		if (selectedPrice) {
			const range = priceRanges.find((r) => r.id === selectedPrice);
			if (range) {
				result = result.filter(
					(room) => room.price >= range.min && room.price <= range.max
				);
			}
		}

		if (sortBy === 'price-asc') {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === 'price-desc') {
			result.sort((a, b) => b.price - a.price);
		} else if (sortBy === 'newest') {
			result.sort(
				(a, b) =>
					new Date(b.created_at).getTime() -
					new Date(a.created_at).getTime()
			);
		}

		return result;
	}, [rooms, selectedFeatures, selectedPrice, sortBy]);

	const resetFilters = () => {
		setSelectedFeatures([]);
		setSelectedPrice(null);
		setSortBy('price-asc');
	};

	return {
		filteredRooms,
		selectedFeatures,
		setSelectedFeatures,
		selectedPrice,
		setSelectedPrice,
		sortBy,
		setSortBy,
		resetFilters,
	};
}
