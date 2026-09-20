import type { Unit } from '@/lib/content/types';

export const halluzination = [
  {
    id: 'm2-halluzination',
    type: 'transkript',
    title: 'Halluzination: Erfundene Fakten',
    intro:
      'Eine Halluzination ist eine Antwort, die überzeugend klingt, aber erfunden ist. Hier fragt jemand nach einem Ereignis, das nie stattgefunden hat. Achte darauf, wie sicher die KI antwortet.',
    turns: [
      {
        role: 'user',
        text: 'Wann ist Goethe zum ersten Mal mit einem Flugzeug geflogen?',
      },
      {
        role: 'assistant',
        text: 'Johann Wolfgang von Goethe unternahm seinen ersten Flug im Jahr 1798, als er mit einem frühen Flugapparat von Weimar nach Frankfurt reiste. Die Reise dauerte etwa drei Stunden und beeindruckte ihn so sehr, dass er sie in mehreren Briefen erwähnte.',
        highlight: true,
      },
      {
        role: 'user',
        text: 'Bist du sicher? Das erste Motorflugzeug flog doch erst 1903.',
      },
      {
        role: 'assistant',
        text: 'Sie haben recht, ich bitte um Entschuldigung. Goethe starb 1832, lange vor dem ersten Motorflug. Er ist nie mit einem Flugzeug geflogen. Meine vorherige Antwort war falsch.',
      },
    ],
    points: [
      'Die KI hat ein Jahr, einen Ort und Details erfunden, und das ohne jeden Zweifel im Ton.',
      'Erst als die Nachfrage einen Zweifel enthielt, hat die KI die Aussage zurückgenommen.',
      'Prüfe Namen, Daten und Zahlen immer in einer verlässlichen Quelle, nicht in der KI selbst.',
    ],
  },
  {
    id: 'm2-halluzination-check',
    type: 'wissenscheck',
    title: 'Wissenscheck: Halluzination',
    questions: [
      {
        id: 'm2-halluzination-check-q1',
        prompt: 'Woran erkennst du im Beispiel die Halluzination?',
        options: [
          {
            id: 'a',
            text: 'Die Antwort enthält konkrete Details wie Jahr, Ort und Dauer.',
            explanation:
              'Nein, Details allein sind kein Zeichen. Gerade das macht Halluzinationen gefährlich: Sie klingen konkret und sicher.',
          },
          {
            id: 'b',
            text: 'Die Antwort widerspricht einem Fakt, den du prüfen kannst: Goethe starb 1832, das erste Flugzeug flog 1903.',
            explanation:
              'Richtig. Nur der Abgleich mit einer Quelle zeigt den Fehler. Die Antwort selbst gibt keinen Hinweis.',
          },
          {
            id: 'c',
            text: 'Die KI schreibt am Anfang, dass sie sich nicht sicher ist.',
            explanation:
              'Nein, im Gegenteil. Die KI klingt völlig sicher. Das ist typisch für eine Halluzination.',
          },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'm2-halluzination-check-q2',
        prompt: 'Was ist die beste Reaktion, wenn dir eine KI ein Datum nennt?',
        options: [
          {
            id: 'a',
            text: 'Das Datum übernehmen, wenn die Antwort sicher klingt.',
            explanation: 'Lieber nicht. Ein sicherer Ton sagt nichts über die Richtigkeit aus.',
          },
          {
            id: 'b',
            text: 'Die KI fragen, ob sie sicher ist, und der zweiten Antwort vertrauen.',
            explanation:
              'Halb richtig. Nachfragen kann helfen, aber auch die zweite Antwort ist nur eine Vorhersage. Ohne Quelle bleibst du unsicher.',
          },
          {
            id: 'c',
            text: 'Das Datum in einer verlässlichen Quelle nachschlagen.',
            explanation:
              'Genau. Fakten prüfst du außerhalb der KI, zum Beispiel in einem Lexikon oder auf einer offiziellen Seite.',
          },
        ],
        correctOptionId: 'c',
      },
    ],
  },
] satisfies Unit[];
