'use server';

import { redirect } from 'next/navigation';
import { clearAdminCookie, setAdminCookie } from '@/lib/session/cookie';
import { createAdminToken, institutionForAccessCode } from '@/lib/session/admin';

export type AdminLoginState = { error?: 'unknown' };

export async function adminLogin(_prev: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const institutionId = institutionForAccessCode(String(formData.get('code') ?? ''));
  if (!institutionId) return { error: 'unknown' };
  await setAdminCookie(await createAdminToken(institutionId));
  redirect('/admin');
}

export async function adminLogout(): Promise<void> {
  await clearAdminCookie();
  redirect('/admin');
}
