'use client';

import React, { useState } from 'react';
import {
  HiPencilAlt,
  HiTrash,
  HiCheck,
  HiX,
  HiPlus,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';

type Feature = {
  id: number;
  name: string;
  content: string;
};

type FeaturesListProps = {
  features: Feature[];
};

const ITEMS_PER_PAGE = 10;

const FeaturesList: React.FC<FeaturesListProps> = ({ features }) => {
  const [data, setData] = useState<Feature[]>(features);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Feature>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (feature: Feature) => {
    setEditId(feature.id);
    setForm(feature);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
  };

  const saveEdit = () => {
    if (!form.name || !form.content) {
      alert('Please fill all fields');
      return;
    }
    setData((prev) =>
      prev.map((f) =>
        f.id === editId ? ({ ...f, ...form, id: editId! } as Feature) : f,
      ),
    );
    setEditId(null);
    setForm({});
  };

  const deleteFeature = (id: number) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      setData((prev) => prev.filter((f) => f.id !== id));
      if (editId === id) cancelEdit();
      // Adjust pagination if last item on last page removed
      const newTotalPages = Math.ceil((data.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
    }
  };

  const addNew = () => {
    if (!form.name || !form.content) {
      alert('Please fill all fields');
      return;
    }
    const newFeature: Feature = {
      id: data.length ? Math.max(...data.map((f) => f.id)) + 1 : 1,
      name: form.name,
      content: form.content,
    };
    setData((prev) => [...prev, newFeature]);
    setForm({});
    setCurrentPage(totalPages); // Go to last page to show new item
  };

  // Pagination slicing
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className='p-6 overflow-x-auto bg-white rounded-lg shadow-md'>
      <table className='min-w-full border border-collapse border-gray-300 table-auto'>
        <thead className='sticky top-0 z-10 bg-indigo-100'>
          <tr>
            <th className='px-4 py-2 text-left border border-gray-300'>ID</th>
            <th className='px-4 py-2 text-left border border-gray-300'>Name</th>
            <th className='px-4 py-2 text-left border border-gray-300'>
              Content
            </th>
            <th
              className='px-4 py-2 text-center border border-gray-300'
              style={{ width: '110px' }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto max-h-96'>
          {paginatedData.map((feature) => (
            <tr
              key={feature.id}
              className={
                editId === feature.id ? 'bg-yellow-50' : 'even:bg-gray-50'
              }
            >
              <td className='px-4 py-2 align-top border border-gray-300'>
                {feature.id}
              </td>
              <td className='px-4 py-2 align-top border border-gray-300'>
                {editId === feature.id ? (
                  <input
                    type='text'
                    name='name'
                    value={form.name || ''}
                    onChange={handleChange}
                    className='w-full px-2 py-1 border border-gray-300 rounded'
                  />
                ) : (
                  feature.name
                )}
              </td>
              <td className='px-4 py-2 align-top border border-gray-300'>
                {editId === feature.id ? (
                  <input
                    type='text'
                    name='content'
                    value={form.content || ''}
                    onChange={handleChange}
                    className='w-full px-2 py-1 border border-gray-300 rounded'
                  />
                ) : (
                  feature.content
                )}
              </td>
              <td className='px-4 py-2 space-x-2 text-center align-top border border-gray-300'>
                {editId === feature.id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className='text-green-600 hover:text-green-800'
                      aria-label='Save'
                      title='Save'
                    >
                      <HiCheck size={20} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className='text-gray-500 hover:text-gray-700'
                      aria-label='Cancel'
                      title='Cancel'
                    >
                      <HiX size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(feature)}
                      className='text-blue-600 hover:text-blue-800'
                      aria-label='Edit'
                      title='Edit'
                    >
                      <HiPencilAlt size={20} />
                    </button>
                    <button
                      onClick={() => deleteFeature(feature.id)}
                      className='text-red-600 hover:text-red-800'
                      aria-label='Delete'
                      title='Delete'
                    >
                      <HiTrash size={20} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {/* Add new feature row */}
          <tr className='bg-green-50'>
            <td className='px-4 py-2 text-center align-top border border-gray-300'>
              New
            </td>
            <td className='px-4 py-2 align-top border border-gray-300'>
              <input
                type='text'
                name='name'
                value={form.name || ''}
                onChange={handleChange}
                placeholder='Name'
                className='w-full px-2 py-1 border border-gray-300 rounded'
              />
            </td>
            <td className='px-4 py-2 align-top border border-gray-300'>
              <input
                type='text'
                name='content'
                value={form.content || ''}
                onChange={handleChange}
                placeholder='Content'
                className='w-full px-2 py-1 border border-gray-300 rounded'
              />
            </td>
            <td className='px-4 py-2 text-center align-top border border-gray-300'>
              <button
                onClick={addNew}
                className='text-green-700 hover:text-green-900'
                aria-label='Add'
                title='Add'
              >
                <HiPlus size={20} />
              </button>
            </td>
          </tr>
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
          <HiChevronLeft size={24} />
        </button>
        <span className='font-medium text-gray-700'>
          Page {currentPage} of {totalPages || 1}
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
          <HiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default FeaturesList;
