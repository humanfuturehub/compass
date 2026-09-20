import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'compass_session';
export const ADMIN_COOKIE = 'compass_admin';

export const SESSION_DAYS = 180;
export const ADMIN_HOURS = 12;

const base = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
} as const;

/** Only callable from a server action or route handler (Next sets cookies there). */
export async function setSessionCookie(token: string): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, token, { ...base, maxAge: SESSION_DAYS * 24 * 60 * 60 });
}

export async function clearSessionCookie(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function readSessionToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function setAdminCookie(token: string): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, token, { ...base, maxAge: ADMIN_HOURS * 60 * 60 });
}

export async function clearAdminCookie(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
}

export async function readAdminToken(): Promise<string | undefined> {
  return (await cookies()).get(ADMIN_COOKIE)?.value;
}
