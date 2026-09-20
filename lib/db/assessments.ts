import type { AssessmentAnswer } from '@/components/learner/AssessmentRunner';
import { db, UNIQUE_VIOLATION } from './client';

export type Phase = 'pre' | 'post';

export async function getStoredAssessment(
  learnerId: string,
  phase: Phase,
): Promise<AssessmentAnswer[] | null> {
  const { data, error } = await db()
    .from('assessments')
    .select('answers')
    .eq('learner_id', learnerId)
    .eq('phase', phase)
    .maybeSingle();
  if (error) throw error;
  return (data as { answers: AssessmentAnswer[] } | null)?.answers ?? null;
}

/** One row per learner and phase; the first submission is kept (NOTES.md). */
export async function insertAssessment(
  learnerId: string,
  phase: Phase,
  score: number,
  answers: AssessmentAnswer[],
): Promise<void> {
  const { error } = await db()
    .from('assessments')
    .insert({ learner_id: learnerId, phase, score, answers });
  if (error && error.code !== UNIQUE_VIOLATION) throw error;
}
