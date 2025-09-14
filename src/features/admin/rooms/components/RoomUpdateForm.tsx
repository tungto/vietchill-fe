'use client';

import React from 'react';
import { Room, UpdateRoomData } from '@/features/admin/rooms/api/roomsApi';
import { useForm } from 'react-hook-form';

interface RoomUpdateFormProps {
  room: Room;
  onSubmit?: (data: Room) => void;
}

function RoomUpdateForm({ room, onSubmit }: RoomUpdateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      room_number: room.room_number,
      room_type_id: room.room_type_id,
      is_active: room.is_active,
    },
  });

  const onFormSubmit = (data: UpdateRoomData) => {
    if (onSubmit) {
      console.log('data', data);
      //   onSubmit({ ...room, ...data });
    } else {
      console.log('Updated room data:', { ...room, ...data });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-md'
    >
      <div className='mb-5'>
        <label
          htmlFor='room_number'
          className='block mb-2 text-sm font-semibold text-gray-700'
        >
          Room Number
        </label>
        <input
          id='room_number'
          {...register('room_number', { required: 'Room number is required' })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.room_number ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='Enter room number'
        />
        {errors.room_number && (
          <p className='mt-1 text-sm text-red-600'>
            {errors.room_number.message}
          </p>
        )}
      </div>

      <div className='mb-5'>
        <label
          htmlFor='room_type_id'
          className='block mb-2 text-sm font-semibold text-gray-700'
        >
          Room Type ID
        </label>
        <input
          id='room_type_id'
          {...register('room_type_id')}
          disabled
          className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed'
          aria-describedby='room-type-name'
        />
        <p
          id='room-type-name'
          className='mt-1 text-sm italic text-gray-600 select-none'
        >
          {room.room_type.name}
        </p>
      </div>

      <div className='flex items-center mb-6'>
        <input
          id='is_active'
          type='checkbox'
          {...register('is_active')}
          className='w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
        />
        <label
          htmlFor='is_active'
          className='block ml-3 text-sm font-medium text-gray-700 select-none'
        >
          Active
        </label>
      </div>

      <button
        type='submit'
        className='w-full px-4 py-2 font-semibold text-white transition duration-150 bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        Update Room
      </button>
    </form>
  );
}

export default RoomUpdateForm;
