import { db } from './client';

/** Inserts an attempt with the next attempt_no for this learner and question. */
export async function insertAttempt(
  learnerId: string,
  questionId: string,
  optionId: string,
  isCorrect: boolean | null,
): Promise<number> {
  const { count, error: countError } = await db()
    .from('check_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('learner_id', learnerId)
    .eq('question_id', questionId);
  if (countError) throw countError;

  const attemptNo = (count ?? 0) + 1;
  const { error } = await db().from('check_attempts').insert({
    learner_id: learnerId,
    question_id: questionId,
    option_id: optionId,
    is_correct: isCorrect,
    attempt_no: attemptNo,
  });
  if (error) throw error;
  return attemptNo;
}
