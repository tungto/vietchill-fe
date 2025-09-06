export type RoomFacility = {
	id: number;
	name: string;
	content: string;
	description: string;
	pivot?: {
		room_type_id: number;
		facility_id: number;
	};
};

export type FacilitiesResponse = {
	success: boolean;
	message: string;
	data: RoomFacility[];
};
