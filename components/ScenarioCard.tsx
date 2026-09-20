'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

export type ScenarioResponse = {
  id: string;
  label: string;
  text: string;
  explanation: string;
};

type Props = {
  situation: string;
  responses: ScenarioResponse[];
  locale?: Locale;
  onSelect?: (responseId: string) => void;
};

const responseButton =
  'block min-h-option w-full rounded-btn border px-16 py-12 text-left text-body text-ink ' +
  'transition-opacity duration-120';

/** Three equal responses, no correct answer. Choosing reveals all explanations together. */
export function ScenarioCard({ situation, responses, locale = 'de', onSelect }: Props) {
  const [chosen, setChosen] = useState<string | null>(null);

  function choose(id: string) {
    if (chosen !== null) return;
    setChosen(id);
    onSelect?.(id);
  }

  return (
    <section>
      <p className="whitespace-pre-line text-body text-ink">{situation}</p>
      <p className="mt-16 text-body font-semibold text-ink">{t('scenario.prompt', locale)}</p>
      <div className="mt-12 space-y-12">
        {responses.map((response) => {
          const isChosen = chosen === response.id;
          const tone = isChosen
            ? 'border-hfh-blue bg-blue-tint ring-1 ring-inset ring-hfh-blue'
            : 'border-border bg-surface';
          return (
            <div key={response.id}>
              <button
                type="button"
                aria-pressed={isChosen}
                onClick={() => choose(response.id)}
                className={`${responseButton} ${tone}`}
              >
                <span className="block text-micro text-ink-muted">{response.label}</span>
                <span className="mt-4 block">{response.text}</span>
              </button>
              <div aria-live="polite">
                {chosen !== null ? (
                  <p className="mt-8 rounded-btn bg-surface-sunken p-12 text-small text-ink">
                    {response.explanation}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {chosen !== null ? (
        <p className="mt-16 text-small text-ink-muted">{t('scenario.disagree', locale)}</p>
      ) : null}
    </section>
  );
}
