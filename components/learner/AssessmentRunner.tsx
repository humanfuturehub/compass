'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { RadioOption } from '@/components/RadioOption';
import { ResultMark } from '@/components/ResultMark';
import type { Question } from '@/lib/content/types';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

export type AssessmentAnswer = { questionId: string; optionId: string | null; isCorrect: boolean };

type Props = {
  questions: Question[];
  phase: 'pre' | 'post';
  locale: Locale;
  /** Stored answers when the learner returns to a submitted assessment. */
  stored?: AssessmentAnswer[];
  /** Persists the answers (Phase 6). Resolves once stored. */
  onComplete?: (answers: AssessmentAnswer[]) => void | Promise<void>;
};

/** One item per screen. No explanations during pre; every explanation after post. */
export function AssessmentRunner({ questions, phase, locale, stored, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<AssessmentAnswer[] | null>(stored ?? null);
  const [pending, setPending] = useState(false);
  const groupName = useId();
  const router = useRouter();

  if (submitted) {
    return <Review questions={questions} phase={phase} answers={submitted} locale={locale} />;
  }

  const question = questions[index];
  if (!question) return null;
  const isLast = index === questions.length - 1;

  async function next() {
    if (!isLast) {
      setIndex(index + 1);
      return;
    }
    const answers: AssessmentAnswer[] = questions.map((q) => {
      const optionId = chosen[q.id] ?? null;
      return { questionId: q.id, optionId, isCorrect: optionId === q.correctOptionId };
    });
    setPending(true);
    try {
      await onComplete?.(answers);
    } finally {
      setPending(false);
      setSubmitted(answers);
      // The server now holds the answers; re-render so the footer's Weiter appears.
      router.refresh();
    }
  }

  return (
    <div>
      <p className="text-micro text-ink-muted">
        {t('assessment.progress', locale, { n: index + 1, total: questions.length })}
      </p>
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
        <Button onClick={next} disabled={pending}>
          {t(isLast ? 'assessment.finish' : 'assessment.next', locale)}
        </Button>
      </div>
    </div>
  );
}

function Review({
  questions,
  phase,
  answers,
  locale,
}: {
  questions: Question[];
  phase: 'pre' | 'post';
  answers: AssessmentAnswer[];
  locale: Locale;
}) {
  const byQuestion = new Map(answers.map((answer) => [answer.questionId, answer]));
  return (
    <div>
      <p className="text-body text-ink">
        {t(phase === 'pre' ? 'assessment.done.pre' : 'assessment.done.post', locale)}
      </p>
      {phase === 'post' ? (
        <ol className="mt-24 space-y-24">
          {questions.map((question) => {
            const answer = byQuestion.get(question.id);
            const shown = question.options.find(
              (option) => option.id === (answer?.optionId ?? question.correctOptionId),
            );
            return (
              <li key={question.id}>
                <p className="text-body font-semibold text-ink">{question.prompt}</p>
                {shown ? (
                  <div className="mt-8 flex items-start gap-12 rounded-btn bg-surface-sunken p-12">
                    <ResultMark correct={answer?.isCorrect ?? false} locale={locale} />
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
      ) : null}
    </div>
  );
}
