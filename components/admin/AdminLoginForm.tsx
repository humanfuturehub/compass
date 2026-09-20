'use client';

import { useActionState } from 'react';
import { Button } from '@/components/Button';
import { adminLogin, type AdminLoginState } from '@/lib/actions/admin';
import { t } from '@/lib/strings/t';

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLogin, {} as AdminLoginState);
  return (
    <form action={action} className="max-w-learner">
      <label htmlFor="admin-code" className="block text-body font-semibold text-ink">
        {t('admin.code.label')}
      </label>
      <input
        id="admin-code"
        name="code"
        type="password"
        autoComplete="off"
        required
        aria-invalid={state.error ? true : undefined}
        className="mt-8 block h-btn w-full rounded-btn border border-border bg-surface px-16 text-body text-ink"
      />
      {state.error ? (
        <p role="alert" className="mt-12 rounded-r-btn border-l-3 border-hfh-orange bg-orange-tint p-12 text-small text-ink">
          {t('admin.code.error')}
        </p>
      ) : null}
      <div className="mt-16">
        <Button type="submit" fullWidth={false} disabled={pending}>
          {t('admin.code.submit')}
        </Button>
      </div>
    </form>
  );
}
