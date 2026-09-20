import { notFound } from 'next/navigation';
import { LearnerPage } from '@/components/layout/LearnerPage';
import { UnitRenderer } from '@/components/units/UnitRenderer';
import { allUnits, getAssessment, getCourse } from '@/lib/content/load';

// Renders any unit by id with no auth and no persistence (Phase 2 acceptance).
// generateStaticParams runs at build time and imports the loader, so a content
// schema violation fails `next build`.

export function generateStaticParams() {
  return allUnits(getCourse('de')).map(({ unit }) => ({ unit: unit.id }));
}

export default async function DevUnitPage({ params }: { params: Promise<{ unit: string }> }) {
  if (process.env.VERCEL_ENV === 'production') notFound();
  const { unit: unitId } = await params;
  const found = allUnits(getCourse('de')).find(({ unit }) => unit.id === unitId);
  if (!found) notFound();

  return (
    <LearnerPage>
      <UnitRenderer
        unit={found.unit}
        locale="de"
        assessment={getAssessment('de')}
        defaultDisplayName="DEMO-01"
      />
    </LearnerPage>
  );
}
