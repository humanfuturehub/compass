// The English course. Interface strings and the start step are translated (SPEC 7).
// TODO: m1–abschluss are re-exported from the German course until they are translated.
// Ids are shared with the German course so progress is locale-independent.

import type { Course } from '@/lib/content/types';
import { start } from './steps/start';
import { m1 } from '@/content/de/steps/m1';
import { m2 } from '@/content/de/steps/m2';
import { m3 } from '@/content/de/steps/m3';
import { m4 } from '@/content/de/steps/m4';
import { abschluss } from '@/content/de/steps/abschluss';

export const course = {
  id: 'compass-en',
  locale: 'en',
  track: 'bewerbung',
  steps: [start, m1, m2, m3, m4, abschluss],
} satisfies Course;
