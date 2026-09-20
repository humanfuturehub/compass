'use server';

import { redirect } from 'next/navigation';
import { totalCourseHours } from '@/lib/content/path';
import { upsertCertificate } from '@/lib/db/certificates';
import { touchLearner } from '@/lib/db/learners';
import { markComplete } from '@/lib/db/progress';
import { getLearnerContext } from '@/lib/learner/context';
import { gateRequiredUnit, timeCapSeconds } from '@/lib/learner/gate';

/** Issues (or re-names) the certificate, completes the unit, shows /zertifikat/{id}. */
export async function issueCertificate(stepId: string, unitId: string, formData: FormData): Promise<void> {
  const ctx = await getLearnerContext();
  const location = gateRequiredUnit(ctx, stepId, unitId);
  if (location.unit.type !== 'zertifikat') return;

  const raw = String(formData.get('displayName') ?? '').trim().slice(0, 80);
  const displayName = raw || ctx.learner.staffRef || '—';
  const modules = ctx.course.steps.filter((step) => step.kind === 'modul').map((step) => step.title);

  const certificate = await upsertCertificate(
    ctx.learner.id,
    displayName,
    totalCourseHours(ctx.course),
    modules,
  );
  await markComplete(ctx.learner.id, stepId, unitId, 0, timeCapSeconds(location));
  await touchLearner(ctx.learner.id);
  redirect(`/zertifikat/${certificate.id}`);
}
