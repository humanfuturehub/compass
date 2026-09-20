import { z } from 'zod';
import { getCourse } from '@/lib/content/load';
import { findUnit } from '@/lib/content/load';
import { unitEstimateMinutes } from '@/lib/content/path';
import { recordVisit } from '@/lib/db/progress';
import { getLearner } from '@/lib/session/resolve';

// Target for navigator.sendBeacon on visibilitychange (SPEC 6.4). Records a visit
// and time on task only; completion goes through the completeUnit server action.

const Body = z.object({
  stepId: z.string().min(1),
  unitId: z.string().min(1),
  seconds: z.number().min(0).max(24 * 60 * 60),
});

export async function POST(request: Request): Promise<Response> {
  const learner = await getLearner();
  if (!learner) return new Response(null, { status: 401 });

  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return new Response(null, { status: 400 });
  const { stepId, unitId, seconds } = parsed.data;

  const location = findUnit(getCourse(learner.locale), stepId, unitId);
  if (!location || location.isExtra) return new Response(null, { status: 404 });

  const cap = Math.round(unitEstimateMinutes(location.step) * 60 * 3);
  await recordVisit(learner.id, stepId, unitId, seconds, cap);
  return new Response(null, { status: 204 });
}
