'use client';

import { useState, useEffect } from 'react';
import { TbPlus, TbList } from 'react-icons/tb';
import FacilitiesList from '@/features/admin/facilities/components/FacilityList';
import CreateFacilityForm from '@/features/admin/facilities/components/CreateFacilityForm';
import { fetchFacilities, Facility } from '@/features/admin/facilities/api/api';

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFacilities(1, 100); // Load all facilities for now
      setFacilities(response.data);
    } catch (err) {
      setError('Không thể tải danh sách tiện nghi');
      console.error('Error loading facilities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = (newFacility: Facility) => {
    setFacilities((prev) => [...prev, newFacility]);
    setShowCreateForm(false);
    setSuccessMessage('Tạo tiện nghi thành công!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleCreateError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleFacilityUpdate = () => {
    loadFacilities();
    setSuccessMessage('Cập nhật tiện nghi thành công!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
        {error}
        <button
          onClick={loadFacilities}
          className='ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>Quản lý tiện nghi</h1>
        <div className='flex gap-3'>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              showCreateForm
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {showCreateForm ? (
              <>
                <TbList />
                Xem danh sách
              </>
            ) : (
              <>
                <TbPlus />
                Thêm tiện nghi
              </>
            )}
          </button>
          <button
            onClick={loadFacilities}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Làm mới
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded'>
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
          <button
            onClick={() => setError(null)}
            className='ml-2 text-red-900 hover:text-red-700'
          >
            ✕
          </button>
        </div>
      )}

      {/* Content */}
      {showCreateForm ? (
        <CreateFacilityForm
          onSuccess={handleCreateSuccess}
          onError={handleCreateError}
        />
      ) : (
        <FacilitiesList
          facilities={facilities}
          onDataChange={handleFacilityUpdate}
        />
      )}
    </div>
  );
}
