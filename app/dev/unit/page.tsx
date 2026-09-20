import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LearnerPage } from '@/components/layout/LearnerPage';
import { allUnits, getCourse } from '@/lib/content/load';

/** Index of every unit for the dev renderer. Not for production. */
export default function DevUnitIndex() {
  if (process.env.VERCEL_ENV === 'production') notFound();
  return (
    <LearnerPage>
      <h1 className="text-ink">Units (de)</h1>
      <ul className="mt-16 space-y-8">
        {allUnits(getCourse('de')).map(({ stepId, unit, isExtra }) => (
          <li key={unit.id}>
            <Link href={`/dev/unit/${unit.id}`} className="text-body text-hfh-blue underline">
              {stepId} · {unit.type} · {unit.id}
              {isExtra ? ' (extra)' : ''}
            </Link>
          </li>
        ))}
      </ul>
    </LearnerPage>
  );
}
