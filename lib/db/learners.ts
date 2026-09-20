import type { Locale } from '@/lib/locale';
import { db, UNIQUE_VIOLATION } from './client';

export type Seat = {
  id: string;
  institutionId: string;
  staffRef: string | null;
  activatedAt: string | null;
  localeDefault: Locale;
};

export type Learner = {
  id: string;
  seatId: string;
  institutionId: string;
  locale: Locale;
  displayName: string | null;
  staffRef: string | null;
};

type SeatRow = {
  id: string;
  institution_id: string;
  staff_ref: string | null;
  activated_at: string | null;
  institutions: { locale_default: Locale } | null;
};

type LearnerRow = {
  id: string;
  seat_id: string;
  institution_id: string;
  locale: Locale;
  display_name: string | null;
  seats: { staff_ref: string | null } | null;
};

export async function findSeatByCode(code: string): Promise<Seat | null> {
  const { data, error } = await db()
    .from('seats')
    .select('id, institution_id, staff_ref, activated_at, institutions ( locale_default )')
    .eq('code', code)
    .maybeSingle();
  if (error) throw error;
  const row = data as unknown as SeatRow | null;
  if (!row) return null;
  return {
    id: row.id,
    institutionId: row.institution_id,
    staffRef: row.staff_ref,
    activatedAt: row.activated_at,
    localeDefault: row.institutions?.locale_default ?? 'de',
  };
}

/** Inserts the learner for a seat. Returns null when the seat was already redeemed. */
export async function createLearnerForSeat(seat: Seat): Promise<string | null> {
  const { data, error } = await db()
    .from('learners')
    .insert({ seat_id: seat.id, institution_id: seat.institutionId, locale: seat.localeDefault })
    .select('id')
    .single();
  if (error) {
    if (error.code === UNIQUE_VIOLATION) return null;
    throw error;
  }
  return (data as { id: string }).id;
}

export async function activateSeat(seatId: string): Promise<void> {
  const { error } = await db()
    .from('seats')
    .update({ activated_at: new Date().toISOString() })
    .eq('id', seatId)
    .is('activated_at', null);
  if (error) throw error;
}

export async function getLearnerById(id: string): Promise<Learner | null> {
  const { data, error } = await db()
    .from('learners')
    .select('id, seat_id, institution_id, locale, display_name, seats ( staff_ref )')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  const row = data as unknown as LearnerRow | null;
  if (!row) return null;
  return {
    id: row.id,
    seatId: row.seat_id,
    institutionId: row.institution_id,
    locale: row.locale,
    displayName: row.display_name,
    staffRef: row.seats?.staff_ref ?? null,
  };
}

export async function touchLearner(id: string): Promise<void> {
  const { error } = await db()
    .from('learners')
    .update({ last_seen_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}
