import { LearnerPage } from '@/components/layout/LearnerPage';
import { Button } from '@/components/Button';
import { ModuleCard } from '@/components/ModuleCard';
import { Wordmark } from '@/components/Wordmark';
import { isUnitComplete, stepStates } from '@/lib/content/path';
import type { Step } from '@/lib/content/types';
import type { ProgressMap } from '@/lib/content/path';
import { getCertificateForLearner } from '@/lib/db/certificates';
import { getLearnerContext } from '@/lib/learner/context';
import { t } from '@/lib/strings/t';

function stepHref(step: Step, progress: ProgressMap): string {
  const open = step.units.find((unit) => !isUnitComplete(progress, unit.id)) ?? step.units[0];
  return open ? `/kurs/${step.id}/${open.id}` : '/uebersicht';
}

/** Course home: every step as a ModuleCard, extras subordinate beneath their step. */
export default async function OverviewPage() {
  const { learner, course, progress } = await getLearnerContext();
  const locale = learner.locale;
  const certificate = await getCertificateForLearner(learner.id);

  return (
    <LearnerPage>
      <Wordmark locale={locale} />
      <h1 className="mt-24 text-ink">{t('overview.title', locale)}</h1>
      {certificate ? (
        <div className="mt-16">
          <Button href={`/zertifikat/${certificate.id}`}>{t('certificate.show', locale)}</Button>
        </div>
      ) : null}
      <ol className="mt-24 space-y-16">
        {stepStates(course, progress).map(({ step, state, previous }) => (
          <li key={step.id}>
            <ModuleCard
              title={step.title}
              minutes={step.estimatedMinutes}
              href={stepHref(step, progress)}
              state={state}
              previousTitle={previous?.title}
              locale={locale}
            />
            {step.extras?.length ? (
              <ul className="mt-8 space-y-8">
                {step.extras.map((extra) => (
                  <li key={extra.id}>
                    <ModuleCard
                      title={extra.title}
                      href={`/kurs/${step.id}/extras/${extra.id}`}
                      state={state === 'locked' ? 'locked' : 'todo'}
                      variant="extra"
                      locale={locale}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-32">
        <Button href="/fortsetzen" variant="quiet">
          {t('resume.show', locale)}
        </Button>
      </div>
    </LearnerPage>
  );
}
