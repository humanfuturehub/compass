import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getLearnerById, type Learner } from '@/lib/db/learners';
import { readSessionToken, SESSION_DAYS } from './cookie';
import { signToken, verifyToken, type TokenPayload } from './sign';

export type SessionPayload = TokenPayload & { v: 1; lid: string };

export function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) throw new Error('SESSION_SECRET is not configured');
  return secret;
}

export async function createSessionToken(learnerId: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 60 * 60;
  return signToken({ v: 1, lid: learnerId, exp }, sessionSecret());
}

export async function learnerIdFromToken(token: string): Promise<string | null> {
  const payload = await verifyToken<SessionPayload>(token, sessionSecret());
  return payload?.v === 1 && typeof payload.lid === 'string' ? payload.lid : null;
}

/** The learner behind the session cookie, resolved once per request. */
export const getLearner = cache(async (): Promise<Learner | null> => {
  const token = await readSessionToken();
  if (!token) return null;
  const learnerId = await learnerIdFromToken(token);
  if (!learnerId) return null;
  return getLearnerById(learnerId);
});

/** For learner pages: no session means the seat-code screen. */
export async function requireLearner(): Promise<Learner> {
  const learner = await getLearner();
  if (!learner) redirect('/');
  return learner;
}
