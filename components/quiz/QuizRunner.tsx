'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/Button';
import { RadioOption } from '@/components/RadioOption';
import { ResultMark } from '@/components/ResultMark';
import type { QuizResult } from '@/lib/actions/quiz';
import type { Question } from '@/lib/content/types';
import { t } from '@/lib/strings/t';

type Props = {
  questions: Question[];
  onSubmit: (answers: { questionId: string; optionId: string | null }[]) => Promise<QuizResult>;
};

/** Intro → one item per screen → result with a single call to action (SPEC Phase 8). */
export function QuizRunner({ questions, onSubmit }: Props) {
  const [stage, setStage] = useState<'intro' | 'items' | 'result'>('intro');
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [pending, setPending] = useState(false);
  const groupName = useId();

  if (stage === 'intro') {
    return (
      <div>
        <p className="text-body text-ink">{t('quiz.intro')}</p>
        <div className="mt-24">
          <Button onClick={() => setStage('items')}>{t('quiz.start')}</Button>
        </div>
      </div>
    );
  }

  if (stage === 'result' && result) {
    return (
      <div>
        <h2 className="text-ink">{t('quiz.result.title')}</h2>
        <p className="mt-8 text-body text-ink">{t('quiz.result.score', 'de', { score: result.score, total: result.total })}</p>
        <ol className="mt-24 space-y-16">
          {questions.map((question) => {
            const shown = question.options.find((o) => o.id === (chosen[question.id] ?? question.correctOptionId));
            return (
              <li key={question.id}>
                <p className="text-body font-semibold text-ink">{question.prompt}</p>
                {shown ? (
                  <div className="mt-8 flex items-start gap-12 rounded-btn bg-surface-sunken p-12">
                    <ResultMark correct={result.correct[question.id] ?? false} locale="de" />
                    <div className="min-w-0 flex-1">
                      <p className="text-small text-ink">{shown.text}</p>
                      <p className="mt-4 text-small text-ink-muted">{shown.explanation}</p>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
        <div className="mt-32">
          <Button href="/">{t('quiz.cta')}</Button>
        </div>
      </div>
    );
  }

  const question = questions[index];
  if (!question) return null;
  const isLast = index === questions.length - 1;

  async function next() {
    if (!isLast) {
      setIndex(index + 1);
      return;
    }
    setPending(true);
    try {
      setResult(await onSubmit(questions.map((q) => ({ questionId: q.id, optionId: chosen[q.id] ?? null }))));
      setStage('result');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <p className="text-micro text-ink-muted">{t('assessment.progress', 'de', { n: index + 1, total: questions.length })}</p>
      <fieldset key={question.id} className="m-0 mt-8 min-w-0 border-0 p-0">
        <legend className="font-heading text-h2 text-ink">{question.prompt}</legend>
        <div className="mt-16 space-y-12">
          {question.options.map((option) => (
            <div key={option.id}>
              <RadioOption
                id={`${groupName}-${question.id}-${option.id}`}
                name={`${groupName}-${question.id}`}
                value={option.id}
                checked={chosen[question.id] === option.id}
                onChange={() => setChosen({ ...chosen, [question.id]: option.id })}
              >
                {option.text}
              </RadioOption>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="mt-24">
        <Button onClick={next} disabled={pending}>{t(isLast ? 'assessment.finish' : 'assessment.next')}</Button>
      </div>
    </div>
  );
}
