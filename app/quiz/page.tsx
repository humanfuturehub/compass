import { LearnerPage } from '@/components/layout/LearnerPage';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { Wordmark } from '@/components/Wordmark';
import { submitQuiz } from '@/lib/actions/quiz';
import { getQuiz } from '@/lib/content/load';
import { t } from '@/lib/strings/t';

/** Public quiz: no auth, no cookie, seven items, one call to action. German only in v1. */
export default function QuizPage() {
  return (
    <LearnerPage>
      <Wordmark />
      <h1 className="mt-24 text-ink">{t('quiz.title')}</h1>
      <div className="mt-16">
        <QuizRunner questions={getQuiz()} onSubmit={submitQuiz} />
      </div>
    </LearnerPage>
  );
}
