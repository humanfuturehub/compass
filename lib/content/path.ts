// Pure helpers for the linear path (SPEC 6.2–6.5). No I/O, no framework imports,
// so every gating rule can be reasoned about and tested in isolation.

import type { DotState } from '@/components/UnitDots';
import type { ModuleState } from '@/components/ModuleCard';
import type { Course, Step } from './types';

export type ProgressStatus = 'started' | 'complete';
/** unitId → status */
export type ProgressMap = Readonly<Record<string, ProgressStatus>>;

export function isUnitComplete(progress: ProgressMap, unitId: string): boolean {
  return progress[unitId] === 'complete';
}

/** Required units only. Extras never count. */
export function isStepComplete(step: Step, progress: ProgressMap): boolean {
  return step.units.every((unit) => isUnitComplete(progress, unit.id));
}

/** A step is unlocked when the previous step is complete; the first is always unlocked. */
export function isStepUnlocked(course: Course, stepId: string, progress: ProgressMap): boolean {
  const index = course.steps.findIndex((step) => step.id === stepId);
  if (index <= 0) return index === 0;
  return isStepComplete(course.steps[index - 1] as Step, progress);
}

export type StepWithState = { step: Step; state: ModuleState; previous?: Step };

export function stepStates(course: Course, progress: ProgressMap): StepWithState[] {
  let unlocked = true;
  return course.steps.map((step, i) => {
    const previous = i > 0 ? course.steps[i - 1] : undefined;
    const complete = isStepComplete(step, progress);
    let state: ModuleState;
    if (complete) state = 'done';
    else if (unlocked) state = 'current';
    else state = 'locked';
    unlocked = complete;
    return { step, state, previous };
  });
}

export type UnitRef = { stepId: string; unitId: string };

/** Where "resume" lands: the first required unit that is not complete, or null when done. */
export function firstIncomplete(course: Course, progress: ProgressMap): UnitRef | null {
  for (const step of course.steps) {
    for (const unit of step.units) {
      if (!isUnitComplete(progress, unit.id)) return { stepId: step.id, unitId: unit.id };
    }
  }
  return null;
}

export type NextTarget =
  | { kind: 'unit'; stepId: string; unitId: string }
  | { kind: 'step-end'; stepId: string }
  | { kind: 'course-end' };

/** What follows a required unit once it is complete. */
export function nextAfter(course: Course, stepId: string, unitId: string): NextTarget {
  const stepIndex = course.steps.findIndex((step) => step.id === stepId);
  const step = course.steps[stepIndex];
  if (!step) return { kind: 'course-end' };
  const unitIndex = step.units.findIndex((unit) => unit.id === unitId);
  const next = step.units[unitIndex + 1];
  if (next) return { kind: 'unit', stepId, unitId: next.id };
  if (stepIndex === course.steps.length - 1) return { kind: 'course-end' };
  return { kind: 'step-end', stepId };
}

export function unitDotStates(step: Step, unitId: string, progress: ProgressMap): DotState[] {
  return step.units.map((unit) => {
    if (unit.id === unitId) return 'current';
    return isUnitComplete(progress, unit.id) ? 'done' : 'todo';
  });
}

/** 1-based position and total for "Modul n von total". Every step counts, extras never. */
export function stepPosition(course: Course, stepId: string): { n: number; total: number } {
  return { n: course.steps.findIndex((step) => step.id === stepId) + 1, total: course.steps.length };
}

/** A unit's share of its step's estimate; the server caps time on task at 3× this. */
export function unitEstimateMinutes(step: Step): number {
  return step.estimatedMinutes / step.units.length;
}

/** Minutes left in the course from this unit on (inclusive), by content estimates. */
export function remainingMinutes(course: Course, stepId: string, unitId: string): number {
  const stepIndex = course.steps.findIndex((step) => step.id === stepId);
  const step = course.steps[stepIndex];
  if (!step) return 0;
  const unitIndex = Math.max(0, step.units.findIndex((unit) => unit.id === unitId));
  const inThisStep = unitEstimateMinutes(step) * (step.units.length - unitIndex);
  const later = course.steps.slice(stepIndex + 1).reduce((sum, s) => sum + s.estimatedMinutes, 0);
  return Math.max(1, Math.round(inThisStep + later));
}

export function totalCourseHours(course: Course): number {
  const minutes = course.steps.reduce((sum, step) => sum + step.estimatedMinutes, 0);
  return Math.round((minutes / 60) * 4) / 4;
}
