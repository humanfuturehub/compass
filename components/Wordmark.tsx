import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

/** Text wordmark in League Spartan until a logo asset exists (NOTES.md). */
export function Wordmark({ locale = 'de', className = '' }: { locale?: Locale; className?: string }) {
  return (
    <p className={`font-heading text-h2 text-hfh-blue ${className}`}>{t('app.brand', locale)}</p>
  );
}
