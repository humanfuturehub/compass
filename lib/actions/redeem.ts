'use server';

import { redirect } from 'next/navigation';
import { activateSeat, createLearnerForSeat, findSeatByCode } from '@/lib/db/learners';
import { setSessionCookie } from '@/lib/session/cookie';
import { createSessionToken, learnerIdFromToken } from '@/lib/session/resolve';

export type RedeemState = { error?: 'format' | 'unknown' | 'used' };

const CODE = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$/;

function normaliseCode(raw: string): string {
  return raw.toUpperCase().replace(/[\s-]/g, '');
}

/** Seat-code redemption (SPEC 6.1). Codes are single-use. */
export async function redeemSeat(_prev: RedeemState, formData: FormData): Promise<RedeemState> {
  const code = normaliseCode(String(formData.get('code') ?? ''));
  if (!CODE.test(code)) return { error: 'format' };

  const seat = await findSeatByCode(code);
  if (!seat) return { error: 'unknown' };
  if (seat.activatedAt) return { error: 'used' };

  const learnerId = await createLearnerForSeat(seat);
  if (!learnerId) return { error: 'used' };
  await activateSeat(seat.id);

  await setSessionCookie(await createSessionToken(learnerId));
  redirect('/fortsetzen');
}

/** Resume link: the token is only consumed on POST, so link previews cannot use it up. */
export async function resumeWithToken(formData: FormData): Promise<void> {
  const token = String(formData.get('t') ?? '');
  const learnerId = await learnerIdFromToken(token);
  if (!learnerId) redirect('/fortsetzen?ungueltig=1');
  // Re-sign rather than reuse: the cookie gets a fresh 180-day expiry.
  await setSessionCookie(await createSessionToken(learnerId));
  redirect('/kurs');
}
