import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet';

const base =
  'inline-flex h-btn min-w-tap items-center justify-center gap-8 rounded-btn px-20 ' +
  'text-body font-semibold transition-opacity duration-120 ' +
  'disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-hfh-blue text-surface',
  secondary: 'border border-border bg-surface text-ink',
  quiet: 'bg-transparent text-hfh-blue',
};

type Common = {
  variant?: ButtonVariant;
  /** Full width is the mobile default (SPEC 4). */
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsButton = Common & Omit<ComponentProps<'button'>, keyof Common> & { href?: undefined };
type AsLink = Common & { href: string };

function classes({ variant = 'primary', fullWidth = true, className = '' }: Common) {
  return [base, variants[variant], fullWidth ? 'w-full' : 'w-auto', className].join(' ');
}

export function Button(props: AsButton | AsLink) {
  if (typeof props.href === 'string') {
    const { href, children } = props;
    return (
      <Link href={href} className={classes(props)}>
        {children}
      </Link>
    );
  }
  // strip the styling props so only real button attributes reach the DOM
  const { variant: _v, fullWidth: _f, className: _c, href: _h, children, ...rest } = props;
  return (
    <button type="button" className={classes(props)} {...rest}>
      {children}
    </button>
  );
}
