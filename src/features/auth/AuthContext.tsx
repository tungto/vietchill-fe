// context/AuthContext.tsx
'use client';

import { apiClient } from '@/lib/api/apiClient';
import { GetProfileResponse, Profile } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextValue {
	user: Profile | null;
	setUser: (user: Profile | null) => void;
	loading: boolean; // new: to track hydration
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<Profile | null>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('profile');
			return stored ? JSON.parse(stored) : null;
		}
		return null;
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const { data } = await apiClient.get<GetProfileResponse>(
					'/auth/profile'
				);
				setUser(data.data);

				localStorage.setItem('profile', JSON.stringify(data.data));
			} catch {
				setUser(null);
				localStorage.removeItem('profile');
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}
