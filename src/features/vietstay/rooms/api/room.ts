import { RoomType } from '../types/room';

export async function getRoomData(id: string): Promise<RoomType> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room-types/${id}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    console.error('Failed to fetch room data:', res.statusText);
    throw new Error('Failed to fetch room data');
  }

  const { data } = await res.json();
  return data;
}
