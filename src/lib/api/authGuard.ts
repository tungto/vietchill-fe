import { GetProfileResponse } from '@/types/vietstay';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth(): Promise<GetProfileResponse> {
  const token = (await cookies()).get('auth_token')?.value;

  if (!token) {
    redirect('/vietstay/login');
  }

  const res = await fetch('http://localhost:8000/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store', // avoid caching auth check
  });

  if (!res.ok) {
    redirect('/vietstay/login');
  }

  return res.json(); // profile object
}
