import type { Metadata } from 'next';
import { League_Spartan, Public_Sans } from 'next/font/google';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
