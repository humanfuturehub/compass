import { isStepComplete, isUnitComplete, stepStates, type ProgressMap } from '@/lib/content/path';
import type { Course } from '@/lib/content/types';
import { db } from './client';

// Admin reads, scoped to one institution_id resolved from the admin cookie.
// Aggregation happens here in application code; v1 institutions have tens of
// learners, and a SQL view can replace this without changing the page.

export type AdminStats = { issued: number; activated: number; completed: number; certificates: number };

export type LearnerRow = {
  learnerId: string;
  staffRef: string;
  currentStep: string | null; // null = course complete
  unitsComplete: number;
  unitsTotal: number;
  hours: number;
  lastActiveAt: string;
  completedAt: string | null;
};

export type ItemRow = { questionId: string; attempts: number; correct: number; pct: number; flagged: boolean };

export const ITEM_FLAG_BELOW_PCT = 55;

type LearnerRecord = { id: string; last_seen_at: string; seats: { staff_ref: string | null } | null };

export async function loadAdminData(institutionId: string, course: Course) {
  const [seats, learners] = await Promise.all([
    db().from('seats').select('id, activated_at').eq('institution_id', institutionId),
    db().from('learners').select('id, last_seen_at, seats ( staff_ref )').eq('institution_id', institutionId),
  ]);
  if (seats.error) throw seats.error;
  if (learners.error) throw learners.error;
  const learnerRecords = (learners.data ?? []) as unknown as LearnerRecord[];
  const ids = learnerRecords.map((row) => row.id);

  const [progress, attempts, certificates] = ids.length
    ? await Promise.all([
        db().from('progress').select('learner_id, unit_id, status, time_on_task_s, completed_at').in('learner_id', ids),
        db().from('check_attempts').select('question_id, is_correct').in('learner_id', ids).eq('attempt_no', 1).not('is_correct', 'is', null),
        db().from('certificates').select('learner_id, issued_at').in('learner_id', ids),
      ])
    : [{ data: [], error: null }, { data: [], error: null }, { data: [], error: null }];
  if (progress.error) throw progress.error;
  if (attempts.error) throw attempts.error;
  if (certificates.error) throw certificates.error;

  type P = { learner_id: string; unit_id: string; status: 'started' | 'complete'; time_on_task_s: number; completed_at: string | null };
  const byLearner = new Map<string, P[]>();
  for (const row of (progress.data ?? []) as P[]) {
    byLearner.set(row.learner_id, [...(byLearner.get(row.learner_id) ?? []), row]);
  }
  const certByLearner = new Map(
    ((certificates.data ?? []) as { learner_id: string; issued_at: string }[]).map((c) => [c.learner_id, c.issued_at]),
  );
  const unitsTotal = course.steps.reduce((sum, step) => sum + step.units.length, 0);

  const rows: LearnerRow[] = learnerRecords.map((learner) => {
    const own = byLearner.get(learner.id) ?? [];
    const map: Record<string, 'started' | 'complete'> = {};
    for (const p of own) map[p.unit_id] = p.status;
    const progressMap: ProgressMap = map;
    const current = stepStates(course, progressMap).find((s) => s.state === 'current');
    const allDone = course.steps.every((step) => isStepComplete(step, progressMap));
    const unitsComplete = course.steps.flatMap((s) => s.units).filter((u) => isUnitComplete(progressMap, u.id)).length;
    const lastCompleted = own.map((p) => p.completed_at).filter((d): d is string => !!d).sort().at(-1) ?? null;
    return {
      learnerId: learner.id,
      staffRef: learner.seats?.staff_ref ?? '—',
      currentStep: allDone ? null : (current?.step.title ?? null),
      unitsComplete,
      unitsTotal,
      hours: Math.round((own.reduce((sum, p) => sum + p.time_on_task_s, 0) / 3600) * 100) / 100,
      lastActiveAt: learner.last_seen_at,
      completedAt: certByLearner.get(learner.id) ?? (allDone ? lastCompleted : null),
    };
  });

  const stats: AdminStats = {
    issued: seats.data?.length ?? 0,
    activated: (seats.data ?? []).filter((s: { activated_at: string | null }) => s.activated_at).length,
    completed: rows.filter((r) => r.currentStep === null).length,
    certificates: certByLearner.size,
  };

  const tally = new Map<string, { attempts: number; correct: number }>();
  for (const a of (attempts.data ?? []) as { question_id: string; is_correct: boolean }[]) {
    const t = tally.get(a.question_id) ?? { attempts: 0, correct: 0 };
    t.attempts += 1;
    if (a.is_correct) t.correct += 1;
    tally.set(a.question_id, t);
  }
  const items: ItemRow[] = [...tally.entries()]
    .map(([questionId, t]) => {
      const pct = Math.round((t.correct / t.attempts) * 100);
      return { questionId, attempts: t.attempts, correct: t.correct, pct, flagged: pct < ITEM_FLAG_BELOW_PCT };
    })
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  return { stats, rows, items };
}

export type Institution = { id: string; name: string; localeDefault: 'de' | 'en' };

export async function getInstitution(id: string): Promise<Institution | null> {
  const { data, error } = await db().from('institutions').select('id, name, locale_default').eq('id', id).maybeSingle();
  if (error) throw error;
  const row = data as { id: string; name: string; locale_default: 'de' | 'en' } | null;
  return row ? { id: row.id, name: row.name, localeDefault: row.locale_default } : null;
}
