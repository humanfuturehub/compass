import type { Metadata } from 'next';
import { League_Spartan, Public_Sans } from 'next/font/google';
import { getLearner } from '@/lib/session/resolve';
import './globals.css';

const heading = League_Spartan({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Compass',
  // noindex until launch, SPEC 12.2 / 12.8
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // lang follows the learner's locale (SPEC 11). A broken session must not take
  // down public routes, so failures fall back to the source locale here only.
  const locale = await getLearner()
    .then((learner) => learner?.locale ?? 'de')
    .catch(() => 'de');

  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
