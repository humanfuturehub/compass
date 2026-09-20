'use client';

import { useActionState } from 'react';
import { Button } from '@/components/Button';
import { redeemSeat, type RedeemState } from '@/lib/actions/redeem';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

const initial: RedeemState = {};

export function SeatCodeForm({ locale }: { locale: Locale }) {
  const [state, action, pending] = useActionState(redeemSeat, initial);

  return (
    <form action={action}>
      <label htmlFor="code" className="block text-body font-semibold text-ink">
        {t('access.title', locale)}
      </label>
      <p className="mt-4 text-small text-ink-muted">{t('access.help', locale)}</p>
      <input
        id="code"
        name="code"
        inputMode="text"
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        maxLength={12}
        required
        placeholder={t('access.placeholder', locale)}
        aria-describedby={state.error ? 'code-error' : undefined}
        aria-invalid={state.error ? true : undefined}
        className="mt-12 block h-btn w-full rounded-btn border border-border bg-surface px-16 text-body uppercase tracking-wide text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-ink-muted"
      />
      {state.error ? (
        <p
          id="code-error"
          role="alert"
          className="mt-12 rounded-r-btn border-l-3 border-hfh-orange bg-orange-tint p-12 text-small text-ink"
        >
          {t(`access.error.${state.error}`, locale)}
        </p>
      ) : null}
      <div className="mt-24">
        <Button type="submit" disabled={pending}>
          {t('access.submit', locale)}
        </Button>
      </div>
    </form>
  );
}
