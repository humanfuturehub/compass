'use client';

import { useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/Button';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

type Props = {
  stepId: string;
  unitId: string;
  locale: Locale;
  /** Bound server action; omitted when another element is the screen's primary action. */
  action?: (formData: FormData) => void | Promise<void>;
  /** For extras: a plain link back instead of a completion action. */
  nextHref?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {label}
    </Button>
  );
}

function beacon(stepId: string, unitId: string, seconds: number) {
  const body = new Blob([JSON.stringify({ stepId, unitId, seconds })], { type: 'application/json' });
  navigator.sendBeacon('/api/progress', body);
}

/**
 * Primary Weiter plus the stop-here line (SPEC 6.4). Tracks visible seconds and
 * flushes them on tab hide via sendBeacon; the remainder rides along with Weiter.
 * Extras (nextHref) never write progress.
 */
export function UnitFooter({ stepId, unitId, locale, action, nextHref }: Props) {
  const unsent = useRef(0);
  const visibleSince = useRef<number | null>(null);
  const secondsInput = useRef<HTMLInputElement>(null);
  const tracked = !nextHref;

  useEffect(() => {
    if (!tracked) return;
    visibleSince.current = document.visibilityState === 'visible' ? Date.now() : null;

    const collect = () => {
      if (visibleSince.current !== null) {
        unsent.current += (Date.now() - visibleSince.current) / 1000;
        visibleSince.current = null;
      }
    };
    const flush = () => {
      collect();
      const seconds = Math.round(unsent.current);
      if (seconds > 0) beacon(stepId, unitId, seconds);
      unsent.current = 0;
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
      else visibleSince.current = Date.now();
    };

    // Mark the visit as soon as the unit is on screen.
    beacon(stepId, unitId, 0);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
    };
  }, [stepId, unitId, tracked]);

  function onSubmit() {
    if (visibleSince.current !== null) {
      unsent.current += (Date.now() - visibleSince.current) / 1000;
      visibleSince.current = Date.now();
    }
    if (secondsInput.current) secondsInput.current.value = String(Math.round(unsent.current));
    unsent.current = 0;
  }

  return (
    <footer className="print-hidden mt-40">
      {nextHref ? (
        <Button href={nextHref}>{t('footer.next', locale)}</Button>
      ) : action ? (
        <form action={action} onSubmit={onSubmit}>
          <input ref={secondsInput} type="hidden" name="seconds" defaultValue="0" />
          <SubmitButton label={t('footer.next', locale)} />
        </form>
      ) : null}
      <p className="mt-16 text-small text-ink-muted">{t('footer.stop', locale)}</p>
    </footer>
  );
}
