import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { CsvExport } from '@/components/admin/CsvExport';
import { Button } from '@/components/Button';
import { DataTable, type Column } from '@/components/DataTable';
import { StatTile } from '@/components/StatTile';
import { Wordmark } from '@/components/Wordmark';
import { adminLogout } from '@/lib/actions/admin';
import { getCourse } from '@/lib/content/load';
import { getInstitution, loadAdminData, type ItemRow, type LearnerRow } from '@/lib/db/admin';
import type { Locale } from '@/lib/locale';
import { getAdminInstitution } from '@/lib/session/admin';
import { t } from '@/lib/strings/t';

function Page({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-admin px-20 py-24">{children}</main>;
}

/** The only desktop-first surface. Reads are scoped to the institution behind the cookie. */
export default async function AdminPage() {
  const institutionId = await getAdminInstitution();
  const institution = institutionId ? await getInstitution(institutionId) : null;

  if (!institution) {
    return (
      <Page>
        <Wordmark />
        <h1 className="mt-24 text-ink">{t('admin.title')}</h1>
        <div className="mt-24">
          <AdminLoginForm />
        </div>
      </Page>
    );
  }

  const locale: Locale = institution.localeDefault;
  const course = getCourse(locale);
  const { stats, rows, items } = await loadAdminData(institution.id, course);
  const date = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', { dateStyle: 'medium' });
  const fmt = (iso: string | null) => (iso ? date.format(new Date(iso)) : t('admin.none', locale));
  const prompts = new Map(
    course.steps
      .flatMap((step) => [...step.units, ...(step.extras ?? [])])
      .flatMap((unit) => (unit.type === 'wissenscheck' ? unit.questions : []))
      .map((question) => [question.id, question.prompt]),
  );

  const learnerColumns: Column<LearnerRow>[] = [
    { key: 'ref', header: t('admin.table.staffRef', locale), render: (r) => r.staffRef },
    { key: 'step', header: t('admin.table.step', locale), render: (r) => r.currentStep ?? t('admin.step.done', locale) },
    { key: 'units', header: t('admin.table.units', locale), render: (r) => `${r.unitsComplete} / ${r.unitsTotal}`, align: 'right' },
    { key: 'hours', header: t('admin.table.hours', locale), render: (r) => r.hours.toLocaleString(locale), align: 'right' },
    { key: 'last', header: t('admin.table.lastActive', locale), render: (r) => fmt(r.lastActiveAt) },
    { key: 'done', header: t('admin.table.completed', locale), render: (r) => fmt(r.completedAt) },
  ];
  const itemColumns: Column<ItemRow>[] = [
    { key: 'q', header: t('admin.items.question', locale), render: (r) => (
      <span><span className="text-micro text-ink-muted">{r.questionId}</span><br />{prompts.get(r.questionId) ?? ''}</span>
    ) },
    { key: 'n', header: t('admin.items.attempts', locale), render: (r) => r.attempts, align: 'right' },
    { key: 'pct', header: t('admin.items.correct', locale), render: (r) => (
      <span className="inline-flex items-center gap-8">
        {r.pct} %
        {r.flagged ? (
          <span className="rounded-pill bg-orange-tint px-8 text-micro text-ink">{t('admin.items.flag', locale)}</span>
        ) : null}
      </span>
    ), align: 'right' },
  ];

  return (
    <Page>
      <div className="flex items-start justify-between gap-16">
        <div>
          <Wordmark locale={locale} />
          <h1 className="mt-8 text-ink">{institution.name}</h1>
        </div>
        <form action={adminLogout}>
          <Button type="submit" variant="quiet" fullWidth={false}>{t('admin.logout', locale)}</Button>
        </form>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-12 md:grid-cols-4">
        <StatTile label={t('admin.stat.issued', locale)} value={stats.issued} />
        <StatTile label={t('admin.stat.activated', locale)} value={stats.activated} />
        <StatTile label={t('admin.stat.completed', locale)} value={stats.completed} />
        <StatTile label={t('admin.stat.certificates', locale)} value={stats.certificates} />
      </div>

      <div className="mt-32 flex items-end justify-between gap-16">
        <h2 className="text-ink">{t('admin.learners.title', locale)}</h2>
        <CsvExport
          label={t('admin.export', locale)}
          filename={`compass-${new Date().toISOString().slice(0, 10)}.csv`}
          header={learnerColumns.map((c) => c.header)}
          rows={rows.map((r) => [r.staffRef, r.currentStep ?? t('admin.step.done', locale), `${r.unitsComplete}/${r.unitsTotal}`, r.hours, fmt(r.lastActiveAt), fmt(r.completedAt)])}
        />
      </div>
      <div className="mt-12">
        <DataTable columns={learnerColumns} rows={rows} rowKey={(r) => r.learnerId} caption={t('admin.learners.title', locale)} empty={t('admin.learners.none', locale)} />
      </div>

      <h2 className="mt-32 text-ink">{t('admin.items.title', locale)}</h2>
      <div className="mt-12">
        <DataTable columns={itemColumns} rows={items} rowKey={(r) => r.questionId} caption={t('admin.items.title', locale)} empty={t('admin.items.none', locale)} />
      </div>
    </Page>
  );
}
