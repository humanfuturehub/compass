import { MerkblattCard } from '@/components/MerkblattCard';
import type { UnitOfType } from '@/lib/content/types';
import type { Locale } from '@/lib/locale';

type Props = {
  unit: UnitOfType<'merkblatt'>;
  locale: Locale;
  onPrint?: () => void;
};

/** The card on screen, the sections on screen and in print. Chrome is hidden in print. */
export function MerkblattUnit({ unit, locale, onPrint }: Props) {
  return (
    <article>
      <div className="print-hidden">
        <h1 className="text-ink">{unit.title}</h1>
        <div className="mt-16">
          <MerkblattCard title={unit.title} summary={unit.summary} locale={locale} onPrint={onPrint} />
        </div>
      </div>
      <section className="mt-24 print:mt-0">
        <h1 className="hidden text-ink print:block">{unit.title}</h1>
        {unit.sections.map((section) => (
          <div key={section.heading} className="mt-24">
            <h2 className="text-ink">{section.heading}</h2>
            <ul className="mt-8 list-disc space-y-4 pl-20 text-body text-ink">
              {section.lines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </article>
  );
}
