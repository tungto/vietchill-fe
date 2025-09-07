'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiClient } from '@/lib/api/apiClient';

const schema = yup.object({
	check_in_date: yup.string().required('Chọn ngày nhận phòng'),
	check_out_date: yup.string().required('Chọn ngày trả phòng'),
	phone: yup.string().required('Vui lòng nhập số điện thoại'),
});

export type BookingFormData = yup.InferType<typeof schema>;

export function useBookingForm() {
	const [loading, setLoading] = useState(false);

	const form = useForm<BookingFormData>({
		resolver: yupResolver(schema),
	});

	const submitBooking = async (data: BookingFormData) => {
		setLoading(true);

		const payload = {
			room_type_id: 4, // you can make this dynamic later
			check_in_date: data.check_in_date,
			check_out_date: data.check_out_date,
			phone: data.phone,
			adult: 2,
			children: 0,
		};

		try {
			await apiClient.post('/user/bookings', payload);
			return true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('Booking failed:', error.message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { ...form, loading, submitBooking };
}
