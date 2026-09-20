import { redirect } from 'next/navigation';
import { getLearnerContext } from '@/lib/learner/context';
import { currentUnitPath } from '@/lib/learner/gate';

/** Resume lands on the exact unit, never the home screen (SPEC 6.3). */
export default async function KursPage() {
  const ctx = await getLearnerContext();
  redirect(currentUnitPath(ctx));
}
