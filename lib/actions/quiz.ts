'use server';

import { z } from 'zod';
import { getQuiz } from '@/lib/content/load';
import { insertQuizRun } from '@/lib/db/quiz';

const Answers = z.array(z.object({ questionId: z.string().min(1), optionId: z.string().nullable() }));

export type QuizResult = { score: number; total: number; correct: Record<string, boolean> };

async function anonymousSessionHash(): Promise<string> {
  const bytes = new TextEncoder().encode(crypto.randomUUID());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Scores the public quiz on the server and stores an anonymous run: a hash of a
 * random id, no cookie, no personal data. Works with cookies blocked.
 */
export async function submitQuiz(
  submitted: { questionId: string; optionId: string | null }[],
): Promise<QuizResult> {
  const quiz = getQuiz();
  const parsed = Answers.safeParse(submitted);
  const byId = new Map(parsed.success ? parsed.data.map((a) => [a.questionId, a.optionId]) : []);
  const correct: Record<string, boolean> = {};
  for (const question of quiz) correct[question.id] = byId.get(question.id) === question.correctOptionId;
  const score = Object.values(correct).filter(Boolean).length;
  try {
    await insertQuizRun(await anonymousSessionHash(), score, quiz.length);
  } catch (error) {
    console.error('insertQuizRun failed', error);
  }
  return { score, total: quiz.length, correct };
}
