export type Booking = {
	id: number;
	status: string;
	check_in_date: string;
	check_out_date: string;
	phone: string;
	adult: number;
	children: number;
	total_price: number;
	created_at: string;
	review?: {
		rating: number;
		review: string;
	} | null;
	room_type: {
		name: string;
		images: { path: string; is_thumbnail: boolean }[];
	};
};

export type BookingsResponse = {
	success: boolean;
	message: string;
	data: Booking[];
};
