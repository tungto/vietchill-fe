import {
  GetProfileResponse,
  UpdatePasswordPayload,
  UpdateProfilePayload,
} from '@/features/vietstay/auth/types/user';
import { apiClient } from '@/features/shared/api/apiClient';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

// use in getProfile
export async function getProfile(): Promise<GetProfileResponse> {
  const token = localStorage.getItem('access_token');
  if (!token) throw new Error('Not logged in');

  const res = await apiClient.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.data.success) throw new Error('Failed to fetch profile');
  return res.data;
}

export async function updateProfile(data: UpdateProfilePayload) {
  const res = await apiClient.put(`${API_URL}/profile`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.data.success) throw new Error('Failed to update profile');
  return res.data;
}

export async function changePassword(data: UpdatePasswordPayload) {
  const res = await apiClient.put(`${API_URL}/change-password`, data);
  if (!res.data.success) throw new Error('Failed to change password');
  return res.data;
}

export async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await apiClient.post(`${API_URL}/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!res.data.success) throw new Error('Failed to upload avatar');
  return res.data;
}
