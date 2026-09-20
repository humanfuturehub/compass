// The public quiz on /quiz: seven items, no login, German only in v1.

import type { Quiz } from '@/lib/content/types';

export const quiz = [
  {
    id: 'quiz-q1',
    prompt: 'Eine KI wie ChatGPT antwortet auf deine Frage. Was passiert dabei?',
    options: [
      { id: 'a', text: 'Sie schlägt die Antwort nach.', explanation: 'Nein. Sie schlägt nichts nach. Sie baut die Antwort aus Sprachmustern.' },
      { id: 'b', text: 'Sie sagt voraus, welches Wort als Nächstes passt.', explanation: 'Richtig. Wort für Wort, immer das wahrscheinlichste.' },
      { id: 'c', text: 'Sie denkt nach wie ein Mensch.', explanation: 'Nein. Es gibt kein Verstehen im menschlichen Sinn.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'quiz-q2',
    prompt: 'Eine KI nennt dir eine Jahreszahl. Wie sicher kannst du sein?',
    options: [
      { id: 'a', text: 'Sehr sicher, KI macht bei Zahlen selten Fehler.', explanation: 'Leider nein. Zahlen und Daten sind typische Fehlerstellen.' },
      { id: 'b', text: 'Sicher, wenn die Antwort überzeugend klingt.', explanation: 'Nein. Der Ton sagt nichts über die Richtigkeit.' },
      { id: 'c', text: 'Nicht sicher, ich schaue in einer Quelle nach.', explanation: 'Richtig. Fakten prüfst du außerhalb der KI.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'quiz-q3',
    prompt: 'Was ist eine Halluzination bei einer KI?',
    options: [
      { id: 'a', text: 'Eine erfundene Antwort, die überzeugend klingt.', explanation: 'Richtig. Das Modell merkt den Fehler selbst nicht.' },
      { id: 'b', text: 'Ein Bild, das die KI malt.', explanation: 'Nein. Das Wort meint erfundene Inhalte, die als Fakten auftreten.' },
      { id: 'c', text: 'Eine Antwort, die zu lang ist.', explanation: 'Nein. Länge hat damit nichts zu tun.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'quiz-q4',
    prompt: 'Du fragst eine KI: „Meine Idee ist gut, oder?“ Was ist wahrscheinlich?',
    options: [
      { id: 'a', text: 'Sie sagt ehrlich, was sie davon hält.', explanation: 'Eher nicht. Die Frage lenkt sie zur Zustimmung.' },
      { id: 'b', text: 'Sie stimmt zu, weil die Frage das nahelegt.', explanation: 'Richtig. Das nennt man Gefallsucht.' },
      { id: 'c', text: 'Sie verweigert die Antwort.', explanation: 'Nein. Sie antwortet, und zwar meist zustimmend.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'quiz-q5',
    prompt: 'Du übst mit einer KI für ein Gespräch. Wie bekommst du echte Kritik?',
    options: [
      { id: 'a', text: 'Ich frage: „War das gut?“', explanation: 'Das führt meist zu Lob, nicht zu Kritik.' },
      { id: 'b', text: 'Ich bitte um drei konkrete Schwachstellen.', explanation: 'Richtig. Eine klare Aufgabe bringt eine ehrliche Antwort.' },
      { id: 'c', text: 'Ich sage der KI, dass ich sehr gut war.', explanation: 'Nein. Dann bestätigt sie dich nur.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'quiz-q6',
    prompt: 'Was gehört in eine gute Frage an eine KI?',
    options: [
      { id: 'a', text: 'Nur die Aufgabe, kurz und knapp.', explanation: 'Zu wenig. Ohne Kontext muss die KI raten.' },
      { id: 'b', text: 'Rolle, Aufgabe, Kontext und Erwartung.', explanation: 'Richtig. Das ist die RACE-Formel.' },
      { id: 'c', text: 'Ein freundliches Lob, damit sie sich Mühe gibt.', explanation: 'Nein. Lob wirkt nicht, Informationen wirken.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'quiz-q7',
    prompt: 'Welche Daten gehören nicht in eine KI?',
    options: [
      { id: 'a', text: 'Eine allgemeine Frage zu einem Thema.', explanation: 'Das ist unproblematisch.' },
      { id: 'b', text: 'Ein Text, den du kürzer haben willst.', explanation: 'Meist in Ordnung, wenn keine Daten anderer Menschen darin stehen.' },
      { id: 'c', text: 'Namen und Adressen anderer Menschen.', explanation: 'Richtig. Persönliche Daten anderer gehören nicht in eine KI.' },
    ],
    correctOptionId: 'c',
  },
] satisfies Quiz;
