'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  GetProfileResponse,
  UpdatePasswordPayload,
} from '@/features/vietstay/auth/types/user';

interface ProfileFormData {
  name: string;
  phone: string;
  dob: string;
  address: string;
}
import {
  changePassword,
  getProfile,
  updateProfile,
  uploadAvatar,
} from '@/features/vietstay/auth/api/user';

export const profileSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên'),
  phone: yup.string().required('Vui lòng nhập số điện thoại'),
  dob: yup.string().required('Vui lòng chọn ngày sinh'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
});

const passwordSchema = yup.object({
  current_password: yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  password: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    .required(),
});

export function useProfile() {
  const [profile, setProfile] = useState<GetProfileResponse['data'] | null>(
    null,
  );
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      phone: '',
      dob: '',
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
          address: res.data.address,
        });
      } catch (err: unknown) {
        console.error(err);
      }
    }
    fetchProfile();
  }, [reset]);

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      await updateProfile(data);
      alert('Cập nhật thành công!');
      // Refresh profile data
      const res = await getProfile();
      setProfile(res.data);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : 'Cập nhật thất bại!';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitAvatar = async () => {
    if (!avatar) return;

    try {
      setLoading(true);
      // First upload the image to get the path
      const uploadResponse = await uploadAvatar(avatar);
      const imagePath = uploadResponse.data.path;

      // Then update the profile with the new avatar path
      await updateProfile({ avatar: imagePath });

      alert('Cập nhật ảnh đại diện thành công!');

      // Refresh profile data and clear selected avatar
      const res = await getProfile();
      setProfile(res.data);
      setAvatar(null);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : 'Cập nhật ảnh đại diện thất bại!';
      alert(errorMessage);
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
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : 'Đổi mật khẩu thất bại!';
      alert(errorMessage);
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
    // Avatar upload
    onSubmitAvatar,
    // Password form
    registerPassword,
    handleSubmitPassword,
    errorsPassword,
    onSubmitPassword,
  };
}

export type UseProfileReturn = ReturnType<typeof useProfile>;
