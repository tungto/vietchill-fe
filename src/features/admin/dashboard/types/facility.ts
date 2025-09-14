// lib/types.ts

// Facility type
export interface Facility {
	id: number;
	name: string;
	content: string;
	description: string;
}

// Pagination type
export interface Pagination {
	total: number;
	current_page: number;
	limit: number;
	last_page: number;
}

// API Response type for facilities
export interface FacilitiesResponse {
	success: boolean;
	message: string;
	data: Facility[];
	pagination: Pagination;
}

// API Response type for creating a facility
export interface CreateFacilityResponse {
	success: boolean;
	message: string;
	data: Facility;
}
