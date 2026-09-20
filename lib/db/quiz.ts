import { db } from './client';

export async function insertQuizRun(sessionHash: string, score: number, itemsTotal: number): Promise<void> {
  const { error } = await db()
    .from('public_quiz_runs')
    .insert({ session_hash: sessionHash, score, items_total: itemsTotal });
  if (error) throw error;
}
