import { ScenarioCard } from '@/components/ScenarioCard';
import type { UnitOfType } from '@/lib/content/types';
import type { Locale } from '@/lib/locale';

type Props = {
  unit: UnitOfType<'szenario'>;
  locale: Locale;
  onSelect?: (responseId: string) => void;
};

export function SzenarioUnit({ unit, locale, onSelect }: Props) {
  return (
    <article>
      <h1 className="text-ink">{unit.title}</h1>
      <div className="mt-16">
        <ScenarioCard
          situation={unit.situation}
          responses={unit.responses}
          locale={locale}
          onSelect={onSelect}
        />
      </div>
    </article>
  );
}
