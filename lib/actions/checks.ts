'use server';

import { allUnits } from '@/lib/content/load';
import { insertAttempt } from '@/lib/db/checks';
import { getLearnerContext } from '@/lib/learner/context';

// Every selection writes a check_attempt with attempt_no (SPEC 6.6). Correctness is
// taken from content on the server, never from the client. Failures are swallowed:
// a logging problem must never block a learner.

export async function recordAttempt(questionId: string, optionId: string): Promise<void> {
  try {
    const ctx = await getLearnerContext();
    const question = allUnits(ctx.course)
      .flatMap(({ unit }) => (unit.type === 'wissenscheck' ? unit.questions : []))
      .find((q) => q.id === questionId);
    if (!question || !question.options.some((option) => option.id === optionId)) return;
    await insertAttempt(ctx.learner.id, questionId, optionId, optionId === question.correctOptionId);
  } catch (error) {
    console.error('recordAttempt failed', error);
  }
}

/** Scenario choices have no correct answer: is_correct is NULL, question_id is the unit. */
export async function recordScenarioChoice(unitId: string, responseId: string): Promise<void> {
  try {
    const ctx = await getLearnerContext();
    const scenario = allUnits(ctx.course).find(({ unit }) => unit.id === unitId)?.unit;
    if (!scenario || scenario.type !== 'szenario') return;
    if (!scenario.responses.some((response) => response.id === responseId)) return;
    await insertAttempt(ctx.learner.id, unitId, responseId, null);
  } catch (error) {
    console.error('recordScenarioChoice failed', error);
  }
}
