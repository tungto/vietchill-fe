import React from 'react';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/api/authGuard';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAuth();

  if (!profile) {
    // If somehow unauthenticated here (edge case), redirect to login
    redirect('/vietstay/login');
  }

  return (
    <div>
      <header className='p-4 bg-gray-100 border-b'>
        <p>Chào mừng, {profile.data.name}</p>
      </header>
      <main>{children}</main>
    </div>
  );
}
