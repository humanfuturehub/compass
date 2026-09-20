'use server';

import { redirect } from 'next/navigation';
import { nextAfter } from '@/lib/content/path';
import { markComplete } from '@/lib/db/progress';
import { touchLearner } from '@/lib/db/learners';
import { getLearnerContext } from '@/lib/learner/context';
import { gateRequiredUnit, timeCapSeconds } from '@/lib/learner/gate';

/**
 * The unit footer's Weiter. Writes completion, then moves on: mid-step to the next
 * unit, at a step's end to the overview, at the course's end to the certificate.
 */
export async function completeUnit(stepId: string, unitId: string, formData: FormData): Promise<void> {
  const ctx = await getLearnerContext();
  const location = gateRequiredUnit(ctx, stepId, unitId);
  const seconds = Number(formData.get('seconds') ?? 0);

  await markComplete(ctx.learner.id, stepId, unitId, Number.isFinite(seconds) ? seconds : 0, timeCapSeconds(location));
  await touchLearner(ctx.learner.id);

  const next = nextAfter(ctx.course, stepId, unitId);
  if (next.kind === 'unit') redirect(`/kurs/${next.stepId}/${next.unitId}`);
  redirect('/uebersicht');
}
