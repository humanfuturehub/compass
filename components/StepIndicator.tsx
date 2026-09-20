import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

type Props = {
  /** 1-based position of the current step */
  n: number;
  /** required steps only, never counts extras */
  total: number;
  locale?: Locale;
};

/** "Modul 3 von 6". Never a percentage. */
export function StepIndicator({ n, total, locale = 'de' }: Props) {
  return <p className="text-micro text-ink-muted">{t('step.indicator', locale, { n, total })}</p>;
}
