import { AssessmentRunner, type AssessmentAnswer } from '@/components/learner/AssessmentRunner';
import { ZertifikatForm } from '@/components/learner/ZertifikatForm';
import type { Question, Unit } from '@/lib/content/types';
import type { Locale } from '@/lib/locale';
import { ErklaerungUnit } from './ErklaerungUnit';
import { MerkblattUnit } from './MerkblattUnit';
import { SzenarioUnit } from './SzenarioUnit';
import { TranskriptUnit } from './TranskriptUnit';
import { WissenscheckUnit } from './WissenscheckUnit';

export type UnitHandlers = {
  onCheckSelect?: (questionId: string, optionId: string) => Promise<void>;
  onScenarioSelect?: (responseId: string) => void | Promise<void>;
  onPrint?: () => void;
  onAssessmentComplete?: (answers: AssessmentAnswer[]) => void | Promise<void>;
  certificateAction?: (formData: FormData) => void | Promise<void>;
};

type Props = {
  unit: Unit;
  locale: Locale;
  assessment: Question[];
  storedAssessment?: AssessmentAnswer[];
  defaultDisplayName: string;
  handlers?: UnitHandlers;
};

/** Maps a content unit to its renderer. Persistence arrives through `handlers`. */
export function UnitRenderer({
  unit,
  locale,
  assessment,
  storedAssessment,
  defaultDisplayName,
  handlers = {},
}: Props) {
  switch (unit.type) {
    case 'erklaerung':
      return <ErklaerungUnit unit={unit} />;
    case 'transkript':
      return <TranskriptUnit unit={unit} locale={locale} />;
    case 'wissenscheck':
      return <WissenscheckUnit unit={unit} locale={locale} onSelect={handlers.onCheckSelect} />;
    case 'szenario':
      return <SzenarioUnit unit={unit} locale={locale} onSelect={handlers.onScenarioSelect} />;
    case 'merkblatt':
      return <MerkblattUnit unit={unit} locale={locale} onPrint={handlers.onPrint} />;
    case 'assessment':
      return (
        <div>
          <h1 className="text-ink">{unit.title}</h1>
          <div className="mt-16">
            <AssessmentRunner
              questions={assessment}
              phase={unit.phase}
              locale={locale}
              stored={storedAssessment}
              onComplete={handlers.onAssessmentComplete}
            />
          </div>
        </div>
      );
    case 'zertifikat':
      return (
        <ZertifikatForm
          defaultName={defaultDisplayName}
          locale={locale}
          action={handlers.certificateAction}
        />
      );
  }
}
