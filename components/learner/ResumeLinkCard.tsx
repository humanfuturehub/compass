'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { CopyIcon } from '@/components/icons';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/strings/t';

export function ResumeLinkCard({ link, locale }: { link: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      input.current?.select();
    }
  }

  return (
    <section className="rounded-card bg-surface-sunken p-16">
      <h2 className="text-ink">{t('resume.title', locale)}</h2>
      <p className="mt-4 text-small text-ink-muted">{t('resume.help', locale)}</p>
      <input
        ref={input}
        readOnly
        value={link}
        onFocus={(event) => event.currentTarget.select()}
        aria-label={t('resume.title', locale)}
        className="mt-12 block h-btn w-full rounded-btn border border-border bg-surface px-12 text-small text-ink"
      />
      <div className="mt-12">
        <Button variant="secondary" onClick={copy}>
          <CopyIcon />
          {copied ? t('resume.copied', locale) : t('resume.copy', locale)}
        </Button>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? t('resume.copied', locale) : ''}
      </span>
    </section>
  );
}
