import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

export type TranscriptTurn = {
  role: 'user' | 'assistant';
  text: string;
  highlight?: boolean;
};

type Props = {
  turns: TranscriptTurn[];
  locale?: Locale;
};

/**
 * A fixed, pre-written exchange. There is deliberately no input field in or near
 * this component: the product contains no AI.
 */
export function TranscriptCard({ turns, locale = 'de' }: Props) {
  return (
    <section className="rounded-card bg-surface-sunken p-16" aria-label={t('transcript.label', locale)}>
      <p className="text-micro text-ink-muted">{t('transcript.label', locale)}</p>
      <ol className="mt-12 space-y-16">
        {turns.map((turn, i) => (
          <li
            key={i}
            className={
              turn.highlight ? 'rounded-r-btn border-l-3 border-hfh-orange bg-orange-tint p-12' : ''
            }
          >
            <p className="text-micro text-ink-muted">
              {t(turn.role === 'user' ? 'transcript.user' : 'transcript.assistant', locale)}
            </p>
            <p className="mt-4 whitespace-pre-line text-body text-ink">{turn.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
