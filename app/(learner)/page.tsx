import { redirect } from 'next/navigation';
import { LearnerPage } from '@/components/layout/LearnerPage';
import { SeatCodeForm } from '@/components/learner/SeatCodeForm';
import { Wordmark } from '@/components/Wordmark';
import { getLearner } from '@/lib/session/resolve';
import { t } from '@/lib/strings/t';

/** Seat-code entry. An existing session goes straight to the current unit (SPEC 6.3). */
export default async function HomePage() {
  const learner = await getLearner();
  if (learner) redirect('/kurs');

  return (
    <LearnerPage>
      <Wordmark />
      <h1 className="mt-24 text-ink">{t('app.title')}</h1>
      <div className="mt-24">
        <SeatCodeForm locale="de" />
      </div>
    </LearnerPage>
  );
}
