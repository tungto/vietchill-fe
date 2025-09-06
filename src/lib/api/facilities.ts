// lib/api/room.ts
import { FacilitiesResponse } from '@/types';

export async function getFacilities(): Promise<FacilitiesResponse> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/facilities`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		console.error('Failed to fetch room data:', res.statusText);
		throw new Error('Failed to fetch room data');
	}

	const data = await res.json();
	return data;
}
