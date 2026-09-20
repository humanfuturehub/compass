import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';
import { TickIcon } from './icons';

export type ModuleState = 'done' | 'current' | 'todo' | 'locked';

type Props = {
  title: string;
  minutes: number;
  href: string;
  state: ModuleState;
  /** Title of the step that must be completed first; shown when locked. */
  previousTitle?: string;
  /** Optional "Mehr dazu" units are visibly subordinate. */
  variant?: 'required' | 'extra';
  locale?: Locale;
};

function StateBadge({ state, locale }: { state: ModuleState; locale: Locale }) {
  if (state === 'done') {
    return (
      <span className="inline-flex shrink-0 items-center gap-4 rounded-pill bg-hfh-teal px-8 text-micro text-ink">
        <TickIcon className="h-16 w-16" />
        {t('module.state.done', locale)}
      </span>
    );
  }
  if (state === 'current') {
    return (
      <span className="inline-flex shrink-0 items-center rounded-pill bg-blue-tint px-8 text-micro text-ink">
        {t('module.state.current', locale)}
      </span>
    );
  }
  if (state === 'todo') {
    return <span className="shrink-0 text-micro text-ink-muted">{t('module.state.todo', locale)}</span>;
  }
  return null;
}

function Shell({
  href,
  locked,
  className,
  children,
}: {
  href: string;
  locked: boolean;
  className: string;
  children: ReactNode;
}) {
  if (locked) {
    return (
      <div aria-disabled="true" className={`${className} opacity-60`}>
        {children}
      </div>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ModuleCard({
  title,
  minutes,
  href,
  state,
  previousTitle,
  variant = 'required',
  locale = 'de',
}: Props) {
  const locked = state === 'locked';

  if (variant === 'extra') {
    return (
      <Shell
        href={href}
        locked={locked}
        className="block rounded-card border border-border border-l-3 border-l-hfh-orange bg-surface p-16"
      >
        <p className="text-micro text-ink-muted">
          {t('module.extra', locale)} · {t('module.extra.optional', locale)}
        </p>
        <p className="mt-4 text-body font-semibold text-ink">{title}</p>
        <p className="mt-4 text-micro text-ink-muted">{t('module.duration', locale, { n: minutes })}</p>
      </Shell>
    );
  }

  return (
    <Shell href={href} locked={locked} className="block rounded-card bg-surface-sunken p-16">
      <div className="flex items-start justify-between gap-12">
        <h2 className="text-ink">{title}</h2>
        <StateBadge state={state} locale={locale} />
      </div>
      <p className="mt-4 text-small text-ink-muted">{t('module.duration', locale, { n: minutes })}</p>
      {locked && previousTitle ? (
        <p className="mt-8 text-small text-ink-muted">
          {t('module.locked', locale, { title: previousTitle })}
        </p>
      ) : null}
    </Shell>
  );
}
