'use client';

import { useId, useState } from 'react';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';
import { Button } from './Button';
import { DashIcon, TickIcon } from './icons';

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
  /** Called on every selection. Attempt numbering happens on the server. */
  onSelect?: (optionId: string, isCorrect: boolean) => void;
};

function ResultMark({ correct, locale }: { correct: boolean; locale: Locale }) {
  const shell = 'flex h-24 w-24 shrink-0 items-center justify-center rounded-pill';
  if (correct) {
    return (
      <span className={`${shell} bg-hfh-teal text-ink`}>
        <TickIcon className="h-16 w-16" />
        <span className="sr-only">{t('check.correct', locale)}</span>
      </span>
    );
  }
  return (
    <span className={`${shell} bg-surface-sunken text-ink-muted`}>
      <DashIcon className="h-16 w-16" />
      <span className="sr-only">{t('check.incorrect', locale)}</span>
    </span>
  );
}

const optionLabel =
  'flex min-h-option w-full cursor-pointer items-center gap-12 rounded-btn border border-border ' +
  'bg-surface px-16 py-12 text-body text-ink transition-opacity duration-120 ' +
  'peer-checked:border-hfh-blue peer-checked:bg-blue-tint peer-checked:ring-1 ' +
  'peer-checked:ring-inset peer-checked:ring-hfh-blue ' +
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ' +
  'peer-focus-visible:outline-hfh-blue';

/**
 * Unlimited attempts, every option explains itself, no score, never blocks.
 * Native radios give the group its semantics; the legend is the accessible name.
 */
export function CheckQuestion({ question, locale = 'de', onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const groupName = useId();

  function select(optionId: string) {
    setSelected(optionId);
    onSelect?.(optionId, optionId === question.correctOptionId);
  }

  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="font-heading text-h2 text-ink">{question.prompt}</legend>
      <div className="mt-16 space-y-12">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const inputId = `${groupName}-${option.id}`;
          return (
            <div key={option.id}>
              <input
                type="radio"
                id={inputId}
                name={groupName}
                value={option.id}
                checked={isSelected}
                onChange={() => select(option.id)}
                className="peer sr-only"
              />
              <label htmlFor={inputId} className={optionLabel}>
                <span className="flex-1">{option.text}</span>
                {isSelected ? (
                  <ResultMark correct={option.id === question.correctOptionId} locale={locale} />
                ) : null}
              </label>
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
