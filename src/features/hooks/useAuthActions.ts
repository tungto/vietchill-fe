// hooks/useAuthActions.ts
'use client';

import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/apiClient';
import { useAuth } from '../auth/AuthContext';
import { Profile } from '@/types/vietstay';

export function useAuthActions() {
  const router = useRouter();
  const { setUser } = useAuth();

  async function login(email: string, password: string) {
    try {
      const res = await apiClient.post('/auth/login', {
        email,
        password,
      });
      const result = res.data;

      if (!result.success) {
        throw new Error(result.message || 'Login failed');
      }

      const token = result.data.token;
      const profile = result.data.user as Profile; // adjust if API differs

      // Save token
      localStorage.setItem('access_token', token);

      // Save profile
      localStorage.setItem('profile', JSON.stringify(profile));

      // Also store token as cookie for server guard
      document.cookie = `auth_token=${token}; path=/; secure; samesite=lax`;

      // 🔑 Update context so Navbar updates immediately
      setUser(profile);

      if (profile.role === 'user') {
        router.push('/vietstay/rooms');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      throw err; // let component handle errors
    }
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    document.cookie =
      'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    router.refresh();
  }

  return { login, logout };
}
