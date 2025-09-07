import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Attach token before each request
apiClient.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error.response?.data?.message || error.message || 'Request failed';
		return Promise.reject(new Error(message));
	}
);
