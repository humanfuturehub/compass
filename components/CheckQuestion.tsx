'use client';

import { useId, useState } from 'react';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';
import { Button } from './Button';
import { RadioOption } from './RadioOption';
import { ResultMark } from './ResultMark';

export type CheckOption = { id: string; text: string; explanation: string };

export type CheckQuestionData = {
  id: string;
  prompt: string;
  options: CheckOption[];
  correctOptionId: string;
};

type Props = {
  question: CheckQuestionData;
  locale?: Locale;
  /** Called on every selection; may be a bound server action. Correctness and
   *  attempt numbering are derived on the server, never trusted from here. */
  onSelect?: (optionId: string) => void | Promise<void>;
};

/**
 * Unlimited attempts, every option explains itself, no score, never blocks.
 * Native radios give the group its semantics; the legend is the accessible name.
 */
export function CheckQuestion({ question, locale = 'de', onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const groupName = useId();

  function select(optionId: string) {
    setSelected(optionId);
    void onSelect?.(optionId);
  }

  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="font-heading text-h2 text-ink">{question.prompt}</legend>
      <div className="mt-16 space-y-12">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <div key={option.id}>
              <RadioOption
                id={`${groupName}-${option.id}`}
                name={groupName}
                value={option.id}
                checked={isSelected}
                onChange={() => select(option.id)}
                trailing={
                  isSelected ? (
                    <ResultMark correct={option.id === question.correctOptionId} locale={locale} />
                  ) : null
                }
              >
                {option.text}
              </RadioOption>
              {/* Always present so the reveal is announced. */}
              <div aria-live="polite">
                {isSelected ? (
                  <p className="mt-8 rounded-btn bg-surface-sunken p-12 text-small text-ink">
                    {option.explanation}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {selected !== null ? (
        <div className="mt-12">
          <Button variant="quiet" fullWidth={false} onClick={() => setSelected(null)}>
            {t('check.retry', locale)}
          </Button>
        </div>
      ) : null}
    </fieldset>
  );
}
