export type Locale = 'de' | 'en';

export const LOCALES: readonly Locale[] = ['de', 'en'];
export const DEFAULT_LOCALE: Locale = 'de';

export function isLocale(value: unknown): value is Locale {
  return value === 'de' || value === 'en';
}
