import React from 'react';
import FeaturesList from './FeatureList';
import { createApiClient } from '@/lib/api/authApiClient';
async function fetchFeatures() {
  try {
    const api = createApiClient();
    const response = await (await api).get('/admin/features');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch features:', error);
    return [];
  }
}

const page = async () => {
  const features = await fetchFeatures();
  return (
    <main className='w-full min-h-screen bg-gray-50'>
      <h1 className='mt-10 mb-6 text-3xl font-bold text-center'>Không Gian</h1>
      <FeaturesList features={features} />;
    </main>
  );
};

export default page;
