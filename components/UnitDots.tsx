import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

export type DotState = 'done' | 'current' | 'todo';

const dotClass: Record<DotState, string> = {
  done: 'bg-hfh-teal',
  current: 'border-2 border-hfh-blue bg-surface',
  todo: 'border border-border bg-surface',
};

type Props = {
  states: DotState[];
  locale?: Locale;
};

/** Position inside a step. The aria-label carries the position in words. */
export function UnitDots({ states, locale = 'de' }: Props) {
  const total = states.length;
  const current = states.indexOf('current');
  const done = states.filter((state) => state === 'done').length;
  const label =
    current === -1
      ? t('units.progress', locale, { done, total })
      : t('units.position', locale, { n: current + 1, total });

  return (
    <div role="img" aria-label={label} className="flex items-center gap-dots">
      {states.map((state, i) => (
        <span key={i} className={`block h-dot w-dot rounded-pill ${dotClass[state]}`} />
      ))}
    </div>
  );
}
