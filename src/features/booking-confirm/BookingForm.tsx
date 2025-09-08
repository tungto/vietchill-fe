'use client';

import { RoomType } from '@/types/vietstay';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../auth/AuthContext';
import { SuccessModal } from '../common/SuccessModal';
import { useBookingForm } from '../hooks/useBookingForm';

type FormData = {
  name: string;
  phone: string;
  address: string;
  check_in_date: string;
  check_out_date: string;
};

export default function BookingForm({ room }: { room: RoomType }) {
  const { user } = useAuth();
  const router = useRouter();
  const { submitBooking, loading } = useBookingForm();
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      check_in_date: '',
      check_out_date: '',
    },
  });

  // Reset form values when user changes (e.g. after login)
  useEffect(() => {
    reset({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      check_in_date: '',
      check_out_date: '',
    });
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    const ok = await submitBooking(data);

    console.log('ok', ok);
    if (ok) {
      setOpenModal(true);
    } else alert('Có lỗi xảy ra khi đặt phòng!');
  };

  const checkInDate = watch('check_in_date');
  const checkOutDate = watch('check_out_date');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-xl border shadow-sm p-6 space-y-4'
      noValidate
    >
      <h3 className='text-lg font-semibold mb-2'>Thông tin chi tiết</h3>

      <div>
        <label htmlFor='name' className='block text-sm font-medium'>
          Tên
        </label>
        <input
          id='name'
          type='text'
          {...register('name', {
            required: 'Tên không được để trống',
          })}
          className={clsx(
            'mt-1 w-full rounded-lg border px-3 py-2',
            errors.name && 'border-red-500'
          )}
          disabled={loading || isSubmitting}
        />
        {errors.name && (
          <p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='phone' className='block text-sm font-medium'>
          Số điện thoại
        </label>
        <input
          id='phone'
          type='text'
          {...register('phone', {
            required: 'Số điện thoại không được để trống',
            pattern: {
              value: /^[0-9]{9,15}$/,
              message: 'Số điện thoại không hợp lệ',
            },
          })}
          className={clsx(
            'mt-1 w-full rounded-lg border px-3 py-2',
            errors.phone && 'border-red-500'
          )}
          disabled={loading || isSubmitting}
        />
        {errors.phone && (
          <p className='text-sm text-red-500 mt-1'>{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='address' className='block text-sm font-medium'>
          Địa chỉ
        </label>
        <textarea
          id='address'
          {...register('address', {
            required: 'Địa chỉ không được để trống',
          })}
          className={clsx(
            'mt-1 w-full rounded-lg border px-3 py-2',
            errors.address && 'border-red-500'
          )}
          rows={3}
          disabled={loading || isSubmitting}
        />
        {errors.address && (
          <p className='text-sm text-red-500 mt-1'>{errors.address.message}</p>
        )}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label htmlFor='check_in_date' className='block text-sm font-medium'>
            Nhận phòng
          </label>
          <input
            id='check_in_date'
            type='date'
            {...register('check_in_date', {
              required: 'Vui lòng chọn ngày nhận phòng',
            })}
            className={clsx(
              'mt-1 w-full rounded-lg border px-3 py-2',
              errors.check_in_date && 'border-red-500'
            )}
            disabled={loading || isSubmitting}
          />
          {errors.check_in_date && (
            <p className='text-sm text-red-500 mt-1'>
              {errors.check_in_date.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='check_out_date' className='block text-sm font-medium'>
            Trả phòng
          </label>
          <input
            id='check_out_date'
            type='date'
            {...register('check_out_date', {
              required: 'Vui lòng chọn ngày trả phòng',
            })}
            className={clsx(
              'mt-1 w-full rounded-lg border px-3 py-2',
              errors.check_out_date && 'border-red-500'
            )}
            disabled={loading || isSubmitting}
          />
          {errors.check_out_date && (
            <p className='text-sm text-red-500 mt-1'>
              {errors.check_out_date.message}
            </p>
          )}
        </div>
      </div>

      <button
        type='submit'
        disabled={loading || isSubmitting}
        className='w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60'
      >
        {loading || isSubmitting ? 'Đang xử lý...' : 'Đặt phòng'}
      </button>

      <SuccessModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          router.push('/');
        }}
        bookingInfo={{
          hotelName: room.name,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          guests: 5,
        }}
      />
    </form>
  );
}
