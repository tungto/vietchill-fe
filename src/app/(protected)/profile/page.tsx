'use client';

import { useAuth } from '@/features/auth/AuthContext';
import AvatarUpload from './AvatarUpload';
import PasswordForm from './PasswordForm';
import ProfileForm from './ProfileForm';
import { useRouter } from 'next/navigation';
import { useProfile } from './useProfile';
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
