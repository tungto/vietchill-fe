'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	GetProfileResponse,
	UpdatePasswordPayload,
	UpdateProfilePayload,
} from '@/types/user';
import { changePassword, getProfile, updateProfile } from '@/lib/api/user';

export const profileSchema = yup.object({
	name: yup.string().required('Vui lòng nhập tên'),
	phone: yup.string().required('Vui lòng nhập số điện thoại'),
	dob: yup.string().required('Vui lòng chọn ngày sinh'),
	address: yup.string().required('Vui lòng nhập địa chỉ'),
});

const passwordSchema = yup.object({
	newPassword: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
		.required(),
});

export function useProfile() {
	const [profile, setProfile] = useState<GetProfileResponse['data'] | null>(
		null
	);
	const [avatar, setAvatar] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdateProfilePayload>({
		resolver: yupResolver(profileSchema),
		defaultValues: {
			name: '',
			phone: '',
			dob: '',
			idCode: '',
			address: '',
		},
	});

	const {
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		reset: resetPassword,
		formState: { errors: errorsPassword },
	} = useForm<UpdatePasswordPayload>({
		resolver: yupResolver(passwordSchema),
	});

	useEffect(() => {
		async function fetchProfile() {
			try {
				const res = await getProfile();
				setProfile(res.data);
				reset({
					name: res.data.name,
					phone: res.data.phone,
					dob: res.data.dob.slice(0, 10),
					idCode: '', // not in API but part of form
					address: res.data.address,
				});
			} catch (err) {
				console.error(err);
			}
		}
		fetchProfile();
	}, [reset]);

	const onSubmitProfile = async (data: UpdateProfilePayload) => {
		try {
			setLoading(true);
			await updateProfile({ ...data, avatar: avatar ?? undefined });
			alert('Cập nhật thành công!');
		} catch (err) {
			console.error(err);
			alert('Cập nhật thất bại!');
		} finally {
			setLoading(false);
		}
	};

	const onSubmitPassword = async (data: UpdatePasswordPayload) => {
		try {
			setLoading(true);
			await changePassword(data);
			alert('Đổi mật khẩu thành công!');
			resetPassword();
		} catch (err) {
			console.error(err);
			alert('Đổi mật khẩu thất bại!');
		} finally {
			setLoading(false);
		}
	};

	return {
		profile,
		avatar,
		setAvatar,
		loading,
		// Profile form
		register,
		handleSubmit,
		errors,
		onSubmitProfile,
		// Password form
		registerPassword,
		handleSubmitPassword,
		errorsPassword,
		onSubmitPassword,
	};
}

export type UseProfileReturn = ReturnType<typeof useProfile>;
