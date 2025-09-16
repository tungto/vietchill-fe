import React from 'react';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/features/shared/api/authGuard';

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

  return <main>{children}</main>;
}
