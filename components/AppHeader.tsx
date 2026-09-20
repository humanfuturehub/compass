import Link from 'next/link';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';
import { BackIcon } from './icons';
import { UnitDots, type DotState } from './UnitDots';

type Props = {
  title: string;
  backHref: string;
  dots: DotState[];
  remainingMinutes: number;
  locale?: Locale;
};

/** Sticky, 56px plus the safe-area inset. Hidden in print. */
export function AppHeader({ title, backHref, dots, remainingMinutes, locale = 'de' }: Props) {
  return (
    <header className="print-hidden safe-top sticky top-0 z-10 border-b border-border bg-surface">
      <div className="mx-auto flex h-header max-w-learner items-center gap-12 px-20">
        <Link
          href={backHref}
          aria-label={t('header.back', locale)}
          className="-ml-12 flex h-tap w-tap shrink-0 items-center justify-center rounded-btn text-hfh-blue"
        >
          <BackIcon />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-small font-semibold text-ink">{title}</p>
          <div className="mt-4">
            <UnitDots states={dots} locale={locale} />
          </div>
        </div>
        <p className="shrink-0 text-micro text-ink-muted">
          {t('header.remaining', locale, { n: remainingMinutes })}
        </p>
      </div>
    </header>
  );
}
