'use client';

import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';
import { Button } from './Button';

type Props = {
  title: string;
  summary: string;
  locale?: Locale;
  /** Called before the print dialog opens, e.g. to record the download. */
  onPrint?: () => void;
};

/** Title, one line, and a button that opens the browser print view. No PDF library. */
export function MerkblattCard({ title, summary, locale = 'de', onPrint }: Props) {
  return (
    <section className="rounded-card bg-surface-sunken p-16">
      <h2 className="text-ink">{title}</h2>
      <p className="mt-4 text-small text-ink-muted">{summary}</p>
      <div className="mt-16">
        <Button
          variant="secondary"
          onClick={() => {
            onPrint?.();
            window.print();
          }}
        >
          {t('merkblatt.print', locale)}
        </Button>
      </div>
    </section>
  );
}
