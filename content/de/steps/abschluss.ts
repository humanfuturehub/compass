import type { Step } from '@/lib/content/types';

export const abschluss = {
  id: 'abschluss',
  kind: 'abschluss',
  title: 'Dein Ergebnis',
  estimatedMinutes: 8,
  units: [
    {
      id: 'abschluss-abschlussfragen',
      type: 'assessment',
      title: 'Abschlussfragen',
      phase: 'post',
    },
    {
      id: 'abschluss-zertifikat',
      type: 'zertifikat',
      title: 'Deine Teilnahmebescheinigung',
    },
  ],
} satisfies Step;
