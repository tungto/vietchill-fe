'use client';

import React, { useState } from 'react';
import {
  TbEdit,
  TbTrash,
  TbCheck,
  TbX,
  TbChevronLeft,
  TbChevronRight,
} from 'react-icons/tb';
import {
  Facility,
  updateFacility,
  deleteFacility,
  UpdateFacilityData,
} from '@/features/admin/facilities/api/api';

type FacilitiesListProps = {
  facilities: Facility[];
  onDataChange: () => void;
};

const ITEMS_PER_PAGE = 10;

const FacilitiesList: React.FC<FacilitiesListProps> = ({
  facilities,
  onDataChange,
}) => {
  const [data, setData] = useState<Facility[]>(facilities);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Facility>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (facility: Facility) => {
    setEditId(facility.id);
    setForm(facility);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
  };

  const saveEdit = async () => {
    if (!form.name || !form.content || !form.description) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (!editId) return;

    try {
      setLoading(true);
      setError(null);

      const updateData: UpdateFacilityData = {
        name: form.name,
        content: form.content,
        description: form.description,
      };

      await updateFacility(editId, updateData);

      // Update local state
      setData((prev) =>
        prev.map((f) =>
          f.id === editId ? ({ ...f, ...form, id: editId! } as Facility) : f,
        ),
      );

      setEditId(null);
      setForm({});
      onDataChange(); // Refresh data from parent
    } catch (err) {
      setError('Không thể cập nhật tiện nghi');
      console.error('Error updating facility:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFacility = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa tiện nghi này?')) {
      try {
        setLoading(true);
        setError(null);

        await deleteFacility(id);

        // Update local state
        setData((prev) => prev.filter((f) => f.id !== id));
        if (editId === id) cancelEdit();

        // Adjust pagination if last item on last page removed
        const newTotalPages = Math.ceil((data.length - 1) / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }

        onDataChange(); // Refresh data from parent
      } catch (err) {
        setError('Không thể xóa tiện nghi');
        console.error('Error deleting facility:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Remove the inline add functionality since we have a dedicated form

  // Pagination slicing
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Update data when facilities prop changes
  React.useEffect(() => {
    setData(facilities);
  }, [facilities]);

  return (
    <div className='space-y-4'>
      {/* Error Display */}
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

      {/* Loading Overlay */}
      {loading && (
        <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-lg flex items-center space-x-2'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
            <span>Đang xử lý...</span>
          </div>
        </div>
      )}

      <div className='p-6 overflow-x-auto bg-white rounded-lg shadow-md'>
        <table className='min-w-full border border-collapse border-gray-300 table-auto'>
          <thead>
            <tr className='bg-indigo-100'>
              <th className='px-4 py-2 text-left border border-gray-300 font-semibold'>
                ID
              </th>
              <th className='px-4 py-2 text-left border border-gray-300 font-semibold'>
                Tên tiện nghi
              </th>
              <th className='px-4 py-2 text-left border border-gray-300 font-semibold'>
                Nội dung
              </th>
              <th
                className='px-4 py-2 text-left border border-gray-300 font-semibold'
                style={{
                  maxWidth: '500px',
                  width: '500px',
                  whiteSpace: 'normal',
                }}
              >
                Mô tả
              </th>
              <th
                className='px-4 py-2 text-center border border-gray-300 font-semibold'
                style={{ width: '110px' }}
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((facility) => (
              <tr
                key={facility.id}
                className={
                  editId === facility.id ? 'bg-yellow-50' : 'even:bg-gray-50'
                }
              >
                <td className='px-4 py-2 align-top border border-gray-300'>
                  {facility.id}
                </td>
                <td className='px-4 py-2 align-top border border-gray-300'>
                  {editId === facility.id ? (
                    <input
                      type='text'
                      name='name'
                      value={form.name || ''}
                      onChange={handleChange}
                      placeholder='Nhập tên tiện nghi'
                      className='w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  ) : (
                    facility.name
                  )}
                </td>
                <td className='px-4 py-2 align-top border border-gray-300'>
                  {editId === facility.id ? (
                    <input
                      type='text'
                      name='content'
                      value={form.content || ''}
                      onChange={handleChange}
                      placeholder='Nhập nội dung'
                      className='w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  ) : (
                    facility.content
                  )}
                </td>
                <td
                  className='px-4 py-2 break-words align-top border border-gray-300'
                  style={{ maxWidth: '500px', whiteSpace: 'normal' }}
                >
                  {editId === facility.id ? (
                    <textarea
                      name='description'
                      value={form.description || ''}
                      onChange={handleChange}
                      placeholder='Nhập mô tả chi tiết'
                      className='w-full px-2 py-1 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                      rows={3}
                    />
                  ) : (
                    facility.description
                  )}
                </td>
                <td className='px-4 py-2 space-x-2 text-center align-top border border-gray-300'>
                  {editId === facility.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className='text-green-600 hover:text-green-800'
                        aria-label='Save'
                        title='Save'
                        disabled={loading}
                      >
                        <TbCheck size={20} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className='text-gray-500 hover:text-gray-700'
                        aria-label='Cancel'
                        title='Cancel'
                        disabled={loading}
                      >
                        <TbX size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(facility)}
                        className='text-blue-600 hover:text-blue-800'
                        aria-label='Edit'
                        title='Edit'
                        disabled={loading}
                      >
                        <TbEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteFacility(facility.id)}
                        className='text-red-600 hover:text-red-800'
                        aria-label='Delete'
                        title='Delete'
                        disabled={loading}
                      >
                        <TbTrash size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className='flex items-center justify-center mt-4 space-x-4 select-none'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-indigo-600 hover:text-indigo-800'
            }`}
            aria-label='Previous page'
            title='Previous page'
          >
            <TbChevronLeft size={24} />
          </button>
          <span className='font-medium text-gray-700'>
            Trang {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-indigo-600 hover:text-indigo-800'
            }`}
            aria-label='Next page'
            title='Next page'
          >
            <TbChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesList;
