import { AppHeader } from '@/components/AppHeader';
import { LearnerPage } from '@/components/layout/LearnerPage';
import { StepIndicator } from '@/components/StepIndicator';
import { UnitFooter } from '@/components/learner/UnitFooter';
import { UnitRenderer } from '@/components/units/UnitRenderer';
import { completeUnit } from '@/lib/actions/progress';
import { getAssessment, getCourse } from '@/lib/content/load';
import { remainingMinutes, stepPosition, unitDotStates } from '@/lib/content/path';
import { getLearnerContext } from '@/lib/learner/context';
import { gateRequiredUnit } from '@/lib/learner/gate';

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

  // Assessment and certificate units carry their own primary action (SPEC 6.8).
  // TODO Phase 6: show Weiter on assessment units only once the assessment is stored.
  const footerAction = unit.type === 'zertifikat' ? undefined : completeUnit.bind(null, stepId, unitId);

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
            defaultDisplayName={learner.displayName ?? learner.staffRef ?? ''}
          />
        </div>
        <UnitFooter stepId={stepId} unitId={unitId} locale={learner.locale} action={footerAction} />
      </LearnerPage>
    </>
  );
}
