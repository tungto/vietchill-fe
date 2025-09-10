import { createApiClient } from '@/lib/api/authApiClient';

export async function fetchFacilities() {
  try {
    const api = createApiClient();
    const response = await (await api).get('/admin/facilities');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch facilities:', error);
    return [];
  }
}
