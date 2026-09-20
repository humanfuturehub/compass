import type { Step } from '@/lib/content/types';

export const m1 = {
  id: 'm1',
  kind: 'modul',
  title: 'Wie KI wirklich funktioniert',
  estimatedMinutes: 10,
  units: [
    {
      id: 'm1-muster-statt-wissen',
      type: 'erklaerung',
      title: 'Muster statt Wissen',
      body: [
        'Eine KI wie ChatGPT nennt man Sprachmodell. Sie hat sehr viele Texte gelesen: Bücher, Webseiten, Foren, Anleitungen. Dabei hat sie kein Wissen gespeichert wie ein Lexikon. Sie hat gelernt, welche Wörter oft zusammen vorkommen. Wenn du eine Frage stellst, baut sie eine Antwort aus diesen Mustern. Wort für Wort, immer das, was am wahrscheinlichsten als Nächstes passt.',
        'Das erklärt, warum die Antworten so flüssig klingen. Das Modell ist sehr gut darin, Sprache nachzubilden. Es weiß aber nicht, ob ein Satz stimmt. Ein wahrer Satz und ein erfundener Satz sehen für das Modell gleich aus, wenn beide gut klingen. Deshalb sagt man: Ein Sprachmodell ist eine Muster-Maschine, keine Wahrheits-Maschine.',
        'Ein Beispiel: Du fragst nach der Hauptstadt von Frankreich. Das Modell hat den Satz „Paris ist die Hauptstadt von Frankreich“ tausendfach gesehen. Die Antwort ist richtig, weil das Muster stark ist. Bei seltenen Themen ist das Muster schwach. Dann rät das Modell, und die Antwort klingt trotzdem genauso sicher wie bei Paris.',
      ],
    },
    {
      id: 'm1-wahrscheinlich-richtig',
      type: 'erklaerung',
      title: 'Wahrscheinlich, nicht sicher',
      body: [
        'Ein Sprachmodell antwortet immer. Es sagt fast nie „Das weiß ich nicht“. Der Grund: Es sucht keine Antwort, es erzeugt eine. Ob die Antwort stimmt, kann es selbst nicht prüfen. Es hat kein Bild von der Welt und keinen Zugriff auf die Wahrheit. Es hat nur Wahrscheinlichkeiten für Wörter, und die reichen für einen flüssigen Satz.',
        'Für dich heißt das: Je wichtiger eine Information ist, desto mehr musst du sie prüfen. Namen, Zahlen, Daten, Gesetze und Adressen sind typische Stellen, an denen ein Modell überzeugend falsch liegt. Frag dich bei jeder Antwort: Woher könnte das Modell das wissen? Und wo kann ich das selbst nachschauen?',
        'Trotzdem ist KI nützlich. Sie kann Texte umformulieren, zusammenfassen, Ideen sammeln oder dir beim Üben helfen. Das sind Aufgaben, bei denen es um Sprache geht und nicht um geheime Fakten. Die Kunst ist, die passenden Aufgaben zu erkennen. Genau darum geht es in den nächsten Modulen dieses Kurses.',
      ],
    },
    {
      id: 'm1-check',
      type: 'wissenscheck',
      title: 'Wissenscheck',
      questions: [
        {
          id: 'm1-check-q1',
          prompt: 'Woher kommt die Antwort eines Sprachmodells?',
          options: [
            {
              id: 'a',
              text: 'Aus einer geprüften Datenbank mit Fakten.',
              explanation:
                'Nein. Ein Sprachmodell hat keine Faktendatenbank. Es hat Muster aus vielen Texten gelernt und baut daraus eine Antwort.',
            },
            {
              id: 'b',
              text: 'Aus dem Internet, das es bei jeder Frage live durchsucht.',
              explanation:
                'Meistens nicht. Ein Sprachmodell antwortet aus dem, was es beim Training gelernt hat. Manche Programme kombinieren das mit einer Suche, aber die Antwort selbst bleibt eine Vorhersage.',
            },
            {
              id: 'c',
              text: 'Aus Mustern, welche Wörter wahrscheinlich als Nächstes passen.',
              explanation:
                'Genau. Das Modell berechnet Wort für Wort, was am besten passt. Deshalb klingen Antworten flüssig, auch wenn sie falsch sind.',
            },
          ],
          correctOptionId: 'c',
        },
        {
          id: 'm1-check-q2',
          prompt: 'Warum klingt eine falsche Antwort genauso sicher wie eine richtige?',
          options: [
            {
              id: 'a',
              text: 'Weil das Modell absichtlich täuscht.',
              explanation:
                'Nein. Das Modell hat keine Absicht. Es kann nur nicht unterscheiden, ob ein gut klingender Satz wahr ist.',
            },
            {
              id: 'b',
              text: 'Weil das Modell nicht prüfen kann, ob ein Satz stimmt.',
              explanation:
                'Richtig. Für das Modell sehen ein wahrer und ein erfundener Satz gleich aus, wenn beide gut klingen.',
            },
            {
              id: 'c',
              text: 'Weil die Antwort aus einem Lexikon kopiert ist.',
              explanation: 'Nein. Es wird nichts kopiert. Die Antwort wird jedes Mal neu zusammengesetzt.',
            },
          ],
          correctOptionId: 'b',
        },
        {
          id: 'm1-check-q3',
          prompt: 'Welche Aufgabe passt gut zu einem Sprachmodell?',
          options: [
            {
              id: 'a',
              text: 'Einen eigenen Text kürzer und klarer formulieren.',
              explanation: 'Ja. Hier geht es um Sprache, und du kannst das Ergebnis selbst beurteilen.',
            },
            {
              id: 'b',
              text: 'Die aktuelle Telefonnummer eines Amtes herausfinden.',
              explanation:
                'Lieber nicht. Zahlen und Kontaktdaten sind typische Stellen für erfundene Angaben. Schau auf der offiziellen Seite nach.',
            },
            {
              id: 'c',
              text: 'Entscheiden, ob ein Vertrag rechtlich in Ordnung ist.',
              explanation:
                'Nein. Bei Gesetzen und Verträgen liegt ein Modell oft überzeugend falsch. Das braucht eine Fachperson.',
            },
            {
              id: 'd',
              text: 'Ein Datum aus der Geschichte sicher nachschlagen.',
              explanation:
                'Vorsicht. Daten sind Fakten, die das Modell nur aus Mustern kennt. Prüfe sie in einer verlässlichen Quelle.',
            },
          ],
          correctOptionId: 'a',
        },
      ],
    },
  ],
  extras: [
    {
      id: 'm1-extra-tokens',
      type: 'erklaerung',
      title: 'Tokens',
      body: [
        'Ein Sprachmodell liest keine ganzen Wörter, sondern kleine Stücke. Diese Stücke heißen Tokens. Ein kurzes Wort ist oft ein Token, ein langes Wort besteht aus mehreren. Auch Satzzeichen sind Tokens. Wenn ein Modell eine Antwort schreibt, wählt es ein Token nach dem anderen. Dabei schaut es immer darauf, was bisher da steht.',
        'Warum ist das wichtig? Weil Anbieter oft nach Tokens abrechnen und weil ein Modell nur eine bestimmte Menge davon auf einmal verarbeiten kann. Ein deutscher Text braucht meist mehr Tokens als der gleiche Text auf Englisch. Das ist einer der Gründe, warum KI auf Englisch manchmal etwas besser funktioniert als auf Deutsch.',
      ],
    },
    {
      id: 'm1-extra-kontextfenster',
      type: 'erklaerung',
      title: 'Kontextfenster',
      body: [
        'Das Kontextfenster ist der Bereich, den ein Modell gleichzeitig im Blick hat. Alles, was in diesem Fenster steht, beeinflusst die nächste Antwort: deine Frage, frühere Nachrichten im selben Gespräch und die bisherige Antwort. Was außerhalb des Fensters liegt, ist für das Modell nicht mehr da. Es hat kein Gedächtnis darüber hinaus.',
        'Deshalb vergisst ein Chat scheinbar Dinge, wenn ein Gespräch sehr lang wird. Und deshalb hilft es, wichtige Informationen in deiner Frage zu wiederholen, statt anzunehmen, dass das Modell sie noch kennt. Ein neues Gespräch beginnt immer mit einem leeren Fenster, egal was du gestern gefragt hast.',
      ],
    },
  ],
} satisfies Step;
