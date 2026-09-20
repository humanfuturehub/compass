import type { Locale } from '@/lib/locale';
import { de } from './de';
import { en } from './en';

export type StringKey = keyof typeof de;

const tables: Record<Locale, Record<StringKey, string>> = { de, en };

type Vars = Record<string, string | number>;

/** Interface string lookup. Missing keys are a type error; placeholders are {name}. */
export function t(key: StringKey, locale: Locale = 'de', vars?: Vars): string {
  const template = tables[locale][key];
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    return value === undefined ? match : String(value);
  });
}
