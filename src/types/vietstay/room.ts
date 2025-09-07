import { RoomFacility } from './facility';

export interface RoomTypeImage {
	id: number;
	room_type_id: number;
	path: string;
	is_thumbnail: boolean;
	created_at: string; // ISO or timestamp string
}

export type RoomFeature = {
	id: number;
	name: string; // e.g., "balcony"
	content: string; // e.g., "Ban công"
	pivot: {
		room_type_id: number;
		feature_id: number;
	};
};

export interface RoomType {
	id: number;
	name: string;
	area: number;
	price: number;
	quantity: number;
	adult: number;
	children: number;
	description: string;
	created_at: string;
	updated_at: string;
	images: RoomTypeImage[];
	facilities: RoomFacility[];
	features: RoomFeature[];
}

export interface RoomTypesResponse {
	success: boolean;
	message: string;
	data: RoomType[];
	pagination: {
		total: number;
		current_page: number;
		limit: number;
		last_page: number;
	};
	filters_applied: {
		search: string | null;
		price_range: {
			min: number | null;
			max: number | null;
		};
		area_range: {
			min: number | null;
			max: number | null;
		};
		capacity: {
			adult: number | null;
			children: number | null;
		};
		facilities: number[] | null; // could be IDs or objects depending on API
		features: number[] | null; // same here
		sort: {
			by: string; // "price"
			order: 'asc' | 'desc';
		};
	};
}

// types/room.ts
export type ImageItem = {
	id: number;
	room_type_id: number;
	path: string;
	is_thumbnail: boolean;
	created_at: string;
};
