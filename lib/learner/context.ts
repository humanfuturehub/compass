import { cache } from 'react';
import { getCourse } from '@/lib/content/load';
import type { ProgressMap } from '@/lib/content/path';
import type { Course } from '@/lib/content/types';
import { getProgress } from '@/lib/db/progress';
import type { Learner } from '@/lib/db/learners';
import { requireLearner } from '@/lib/session/resolve';

export type LearnerContext = { learner: Learner; course: Course; progress: ProgressMap };

/** Learner, their course and their progress, resolved once per request. */
export const getLearnerContext = cache(async (): Promise<LearnerContext> => {
  const learner = await requireLearner();
  const course = getCourse(learner.locale);
  const progress = await getProgress(learner.id);
  return { learner, course, progress };
});
