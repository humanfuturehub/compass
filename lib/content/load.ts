// Content loader. Validates every content file once, at first import. Statically
// rendered routes import this module, so `next build` fails on a schema violation.

import { z, type ZodType } from 'zod';
import { course as courseDe } from '@/content/de/course';
import { assessment as assessmentDe } from '@/content/de/assessment';
import { quiz as quizDe } from '@/content/de/quiz';
import { course as courseEn } from '@/content/en/course';
import { assessment as assessmentEn } from '@/content/en/assessment';
import type { Locale } from '@/lib/locale';
import { AssessmentSchema, CourseSchema, QuizSchema } from './schema';
import type { Assessment, Course, Quiz, Step, Unit } from './types';

function validate<T>(schema: ZodType<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Content invalid in ${label}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

const courses: Record<Locale, Course> = {
  de: validate(CourseSchema, courseDe, 'content/de/course.ts'),
  en: validate(CourseSchema, courseEn, 'content/en/course.ts'),
};

const assessments: Record<Locale, Assessment> = {
  de: validate(AssessmentSchema, assessmentDe, 'content/de/assessment.ts'),
  en: validate(AssessmentSchema, assessmentEn, 'content/en/assessment.ts'),
};

const quiz: Quiz = validate(QuizSchema, quizDe, 'content/de/quiz.ts');

export function getCourse(locale: Locale): Course {
  return courses[locale];
}

export function getAssessment(locale: Locale): Assessment {
  return assessments[locale];
}

/** The public quiz ships in German only in v1. */
export function getQuiz(): Quiz {
  return quiz;
}

export function findStep(course: Course, stepId: string): Step | undefined {
  return course.steps.find((step) => step.id === stepId);
}

export type UnitLocation = {
  step: Step;
  unit: Unit;
  /** index inside step.units; -1 for extras */
  index: number;
  isExtra: boolean;
};

export function findUnit(course: Course, stepId: string, unitId: string): UnitLocation | undefined {
  const step = findStep(course, stepId);
  if (!step) return undefined;
  const index = step.units.findIndex((unit) => unit.id === unitId);
  if (index !== -1) return { step, unit: step.units[index] as Unit, index, isExtra: false };
  const extra = step.extras?.find((unit) => unit.id === unitId);
  return extra ? { step, unit: extra, index: -1, isExtra: true } : undefined;
}

/** Every unit in the course, extras included, for the dev renderer. */
export function allUnits(course: Course): { stepId: string; unit: Unit; isExtra: boolean }[] {
  return course.steps.flatMap((step) => [
    ...step.units.map((unit) => ({ stepId: step.id, unit, isExtra: false })),
    ...(step.extras ?? []).map((unit) => ({ stepId: step.id, unit, isExtra: true })),
  ]);
}
