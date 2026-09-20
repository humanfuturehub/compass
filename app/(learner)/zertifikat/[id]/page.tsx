import { redirect } from 'next/navigation';
import { Button } from '@/components/Button';
import { PrintButton } from '@/components/learner/PrintButton';
import { Wordmark } from '@/components/Wordmark';
import { getCertificate } from '@/lib/db/certificates';
import { getLearnerContext } from '@/lib/learner/context';
import { currentUnitPath } from '@/lib/learner/gate';
import { t } from '@/lib/strings/t';

type Params = Promise<{ id: string }>;

/**
 * Teilnahmebescheinigung. On screen a card with a print button; in print a single
 * clean A4 page (globals.css sets @page). No PDF library: window.print() only.
 */
export default async function CertificatePage({ params }: { params: Params }) {
  const { id } = await params;
  const ctx = await getLearnerContext();
  const certificate = await getCertificate(id);
  if (!certificate || certificate.learnerId !== ctx.learner.id) redirect(currentUnitPath(ctx));

  const locale = ctx.learner.locale;
  const issued = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date(certificate.issuedAt));
  const hours = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    maximumFractionDigits: 2,
  }).format(certificate.hours);

  return (
    <main className="mx-auto w-full max-w-learner px-20 py-24 print:max-w-none print:p-0">
      <article className="rounded-card border border-border bg-surface p-24 print:rounded-none print:border-0 print:p-0">
        <Wordmark locale={locale} />
        <p className="mt-40 font-heading text-display text-ink">{t('certificate.heading', locale)}</p>
        <p className="mt-32 font-heading text-h1 text-ink">{certificate.displayName}</p>
        <p className="mt-16 text-body text-ink-muted">{t('certificate.intro', locale)}</p>
        <p className="mt-8 text-body font-semibold text-ink">{t('course.title', locale)}</p>
        <p className="mt-24 text-small font-semibold text-ink">{t('certificate.modules', locale)}</p>
        <ul className="mt-8 list-disc space-y-4 pl-20 text-body text-ink">
          {certificate.modules.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ul>
        <p className="mt-24 text-body text-ink">
          {certificate.hours === 1
            ? t('certificate.hours.one', locale)
            : t('certificate.hours', locale, { hours })}
        </p>
        <p className="mt-8 text-body text-ink">
          {t('certificate.completedOn', locale)} {issued}
        </p>
        <p className="mt-40 text-small text-ink-muted">{t('app.brand', locale)}</p>
      </article>
      <div className="print-hidden mt-24 space-y-12">
        <PrintButton>{t('certificate.print', locale)}</PrintButton>
        <Button href="/uebersicht" variant="quiet">
          {t('certificate.backToCourse', locale)}
        </Button>
      </div>
    </main>
  );
}
