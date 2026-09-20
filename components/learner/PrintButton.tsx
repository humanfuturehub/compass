'use client';

import { Button } from '@/components/Button';

export function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="primary" onClick={() => window.print()}>
      {children}
    </Button>
  );
}
