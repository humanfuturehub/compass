import type { ProgressMap, ProgressStatus } from '@/lib/content/path';
import { db } from './client';

type ProgressRow = { unit_id: string; status: ProgressStatus; time_on_task_s: number };

export async function getProgress(learnerId: string): Promise<ProgressMap> {
  const { data, error } = await db()
    .from('progress')
    .select('unit_id, status')
    .eq('learner_id', learnerId);
  if (error) throw error;
  const map: Record<string, ProgressStatus> = {};
  for (const row of (data ?? []) as Pick<ProgressRow, 'unit_id' | 'status'>[]) {
    map[row.unit_id] = row.status;
  }
  return map;
}

async function getRow(learnerId: string, unitId: string): Promise<ProgressRow | null> {
  const { data, error } = await db()
    .from('progress')
    .select('unit_id, status, time_on_task_s')
    .eq('learner_id', learnerId)
    .eq('unit_id', unitId)
    .maybeSingle();
  if (error) throw error;
  return data as ProgressRow | null;
}

function cappedTime(existing: ProgressRow | null, seconds: number, capSeconds: number): number {
  return Math.min(capSeconds, (existing?.time_on_task_s ?? 0) + Math.max(0, Math.round(seconds)));
}

/**
 * Records a visit and adds time on task. Never downgrades `complete` to `started`.
 * Time is capped at `capSeconds` (3× the unit estimate) to exclude abandoned tabs.
 */
export async function recordVisit(
  learnerId: string,
  stepId: string,
  unitId: string,
  seconds: number,
  capSeconds: number,
): Promise<void> {
  const existing = await getRow(learnerId, unitId);
  const { error } = await db()
    .from('progress')
    .upsert(
      {
        learner_id: learnerId,
        step_id: stepId,
        unit_id: unitId,
        status: existing?.status ?? 'started',
        time_on_task_s: cappedTime(existing, seconds, capSeconds),
      },
      { onConflict: 'learner_id,unit_id' },
    );
  if (error) throw error;
}

/** Marks a unit complete, keeping the first completion time. */
export async function markComplete(
  learnerId: string,
  stepId: string,
  unitId: string,
  seconds: number,
  capSeconds: number,
): Promise<void> {
  const existing = await getRow(learnerId, unitId);
  const { error } = await db()
    .from('progress')
    .upsert(
      {
        learner_id: learnerId,
        step_id: stepId,
        unit_id: unitId,
        status: 'complete',
        time_on_task_s: cappedTime(existing, seconds, capSeconds),
        ...(existing?.status === 'complete' ? {} : { completed_at: new Date().toISOString() }),
      },
      { onConflict: 'learner_id,unit_id' },
    );
  if (error) throw error;
}
