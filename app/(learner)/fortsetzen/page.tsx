import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/Button';
import { LearnerPage } from '@/components/layout/LearnerPage';
import { ResumeLinkCard } from '@/components/learner/ResumeLinkCard';
import { Wordmark } from '@/components/Wordmark';
import { resumeWithToken } from '@/lib/actions/redeem';
import { createSessionToken, getLearner, learnerIdFromToken } from '@/lib/session/resolve';
import { t } from '@/lib/strings/t';

type Search = Promise<{ t?: string; ungueltig?: string }>;

async function origin(): Promise<string> {
  const h = await headers();
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  return `${proto}://${host}`;
}

/**
 * Two modes. With ?t= the link is being opened: the token is verified read-only and
 * consumed by a POST, so chat link previews cannot use it up. Without it, the
 * signed-in learner sees their own link with a copy button (SPEC 6.1).
 */
export default async function FortsetzenPage({ searchParams }: { searchParams: Search }) {
  const { t: token, ungueltig } = await searchParams;

  if (token) {
    const learnerId = await learnerIdFromToken(token);
    if (!learnerId) redirect('/fortsetzen?ungueltig=1');
    return (
      <LearnerPage>
        <Wordmark />
        <h1 className="mt-24 text-ink">{t('resume.continue')}</h1>
        <form action={resumeWithToken} className="mt-24">
          <input type="hidden" name="t" value={token} />
          <Button type="submit">{t('resume.continue')}</Button>
        </form>
      </LearnerPage>
    );
  }

  if (ungueltig) {
    return (
      <LearnerPage>
        <Wordmark />
        <p className="mt-24 rounded-r-btn border-l-3 border-hfh-orange bg-orange-tint p-12 text-body text-ink">
          {t('resume.invalid')}
        </p>
        <div className="mt-24">
          <Button href="/">{t('access.title')}</Button>
        </div>
      </LearnerPage>
    );
  }

  const learner = await getLearner();
  if (!learner) redirect('/');
  const link = `${await origin()}/fortsetzen?t=${await createSessionToken(learner.id)}`;

  return (
    <LearnerPage>
      <Wordmark locale={learner.locale} />
      <div className="mt-24">
        <ResumeLinkCard link={link} locale={learner.locale} />
      </div>
      <div className="mt-24">
        <Button href="/kurs">{t('resume.start', learner.locale)}</Button>
      </div>
      <p className="mt-16 text-small text-ink-muted">
        <Link href="/uebersicht" className="text-hfh-blue underline">
          {t('overview.title', learner.locale)}
        </Link>
      </p>
    </LearnerPage>
  );
}
