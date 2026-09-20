import { db } from './client';

export type Certificate = {
  id: string;
  learnerId: string;
  displayName: string;
  hours: number;
  modules: string[];
  issuedAt: string;
};

type Row = {
  id: string;
  learner_id: string;
  display_name: string;
  hours: number | string;
  modules: string[];
  issued_at: string;
};

function fromRow(row: Row): Certificate {
  return {
    id: row.id,
    learnerId: row.learner_id,
    displayName: row.display_name,
    hours: Number(row.hours),
    modules: row.modules,
    issuedAt: row.issued_at,
  };
}

/** One certificate per learner; re-issuing only updates the display name. */
export async function upsertCertificate(
  learnerId: string,
  displayName: string,
  hours: number,
  modules: string[],
): Promise<Certificate> {
  const { data, error } = await db()
    .from('certificates')
    .upsert(
      { learner_id: learnerId, display_name: displayName, hours, modules },
      { onConflict: 'learner_id' },
    )
    .select('id, learner_id, display_name, hours, modules, issued_at')
    .single();
  if (error) throw error;
  await db().from('learners').update({ display_name: displayName }).eq('id', learnerId);
  return fromRow(data as Row);
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  const { data, error } = await db()
    .from('certificates')
    .select('id, learner_id, display_name, hours, modules, issued_at')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as Row) : null;
}

export async function getCertificateForLearner(learnerId: string): Promise<Certificate | null> {
  const { data, error } = await db()
    .from('certificates')
    .select('id, learner_id, display_name, hours, modules, issued_at')
    .eq('learner_id', learnerId)
    .maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as Row) : null;
}
