// components/CreateFacilityForm.tsx
import { Facility } from '@/types/admin';
import React, { useState } from 'react';

interface CreateFacilityFormProps {
  onCreate: (data: Omit<Facility, 'id'>) => Promise<void>;
}

const CreateFacilityForm: React.FC<CreateFacilityFormProps> = ({
  onCreate,
}) => {
  const [formData, setFormData] = useState<Omit<Facility, 'id'>>({
    name: '',
    content: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreate(formData);
    setFormData({ name: '', content: '', description: '' }); // Reset the form
  };

  return (
    <div className='mb-6'>
      <h2 className='mb-4 text-2xl'>Create New Facility</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          placeholder='Name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='w-full p-2 border'
        />
        <input
          type='text'
          placeholder='Content'
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className='w-full p-2 border'
        />
        <textarea
          placeholder='Description'
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className='w-full p-2 border'
        />
        <button type='submit' className='w-full p-2 text-white bg-blue-500'>
          Create Facility
        </button>
      </form>
    </div>
  );
};

export default CreateFacilityForm;
