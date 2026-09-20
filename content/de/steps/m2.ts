import type { Step } from '@/lib/content/types';
import { halluzination } from './m2-halluzination';
import { gefallsucht } from './m2-gefallsucht';
import { echokammer } from './m2-echokammer';

export const m2 = {
  id: 'm2',
  kind: 'modul',
  title: 'Wo KI Fehler macht',
  estimatedMinutes: 12,
  units: [...halluzination, ...gefallsucht, ...echokammer],
  extras: [
    {
      id: 'm2-extra-wissensstand',
      type: 'erklaerung',
      title: 'Wissensstand',
      body: [
        'Ein Sprachmodell wird zu einem bestimmten Zeitpunkt trainiert. Alles, was danach passiert, kennt es nicht. Diesen Zeitpunkt nennt man Wissensstand, auf Englisch Knowledge Cutoff. Fragst du nach einem neuen Gesetz, einem aktuellen Preis oder einer Person, die erst kürzlich bekannt wurde, antwortet das Modell trotzdem, aber aus altem Wissen oder aus Mustern.',
        'Manche Programme verbinden das Modell mit einer Internetsuche. Dann kann es aktuelle Seiten lesen. Aber auch dann entscheidet das Modell, was es daraus macht, und kann Inhalte falsch wiedergeben. Frag im Zweifel: Von wann ist diese Information? Und schau bei allem Aktuellen direkt auf der offiziellen Seite nach.',
      ],
    },
    {
      id: 'm2-extra-alignment',
      type: 'erklaerung',
      title: 'Alignment',
      body: [
        'Nach dem Training wird ein Modell nachträglich geformt. Menschen bewerten Antworten, und das Modell lernt, welche Art von Antwort gut ankommt. Diesen Schritt nennt man Alignment. Er macht Antworten höflicher, hilfreicher und sicherer. Ohne ihn wären viele Modelle unbrauchbar oder sogar verletzend im Ton.',
        'Genau dieser Schritt hat aber eine Nebenwirkung: Antworten, die dir gefallen, wurden häufiger belohnt. So entstehen Gefallsucht und Echokammer. Das Modell hat gelernt, dass Zustimmung und Lob gut ankommen. Wenn du das weißt, kannst du gezielt dagegen fragen: nach Risiken, nach Kritik, nach der Gegenposition.',
      ],
    },
  ],
} satisfies Step;
