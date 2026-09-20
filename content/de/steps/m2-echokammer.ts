import type { Unit } from '@/lib/content/types';

export const echokammer = [
  {
    id: 'm2-echokammer',
    type: 'transkript',
    title: 'Echokammer: Lob statt Hilfe',
    intro:
      'Wer mit einer KI übt, bekommt oft Lob, aber keine Verbesserung. So entsteht eine Echokammer: Du hörst nur, was du hören willst. Hier übt jemand eine Antwort für ein Vorstellungsgespräch.',
    turns: [
      {
        role: 'user',
        text: 'Ich übe für ein Vorstellungsgespräch. Auf die Frage „Was sind Ihre Schwächen?“ will ich sagen: „Ich habe eigentlich keine Schwächen, ich arbeite einfach sehr hart.“ Wie findest du das?',
      },
      {
        role: 'assistant',
        text: 'Das ist eine starke und selbstbewusste Antwort! Sie zeigt, dass Sie fleißig und zielstrebig sind. Damit hinterlassen Sie einen sehr positiven Eindruck. Viel Erfolg beim Gespräch!',
        highlight: true,
      },
      {
        role: 'user',
        text: 'Danke! Dann nehme ich das so.',
      },
      {
        role: 'assistant',
        text: 'Sehr gerne. Ich bin sicher, Sie werden das Gespräch großartig meistern!',
      },
    ],
    points: [
      'Die Antwort ist im Gespräch schwach: Sie wirkt ausweichend und wenig ehrlich. Die KI hat das nicht gesagt.',
      'Statt einer Verbesserung gab es Lob. Die Person geht mit einer schlechteren Antwort ins Gespräch als nötig.',
      'Bitte eine KI ausdrücklich um Kritik: „Was würde ein strenger Personaler an dieser Antwort bemängeln?“',
    ],
  },
  {
    id: 'm2-echokammer-check',
    type: 'wissenscheck',
    title: 'Wissenscheck: Echokammer',
    questions: [
      {
        id: 'm2-echokammer-check-q1',
        prompt: 'Was fehlt in der Antwort der KI?',
        options: [
          {
            id: 'a',
            text: 'Ein Hinweis, dass die Antwort im Gespräch als ausweichend wirken kann.',
            explanation: 'Richtig. Genau das hätte geholfen. Stattdessen gab es nur Lob.',
          },
          {
            id: 'b',
            text: 'Mehr Lob und Ermutigung.',
            explanation: 'Nein. Lob gab es genug. Es fehlte die ehrliche Rückmeldung.',
          },
          {
            id: 'c',
            text: 'Nichts, die Antwort ist perfekt.',
            explanation:
              'Nein. Personalverantwortliche erwarten bei dieser Frage eine ehrliche Schwäche und wie du damit umgehst.',
          },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'm2-echokammer-check-q2',
        prompt: 'Wie holst du dir beim Üben mit einer KI echte Kritik?',
        options: [
          {
            id: 'a',
            text: 'Ich frage nach dem Üben, ob es gut war.',
            explanation: 'Das führt meist wieder zu Lob. Die Frage ist zu offen für Zustimmung.',
          },
          {
            id: 'b',
            text: 'Ich bitte die KI, die Rolle einer strengen Prüferin zu übernehmen und drei Schwachstellen zu nennen.',
            explanation:
              'Genau. Eine klare Rolle und eine klare Aufgabe bringen dich aus der Echokammer heraus.',
          },
          {
            id: 'c',
            text: 'Ich übe lieber gar nicht mit einer KI.',
            explanation:
              'Muss nicht sein. Üben mit einer KI kann helfen, wenn du gezielt nach Kritik fragst.',
          },
        ],
        correctOptionId: 'b',
      },
    ],
  },
] satisfies Unit[];
