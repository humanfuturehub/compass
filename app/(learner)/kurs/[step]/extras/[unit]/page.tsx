import { AppHeader } from '@/components/AppHeader';
import { LearnerPage } from '@/components/layout/LearnerPage';
import { UnitFooter } from '@/components/learner/UnitFooter';
import { UnitRenderer } from '@/components/units/UnitRenderer';
import { getAssessment } from '@/lib/content/load';
import { isUnitComplete, remainingMinutes, unitDotStates } from '@/lib/content/path';
import { getLearnerContext } from '@/lib/learner/context';
import { gateExtraUnit } from '@/lib/learner/gate';
import { t } from '@/lib/strings/t';

type Params = Promise<{ step: string; unit: string }>;

/** "Mehr dazu" units: never on the path, never required, never counted (SPEC 6.2). */
export default async function ExtraUnitPage({ params }: { params: Params }) {
  const { step: stepId, unit: unitId } = await params;
  const ctx = await getLearnerContext();
  const { step, unit } = gateExtraUnit(ctx, stepId, unitId);
  const { learner, course, progress } = ctx;

  const back = step.units.find((u) => !isUnitComplete(progress, u.id)) ?? step.units[0];
  const backHref = back ? `/kurs/${stepId}/${back.id}` : '/uebersicht';

  return (
    <>
      <AppHeader
        title={step.title}
        backHref={backHref}
        dots={unitDotStates(step, '', progress)}
        remainingMinutes={remainingMinutes(course, stepId, back?.id ?? '')}
        locale={learner.locale}
      />
      <LearnerPage>
        <p className="text-micro text-ink-muted">
          {t('module.extra', learner.locale)} · {t('module.extra.optional', learner.locale)}
        </p>
        <div className="mt-16">
          <UnitRenderer
            unit={unit}
            locale={learner.locale}
            assessment={getAssessment(learner.locale)}
            defaultDisplayName=""
          />
        </div>
        <UnitFooter stepId={stepId} unitId={unitId} locale={learner.locale} nextHref={backHref} />
      </LearnerPage>
    </>
  );
}
