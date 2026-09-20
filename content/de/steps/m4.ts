import type { Step } from '@/lib/content/types';

export const m4 = {
  id: 'm4',
  kind: 'modul',
  title: 'KI im Alltag',
  estimatedMinutes: 8,
  units: [
    {
      id: 'm4-szenario-bewerbung',
      type: 'szenario',
      title: 'Das Anschreiben',
      situation:
        'Du bewirbst dich als Verkäuferin in einem Supermarkt. Eine KI hat dir ein Anschreiben geschrieben. Es klingt sehr gut. Aber an zwei Stellen stehen Dinge, die nicht stimmen: Du hättest angeblich drei Jahre Erfahrung an der Kasse und einen Kurs in Kundenservice gemacht. Beides ist erfunden. Die Bewerbung muss morgen raus.',
      responses: [
        {
          id: 'a',
          label: 'Weg A',
          text: 'Du streichst die beiden erfundenen Stellen und schickst den Rest so ab.',
          explanation:
            'Schnell und ehrlich. Das Anschreiben ist dann vielleicht etwas dünner, aber alles darin stimmt. Du kannst im Gespräch zu jedem Satz stehen.',
        },
        {
          id: 'b',
          label: 'Weg B',
          text: 'Du nimmst den Entwurf als Gerüst und schreibst ihn mit deinen echten Erfahrungen neu.',
          explanation:
            'Mehr Arbeit, aber der Text wird wirklich deiner. Du kannst die KI danach bitten, deinen Text auf Rechtschreibung zu prüfen, ohne dass sie etwas dazuerfindet.',
        },
        {
          id: 'c',
          label: 'Weg C',
          text: 'Du gibst der KI deinen echten Lebenslauf und lässt sie eine neue Version ohne erfundene Details schreiben.',
          explanation:
            'Kann gut funktionieren, weil die KI jetzt Kontext hat. Aber du musst wieder jeden Satz prüfen. Die Verantwortung bleibt bei dir.',
        },
      ],
    },
    {
      id: 'm4-merkblatt',
      type: 'merkblatt',
      title: 'Merkblatt: KI bei der Bewerbung',
      summary: 'Die wichtigsten Regeln auf einer Seite, zum Ausdrucken oder Speichern.',
      sections: [
        {
          heading: 'Was KI gut kann',
          lines: [
            'Texte kürzer, klarer oder freundlicher machen',
            'Rechtschreibung und Grammatik prüfen',
            'Fragen für ein Vorstellungsgespräch üben, wenn du um Kritik bittest',
            'Ideen sammeln, was du in ein Anschreiben schreiben könntest',
          ],
        },
        {
          heading: 'Was du immer selbst prüfst',
          lines: [
            'Alle Angaben über dich: Daten, Abschlüsse, Erfahrungen',
            'Namen von Firmen, Personen und Adressen',
            'Alles, was du im Gespräch erklären musst',
          ],
        },
        {
          heading: 'Bevor du etwas abschickst',
          lines: [
            'Lies jeden Satz und frag: Stimmt das wirklich?',
            'Streiche alles, was du nicht selbst belegen kannst',
            'Gib keine persönlichen Daten anderer Menschen in eine KI ein',
          ],
        },
        {
          heading: 'So fragst du besser (RACE)',
          lines: [
            'Rolle: Wer soll antworten?',
            'Aufgabe: Was genau soll passieren?',
            'Kontext: Was muss die KI über dich wissen?',
            'Erwartung: Wie soll das Ergebnis aussehen?',
          ],
        },
      ],
    },
  ],
} satisfies Step;
