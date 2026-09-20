// Content schema, SPEC.md Section 5, plus two unit types the path needs
// (assessment, zertifikat — see NOTES.md). Every content file is validated
// against these schemas when the loader is first imported, so a violation
// fails `next build` rather than a learner's screen.

import { z } from 'zod';

const id = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'ids are lowercase, digits and single hyphens');
const text = z.string().trim().min(1);

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

const paragraph = text.refine(
  (value) => {
    const n = wordCount(value);
    return n >= 40 && n <= 90;
  },
  { error: (issue) => `paragraph must be 40–90 words, has ${wordCount(String(issue.input))}` },
);

export const OptionSchema = z.object({
  id: text,
  text,
  // required on EVERY option, correct and incorrect
  explanation: text,
});

export const QuestionSchema = z
  .object({
    id,
    prompt: text,
    options: z.array(OptionSchema).min(3).max(4),
    correctOptionId: text,
  })
  .superRefine((question, ctx) => {
    const optionIds = question.options.map((option) => option.id);
    if (new Set(optionIds).size !== optionIds.length) {
      ctx.addIssue({ code: 'custom', message: `${question.id}: duplicate option ids` });
    }
    if (!optionIds.includes(question.correctOptionId)) {
      ctx.addIssue({
        code: 'custom',
        message: `${question.id}: correctOptionId "${question.correctOptionId}" is not an option`,
      });
    }
  });

const ErklaerungUnit = z.object({
  id,
  type: z.literal('erklaerung'),
  title: text,
  body: z.array(paragraph).min(1).max(3),
});

const TranskriptUnit = z.object({
  id,
  type: z.literal('transkript'),
  title: text,
  intro: text,
  turns: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        text,
        highlight: z.boolean().optional(),
      }),
    )
    .min(2),
  points: z.array(text).min(1),
});

const WissenscheckUnit = z.object({
  id,
  type: z.literal('wissenscheck'),
  title: text,
  questions: z.array(QuestionSchema).min(1),
});

const SzenarioUnit = z.object({
  id,
  type: z.literal('szenario'),
  title: text,
  situation: text,
  responses: z.array(z.object({ id: text, label: text, text, explanation: text })).length(3),
});

const MerkblattUnit = z.object({
  id,
  type: z.literal('merkblatt'),
  title: text,
  summary: text,
  sections: z.array(z.object({ heading: text, lines: z.array(text).min(1) })).min(1),
});

const AssessmentUnit = z.object({
  id,
  type: z.literal('assessment'),
  title: text,
  phase: z.enum(['pre', 'post']),
});

const ZertifikatUnit = z.object({
  id,
  type: z.literal('zertifikat'),
  title: text,
});

export const UnitSchema = z.discriminatedUnion('type', [
  ErklaerungUnit,
  TranskriptUnit,
  WissenscheckUnit,
  SzenarioUnit,
  MerkblattUnit,
  AssessmentUnit,
  ZertifikatUnit,
]);

export const StepSchema = z.object({
  id,
  kind: z.enum(['start', 'modul', 'abschluss']),
  title: text,
  // a step longer than 12 minutes must be split
  estimatedMinutes: z.number().int().min(4).max(12),
  units: z.array(UnitSchema).min(1),
  extras: z.array(UnitSchema).optional(),
});

export const CourseSchema = z
  .object({
    id,
    locale: z.enum(['de', 'en']),
    track: z.enum(['bewerbung', 'kinder', 'unterricht']),
    steps: z.array(StepSchema).min(1),
  })
  .superRefine((course, ctx) => {
    const seenUnits = new Set<string>();
    const seenQuestions = new Set<string>();
    const seenSteps = new Set<string>();
    for (const step of course.steps) {
      if (seenSteps.has(step.id)) ctx.addIssue({ code: 'custom', message: `duplicate step id ${step.id}` });
      seenSteps.add(step.id);
      for (const unit of [...step.units, ...(step.extras ?? [])]) {
        if (seenUnits.has(unit.id)) ctx.addIssue({ code: 'custom', message: `duplicate unit id ${unit.id}` });
        seenUnits.add(unit.id);
        if (unit.type !== 'wissenscheck') continue;
        for (const question of unit.questions) {
          if (seenQuestions.has(question.id)) {
            ctx.addIssue({ code: 'custom', message: `duplicate question id ${question.id}` });
          }
          seenQuestions.add(question.id);
        }
      }
    }
  });

function uniqueQuestionIds(questions: { id: string }[], ctx: z.RefinementCtx) {
  const ids = questions.map((question) => question.id);
  if (new Set(ids).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'duplicate question ids' });
}

export const AssessmentSchema = z.array(QuestionSchema).length(12).superRefine(uniqueQuestionIds);
export const QuizSchema = z.array(QuestionSchema).length(7).superRefine(uniqueQuestionIds);
