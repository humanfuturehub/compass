'use server';

import { z } from 'zod';
import type { AssessmentAnswer } from '@/components/learner/AssessmentRunner';
import { getAssessment } from '@/lib/content/load';
import { insertAssessment } from '@/lib/db/assessments';
import { touchLearner } from '@/lib/db/learners';
import { markComplete } from '@/lib/db/progress';
import { getLearnerContext } from '@/lib/learner/context';
import { gateRequiredUnit, timeCapSeconds } from '@/lib/learner/gate';

const Answers = z.array(z.object({ questionId: z.string().min(1), optionId: z.string().nullable() }));

/**
 * Stores the 12 answers with a server-computed score and completes the unit.
 * The client's isCorrect is ignored; the instrument in content is the truth.
 */
export async function submitAssessment(
  stepId: string,
  unitId: string,
  submitted: { questionId: string; optionId: string | null }[],
): Promise<void> {
  const ctx = await getLearnerContext();
  const location = gateRequiredUnit(ctx, stepId, unitId);
  if (location.unit.type !== 'assessment') return;

  const instrument = getAssessment(ctx.learner.locale);
  const parsed = Answers.safeParse(submitted);
  if (!parsed.success) return;
  const byId = new Map(parsed.data.map((answer) => [answer.questionId, answer.optionId]));

  const answers: AssessmentAnswer[] = instrument.map((question) => {
    const optionId = byId.get(question.id) ?? null;
    const valid = optionId !== null && question.options.some((option) => option.id === optionId);
    return {
      questionId: question.id,
      optionId: valid ? optionId : null,
      isCorrect: valid && optionId === question.correctOptionId,
    };
  });
  const score = answers.filter((answer) => answer.isCorrect).length;

  await insertAssessment(ctx.learner.id, location.unit.phase, score, answers);
  await markComplete(ctx.learner.id, stepId, unitId, 0, timeCapSeconds(location));
  await touchLearner(ctx.learner.id);
}
