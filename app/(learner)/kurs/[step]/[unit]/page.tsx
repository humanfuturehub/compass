import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/Button';
import { LearnerPage } from '@/components/layout/LearnerPage';
import { StepIndicator } from '@/components/StepIndicator';
import { UnitFooter } from '@/components/learner/UnitFooter';
import { UnitRenderer } from '@/components/units/UnitRenderer';
import { submitAssessment } from '@/lib/actions/assessment';
import { issueCertificate } from '@/lib/actions/certificate';
import { recordAttempt, recordScenarioChoice } from '@/lib/actions/checks';
import { completeUnit } from '@/lib/actions/progress';
import { getAssessment, getCourse } from '@/lib/content/load';
import { remainingMinutes, stepPosition, unitDotStates } from '@/lib/content/path';
import { getStoredAssessment } from '@/lib/db/assessments';
import { getCertificateForLearner } from '@/lib/db/certificates';
import { getLearnerContext } from '@/lib/learner/context';
import { gateRequiredUnit } from '@/lib/learner/gate';
import { t } from '@/lib/strings/t';

type Params = Promise<{ step: string; unit: string }>;

/** Runs at build time and imports the content loader, so invalid content fails the build. */
export function generateStaticParams() {
  return getCourse('de').steps.flatMap((step) =>
    step.units.map((unit) => ({ step: step.id, unit: unit.id })),
  );
}

export default async function UnitPage({ params }: { params: Params }) {
  const { step: stepId, unit: unitId } = await params;
  const ctx = await getLearnerContext();
  const { step, unit } = gateRequiredUnit(ctx, stepId, unitId);
  const { learner, course, progress } = ctx;
  const { n, total } = stepPosition(course, stepId);

  const stored =
    unit.type === 'assessment' ? await getStoredAssessment(learner.id, unit.phase) : null;
  const certificate = unit.type === 'zertifikat' ? await getCertificateForLearner(learner.id) : null;

  // One primary action per screen (SPEC 6.8): the assessment runner and the certificate
  // form own it until they are done; then the footer's Weiter takes over.
  const ownsAction = unit.type === 'zertifikat' || (unit.type === 'assessment' && !stored);
  const footerAction = ownsAction ? undefined : completeUnit.bind(null, stepId, unitId);

  return (
    <>
      <AppHeader
        title={step.title}
        backHref="/uebersicht"
        dots={unitDotStates(step, unitId, progress)}
        remainingMinutes={remainingMinutes(course, stepId, unitId)}
        locale={learner.locale}
      />
      <LearnerPage>
        <StepIndicator n={n} total={total} locale={learner.locale} />
        <div className="mt-16">
          <UnitRenderer
            unit={unit}
            locale={learner.locale}
            assessment={getAssessment(learner.locale)}
            storedAssessment={stored ?? undefined}
            defaultDisplayName={certificate?.displayName ?? learner.displayName ?? learner.staffRef ?? ''}
            handlers={{
              onCheckSelect: recordAttempt,
              onScenarioSelect: recordScenarioChoice.bind(null, unitId),
              onAssessmentComplete: submitAssessment.bind(null, stepId, unitId),
              certificateAction: issueCertificate.bind(null, stepId, unitId),
            }}
          />
          {certificate ? (
            <div className="mt-16">
              <Button href={`/zertifikat/${certificate.id}`} variant="quiet">
                {t('certificate.show', learner.locale)}
              </Button>
            </div>
          ) : null}
        </div>
        <UnitFooter stepId={stepId} unitId={unitId} locale={learner.locale} action={footerAction} />
      </LearnerPage>
    </>
  );
}
