import { CheckQuestion } from '@/components/CheckQuestion';
import type { UnitOfType } from '@/lib/content/types';
import type { Locale } from '@/lib/locale';

type Props = {
  unit: UnitOfType<'wissenscheck'>;
  locale: Locale;
  /** Wired to check_attempts in Phase 5. */
  onSelect?: (questionId: string, optionId: string, isCorrect: boolean) => void;
};

export function WissenscheckUnit({ unit, locale, onSelect }: Props) {
  return (
    <article>
      <h1 className="text-ink">{unit.title}</h1>
      <div className="mt-24 space-y-40">
        {unit.questions.map((question) => (
          <CheckQuestion
            key={question.id}
            question={question}
            locale={locale}
            onSelect={onSelect ? (optionId, isCorrect) => onSelect(question.id, optionId, isCorrect) : undefined}
          />
        ))}
      </div>
    </article>
  );
}
