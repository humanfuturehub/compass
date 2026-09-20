import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';
import { DashIcon, TickIcon } from './icons';

// Correct: ink tick on a teal disc. Incorrect: muted dash on a bordered white disc.
// Never a red cross. The sr-only text carries the meaning for screen readers.

export function ResultMark({ correct, locale }: { correct: boolean; locale: Locale }) {
  const shell = 'flex h-24 w-24 shrink-0 items-center justify-center rounded-pill';
  if (correct) {
    return (
      <span className={`${shell} bg-hfh-teal text-ink`}>
        <TickIcon className="h-16 w-16" />
        <span className="sr-only">{t('check.correct', locale)}</span>
      </span>
    );
  }
  return (
    <span className={`${shell} border border-border bg-surface text-ink-muted`}>
      <DashIcon className="h-16 w-16" />
      <span className="sr-only">{t('check.incorrect', locale)}</span>
    </span>
  );
}
