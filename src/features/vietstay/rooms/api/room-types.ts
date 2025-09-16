import { RoomTypesResponse } from '../types/room';

export async function getRoomsData(): Promise<RoomTypesResponse> {
  const res = await fetch('http://localhost:8000/api/room-types');

  if (!res.ok) {
    console.error('Failed to fetch room data:', res.statusText);
    throw new Error('Failed to fetch room data');
  }

  const data = await res.json();
  return data;
}
