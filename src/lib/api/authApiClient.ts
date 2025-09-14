// lib/apiClient.ts
import axios from 'axios';
import { cookies } from 'next/headers';

export async function createApiClient() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth_token');

  if (!token) {
    throw new Error('No auth token found');
  } // change 'token' to your cookie key

  const instance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/',
    headers: {
      ...(token ? { Authorization: `Bearer ${token.value}` } : {}),
    },
    withCredentials: true,
  });

  return instance;
}
