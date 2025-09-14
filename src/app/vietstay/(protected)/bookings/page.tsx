import { Booking } from '@/features/vietstay/booking/types/booking';
import { cookies } from 'next/headers';
import axios from 'axios';
import { BookingsList } from '@/features/vietstay/booking/components';

async function getBookings(): Promise<Booking[]> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth_token')?.value;

  if (!token) {
    throw new Error('No auth token found');
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const json = response.data;

  if (!json.success) {
    throw new Error(json.message || 'Error loading bookings');
  }

  return json.data;
}

export default async function BookingsPage() {
  let bookings: Booking[] = [];

  try {
    bookings = await getBookings();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to load initial bookings:', error);
    // Pass empty array to let client component handle the error
    bookings = [];
  }

  return <BookingsList initialBookings={bookings} />;
}
