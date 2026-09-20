import { cache } from 'react';
import { ADMIN_HOURS, readAdminToken } from './cookie';
import { sessionSecret } from './resolve';
import { signToken, verifyToken, type TokenPayload } from './sign';

export type AdminPayload = TokenPayload & { v: 1; iid: string };

/** ADMIN_ACCESS_CODES is `institution_id:CODE,institution_id:CODE` (NOTES.md). */
export function institutionForAccessCode(code: string): string | null {
  const wanted = code.trim().toUpperCase();
  if (!wanted) return null;
  for (const entry of (process.env.ADMIN_ACCESS_CODES ?? '').split(',')) {
    const [institutionId, entryCode] = entry.trim().split(':');
    if (institutionId && entryCode && entryCode.trim().toUpperCase() === wanted) return institutionId;
  }
  return null;
}

export async function createAdminToken(institutionId: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + ADMIN_HOURS * 60 * 60;
  return signToken({ v: 1, iid: institutionId, exp }, sessionSecret());
}

/** Institution id behind the admin cookie, or null. */
export const getAdminInstitution = cache(async (): Promise<string | null> => {
  const token = await readAdminToken();
  if (!token) return null;
  const payload = await verifyToken<AdminPayload>(token, sessionSecret());
  return payload?.v === 1 && typeof payload.iid === 'string' ? payload.iid : null;
});
