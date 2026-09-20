// The German course. Steps live in ./steps to keep files short; this file is the path.
// Ids are stable forever: progress, check_attempts and item analysis depend on them.

import type { Course } from '@/lib/content/types';
import { start } from './steps/start';
import { m1 } from './steps/m1';
import { m2 } from './steps/m2';
import { m3 } from './steps/m3';
import { m4 } from './steps/m4';
import { abschluss } from './steps/abschluss';

export const course = {
  id: 'compass-de',
  locale: 'de',
  track: 'bewerbung',
  steps: [start, m1, m2, m3, m4, abschluss],
} satisfies Course;
