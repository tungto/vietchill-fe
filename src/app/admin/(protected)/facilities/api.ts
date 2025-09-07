// lib/api.ts
import { apiClient } from '@/lib/api/apiClient';
import {
	CreateFacilityResponse,
	FacilitiesResponse,
	Facility,
} from '@/types/admin';

// Fetch facilities with pagination
export const getFacilities = async (
	limit: number,
	page: number
): Promise<FacilitiesResponse> => {
	const response = await apiClient.get('facilities', {
		params: { limit, page },
	});
	return response.data;
};

// Create a new facility
export const createFacility = async (
	data: Omit<Facility, 'id'>
): Promise<CreateFacilityResponse> => {
	const response = await apiClient.post('facilities', data);
	return response.data;
};

// Update a facility
export const updateFacility = async (
	id: number,
	data: Facility
): Promise<CreateFacilityResponse> => {
	const response = await apiClient.put(`facilities/${id}`, data);
	return response.data;
};
