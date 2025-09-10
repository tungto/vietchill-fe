// app/page.tsx

import { createApiClient } from '@/lib/api/authApiClient';
import FacilitiesList from './FacilityList';

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

export default async function Page() {
  const facilities = await fetchFacilities();

  return (
    <main className='w-full min-h-screen bg-gray-50'>
      <h1 className='mt-10 mb-6 text-3xl font-bold text-center'>
        Tiện nghi phòng
      </h1>
      <FacilitiesList facilities={facilities} />
    </main>
  );
}
