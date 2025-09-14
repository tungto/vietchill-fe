'use client';

import { useAuth } from '@/features/vietstay/auth/components/AuthContext';
import AvatarUpload from '@/features/vietstay/profile/components/AvatarUpload';
import PasswordForm from '@/features/vietstay/profile/components/PasswordForm';
import ProfileForm from '@/features/vietstay/profile/components/ProfileForm';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/features/vietstay/profile/api/useProfile';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const profileHook = useProfile();

  if (authLoading) {
    return <CircularProgress />;
  }

  if (!user) {
    router.push('/');
    return;
  }

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-6 mt-16'>
      <ProfileForm {...profileHook} />
      <AvatarUpload {...profileHook} />
      <PasswordForm {...profileHook} />
    </div>
  );
}
