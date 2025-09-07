import {
	GetProfileResponse,
	UpdatePasswordPayload,
	UpdateProfilePayload,
} from '@/types/vietstay';

const API_URL = 'http://localhost:8000/api/auth';

// use in getProfile
export async function getProfile(): Promise<GetProfileResponse> {
	const token = localStorage.getItem('access_token');
	if (!token) throw new Error('Not logged in');

	const res = await fetch(`${API_URL}/profile`, {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!res.ok) throw new Error('Failed to fetch profile');
	return res.json();
}

export async function updateProfile(data: UpdateProfilePayload) {
	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			formData.append(key, value as string | Blob);
		}
	});

	const res = await fetch(`${API_URL}/profile`, {
		method: 'PUT',
		body: formData,
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Failed to update profile');
	return res.json();
}

export async function changePassword(data: UpdatePasswordPayload) {
	const res = await fetch(`${API_URL}/change-password`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error('Failed to change password');
	return res.json();
}
