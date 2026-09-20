import type { z } from 'zod';
import type {
  AssessmentSchema,
  CourseSchema,
  OptionSchema,
  QuestionSchema,
  QuizSchema,
  StepSchema,
  UnitSchema,
} from './schema';

export type Course = z.infer<typeof CourseSchema>;
export type Step = z.infer<typeof StepSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Option = z.infer<typeof OptionSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;
export type Quiz = z.infer<typeof QuizSchema>;

export type UnitOfType<T extends Unit['type']> = Extract<Unit, { type: T }>;
export type Track = Course['track'];
