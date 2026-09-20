import { Button } from '@/components/Button';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

type Props = {
  defaultName: string;
  locale: Locale;
  /** Server action that issues the certificate and redirects (Phase 6). */
  action?: (formData: FormData) => void | Promise<void>;
};

/** Display-name entry, defaulting to the seat's staff_ref. */
export function ZertifikatForm({ defaultName, locale, action }: Props) {
  return (
    <form action={action}>
      <h1 className="text-ink">{t('certificate.form.title', locale)}</h1>
      <p className="mt-8 text-small text-ink-muted">{t('certificate.form.help', locale)}</p>
      <label className="mt-16 block text-small font-semibold text-ink">
        {t('certificate.form.label', locale)}
        <input
          name="displayName"
          defaultValue={defaultName}
          required
          maxLength={80}
          autoComplete="name"
          className="mt-4 block h-btn w-full rounded-btn border border-border bg-surface px-16 text-body font-normal text-ink"
        />
      </label>
      <div className="mt-24">
        <Button type="submit">{t('certificate.form.submit', locale)}</Button>
      </div>
    </form>
  );
}
