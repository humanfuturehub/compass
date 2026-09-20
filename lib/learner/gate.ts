import { redirect } from 'next/navigation';
import { findUnit, type UnitLocation } from '@/lib/content/load';
import { firstIncomplete, isStepUnlocked, isUnitComplete, unitEstimateMinutes } from '@/lib/content/path';
import type { LearnerContext } from './context';

/** Where the learner belongs right now: the first incomplete unit, or the overview. */
export function currentUnitPath(ctx: LearnerContext): string {
  const next = firstIncomplete(ctx.course, ctx.progress);
  return next ? `/kurs/${next.stepId}/${next.unitId}` : '/uebersicht';
}

/**
 * Resolves a required unit the learner may open: a completed one, or the first
 * incomplete unit of an unlocked step. Anything else redirects to the current unit
 * instead of showing an error (SPEC 6.2).
 */
export function gateRequiredUnit(ctx: LearnerContext, stepId: string, unitId: string): UnitLocation {
  const found = findUnit(ctx.course, stepId, unitId);
  if (!found || found.isExtra) redirect(currentUnitPath(ctx));
  if (!isStepUnlocked(ctx.course, stepId, ctx.progress)) redirect(currentUnitPath(ctx));
  const firstOpen = found.step.units.find((unit) => !isUnitComplete(ctx.progress, unit.id));
  const allowed = isUnitComplete(ctx.progress, unitId) || firstOpen?.id === unitId;
  if (!allowed) redirect(currentUnitPath(ctx));
  return found;
}

/** Extras open whenever their step is unlocked. They never write progress. */
export function gateExtraUnit(ctx: LearnerContext, stepId: string, unitId: string): UnitLocation {
  const found = findUnit(ctx.course, stepId, unitId);
  if (!found || !found.isExtra) redirect(currentUnitPath(ctx));
  if (!isStepUnlocked(ctx.course, stepId, ctx.progress)) redirect(currentUnitPath(ctx));
  return found;
}

/** 3× the unit's share of the step estimate, in seconds (SPEC 6.7). */
export function timeCapSeconds(location: UnitLocation): number {
  return Math.round(unitEstimateMinutes(location.step) * 60 * 3);
}
