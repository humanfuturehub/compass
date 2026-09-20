import type { Step } from '@/lib/content/types';

export const m3 = {
  id: 'm3',
  kind: 'modul',
  title: 'Besser fragen mit RACE',
  estimatedMinutes: 8,
  units: [
    {
      id: 'm3-race',
      type: 'erklaerung',
      title: 'Die RACE-Formel',
      body: [
        'Eine gute Frage an eine KI hat vier Teile. Die Formel heißt RACE: Rolle, Aufgabe, Kontext, Erwartung. Rolle: Sag der KI, aus welcher Sicht sie antworten soll, zum Beispiel als strenge Personalerin. Aufgabe: Sag genau, was sie tun soll, zum Beispiel drei Schwachstellen nennen. So wird aus einer vagen Bitte ein klarer Auftrag.',
        'Kontext: Gib die Informationen, die die KI braucht. Sie kennt dich nicht und weiß nichts über deine Situation. Erwartung: Beschreibe, wie das Ergebnis aussehen soll. Wie lang, in welchem Ton, in welcher Form. Je klarer deine Erwartung, desto weniger muss die KI raten, und desto weniger erfindet sie dazu.',
        'Ein Beispiel: „Du bist eine erfahrene Personalerin. Prüfe meine Antwort auf die Frage nach meinen Schwächen. Ich bewerbe mich als Pflegekraft. Nenne drei konkrete Probleme und einen besseren Vorschlag, in einfacher Sprache.“ Alle vier Teile sind da. Vergleiche das mit der Frage „Wie findest du meine Antwort?“.',
      ],
    },
    {
      id: 'm3-check',
      type: 'wissenscheck',
      title: 'Wissenscheck',
      questions: [
        {
          id: 'm3-check-q1',
          prompt:
            'Welcher Teil von RACE fehlt in dieser Frage: „Schreib mir eine Bewerbung als Verkäuferin, kurz und freundlich“?',
          options: [
            {
              id: 'a',
              text: 'Rolle',
              explanation:
                'Stimmt zum Teil, eine Rolle fehlt auch. Aber vor allem fehlt der Kontext: Wer bist du, welche Erfahrung hast du, welche Stelle ist es?',
            },
            {
              id: 'b',
              text: 'Kontext',
              explanation: 'Richtig. Ohne Informationen über dich und die Stelle muss die KI alles erfinden.',
            },
            {
              id: 'c',
              text: 'Erwartung',
              explanation: 'Nein. „Kurz und freundlich“ ist bereits eine Erwartung.',
            },
          ],
          correctOptionId: 'b',
        },
        {
          id: 'm3-check-q2',
          prompt: 'Warum hilft eine klare Erwartung gegen erfundene Inhalte?',
          options: [
            {
              id: 'a',
              text: 'Weil die KI dann weniger raten muss.',
              explanation: 'Genau. Je weniger offen bleibt, desto weniger füllt das Modell mit Mustern auf.',
            },
            {
              id: 'b',
              text: 'Weil die KI dann Zugang zu Fakten bekommt.',
              explanation: 'Nein. Eine Frage gibt dem Modell keinen Zugang zu neuen Fakten.',
            },
            {
              id: 'c',
              text: 'Weil die KI dann langsamer antwortet.',
              explanation: 'Nein. Die Geschwindigkeit hat damit nichts zu tun.',
            },
          ],
          correctOptionId: 'a',
        },
        {
          id: 'm3-check-q3',
          prompt: 'Was ist ein guter Kontext für die Bitte um Hilfe bei einem Elternbrief?',
          options: [
            {
              id: 'a',
              text: '„Schreib einen Elternbrief.“',
              explanation: 'Das ist nur die Aufgabe. Es fehlt alles über Anlass, Klasse und Ton.',
            },
            {
              id: 'b',
              text: '„Ich bin Klassenlehrerin einer 3. Klasse. Am Freitag fällt der Ausflug wegen Regen aus. Die Eltern sollen wissen, dass die Kinder normal Unterricht haben.“',
              explanation:
                'Ja. Wer, was, wann, für wen: Die KI weiß jetzt, worum es geht, und muss nichts erfinden.',
            },
            {
              id: 'c',
              text: '„Mach es bitte schnell und gut.“',
              explanation:
                'Das ist eine Erwartung, aber kein Kontext. Die KI weiß immer noch nicht, worum es geht.',
            },
          ],
          correctOptionId: 'b',
        },
      ],
    },
  ],
} satisfies Step;
