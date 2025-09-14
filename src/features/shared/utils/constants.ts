type PriceRange = {
	id: number;
	label: string;
	min: number;
	max: number;
};

export const priceRanges: PriceRange[] = [
	{ id: 1, label: '0 - 1,000,000 VND', min: 0, max: 1_000_000 },
	{
		id: 2,
		label: '1,000,000 - 2,000,000 VND',
		min: 1_000_000,
		max: 2_000_000,
	},
	{
		id: 3,
		label: '2,000,000 - 3,000,000 VND',
		min: 2_000_000,
		max: 3_000_000,
	},
	{ id: 4, label: '3,000,000+ VND', min: 3_000_000, max: Infinity },
];

export const sortOptions = [
	{ id: 'price-asc', label: 'Giá tăng dần' },
	{ id: 'price-desc', label: 'Giá giảm dần' },
	{ id: 'newest', label: 'Mới nhất' },
];
