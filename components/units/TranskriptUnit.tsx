import { TranscriptCard } from '@/components/TranscriptCard';
import type { UnitOfType } from '@/lib/content/types';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

type Props = { unit: UnitOfType<'transkript'>; locale: Locale };

export function TranskriptUnit({ unit, locale }: Props) {
  return (
    <article>
      <h1 className="text-ink">{unit.title}</h1>
      <p className="mt-16 text-body text-ink">{unit.intro}</p>
      <div className="mt-24">
        <TranscriptCard turns={unit.turns} locale={locale} />
      </div>
      <h2 className="mt-24 text-ink">{t('transcript.points', locale)}</h2>
      <ul className="mt-12 space-y-8">
        {unit.points.map((point, i) => (
          <li key={i} className="border-l-3 border-hfh-blue pl-12 text-body text-ink">
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
