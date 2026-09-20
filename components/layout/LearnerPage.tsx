import type { ReactNode } from 'react';

/** Single column, 520px container, 20px horizontal padding, centred. */
export function LearnerPage({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-learner px-20 py-24">{children}</main>;
}
