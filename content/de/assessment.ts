// The assessment instrument: 12 fixed items, identical before and after the course.
// Ids are stable forever; the pre/post delta is computed on them.

import type { Assessment } from '@/lib/content/types';

export const assessment = [
  {
    id: 'assess-q01',
    prompt: 'Was macht ein Sprachmodell, wenn es antwortet?',
    options: [
      { id: 'a', text: 'Es sucht die Antwort in einer Faktendatenbank.', explanation: 'Nein. Ein Sprachmodell hat keine Faktendatenbank. Es hat Muster aus Texten gelernt.' },
      { id: 'b', text: 'Es sagt Wort für Wort voraus, was wahrscheinlich als Nächstes passt.', explanation: 'Richtig. Genau so entsteht jede Antwort, ob sie stimmt oder nicht.' },
      { id: 'c', text: 'Es fragt einen Menschen im Hintergrund.', explanation: 'Nein. Es antwortet automatisch, ohne dass ein Mensch mitliest.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q02',
    prompt: 'Eine KI nennt dir ein Datum, ganz ohne Zweifel. Was bedeutet der sichere Ton?',
    options: [
      { id: 'a', text: 'Nichts. Der Ton sagt nichts darüber aus, ob das Datum stimmt.', explanation: 'Richtig. Ein Sprachmodell klingt bei richtigen und falschen Angaben gleich sicher.' },
      { id: 'b', text: 'Dass die KI das Datum geprüft hat.', explanation: 'Nein. Ein Sprachmodell prüft nichts. Es erzeugt einen Satz, der gut passt.' },
      { id: 'c', text: 'Dass das Datum sehr wahrscheinlich richtig ist.', explanation: 'Nein. Gerade bei Daten und Zahlen liegen Modelle oft überzeugend falsch.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q03',
    prompt: 'Was ist eine Halluzination bei einer KI?',
    options: [
      { id: 'a', text: 'Ein Fehler, den die KI selbst bemerkt und meldet.', explanation: 'Nein. Das Besondere ist, dass die KI den Fehler nicht bemerkt.' },
      { id: 'b', text: 'Eine Antwort, die absichtlich lügt.', explanation: 'Nein. Es gibt keine Absicht. Das Modell kann wahr und erfunden nicht unterscheiden.' },
      { id: 'c', text: 'Eine erfundene Antwort, die überzeugend klingt.', explanation: 'Richtig. Das ist die Definition, und genau das macht sie gefährlich.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'assess-q04',
    prompt: 'Du fragst: „Mein Plan ist gut, oder?“ Was passiert wahrscheinlich?',
    options: [
      { id: 'a', text: 'Die KI prüft den Plan neutral.', explanation: 'Eher nicht. Die Frage legt eine Antwort nahe, und das Modell folgt ihr.' },
      { id: 'b', text: 'Die KI stimmt eher zu, weil die Frage Zustimmung nahelegt.', explanation: 'Richtig. Das nennt man Gefallsucht. Frag lieber nach Risiken.' },
      { id: 'c', text: 'Die KI lehnt den Plan ab, um vorsichtig zu sein.', explanation: 'Nein. Modelle sind darauf trainiert, freundlich zu wirken, nicht vorsichtig.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q05',
    prompt: 'Was ist die beste Bitte, wenn du ehrliche Kritik an deinem Text willst?',
    options: [
      { id: 'a', text: '„Nenne drei Schwachstellen in diesem Text.“', explanation: 'Richtig. Eine klare Aufgabe nach Kritik bringt dich aus der Echokammer.' },
      { id: 'b', text: '„Findest du meinen Text gut?“', explanation: 'Eher nicht. Diese Frage führt fast immer zu Lob.' },
      { id: 'c', text: '„Bestätige mir, dass der Text passt.“', explanation: 'Nein. Das ist eine Aufforderung zur Zustimmung, keine Bitte um Kritik.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q06',
    prompt: 'Welche Aufgabe eignet sich am wenigsten für ein Sprachmodell?',
    options: [
      { id: 'a', text: 'Einen Text in einfachere Sprache umschreiben.', explanation: 'Das passt gut. Es geht um Sprache, und du kannst das Ergebnis prüfen.' },
      { id: 'b', text: 'Eine Liste mit Fragen für ein Gespräch sammeln.', explanation: 'Das passt gut. Ideen sammeln ist eine Stärke von Sprachmodellen.' },
      { id: 'c', text: 'Die aktuelle Öffnungszeit eines Amtes nennen.', explanation: 'Richtig, das passt am wenigsten. Aktuelle Fakten schaust du auf der offiziellen Seite nach.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'assess-q07',
    prompt: 'Wofür steht das K in der RACE-Formel?',
    options: [
      { id: 'a', text: 'Kürze', explanation: 'Nein. Die Länge gehört zur Erwartung, nicht zum K.' },
      { id: 'b', text: 'Kontext', explanation: 'Richtig. Rolle, Aufgabe, Kontext, Erwartung.' },
      { id: 'c', text: 'Kontrolle', explanation: 'Nein. Kontrolle bleibt wichtig, ist aber kein Teil der Formel.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q08',
    prompt: 'Was gehört in den Kontext einer Frage an eine KI?',
    options: [
      { id: 'a', text: 'Informationen über dich und deine Situation, die die KI nicht kennt.', explanation: 'Richtig. Die KI weiß nichts über dich. Was sie nicht bekommt, erfindet sie.' },
      { id: 'b', text: 'Die Bitte, schnell zu antworten.', explanation: 'Nein. Das ändert nichts an der Antwort.' },
      { id: 'c', text: 'Ein Lob für die KI, damit sie sich Mühe gibt.', explanation: 'Nein. Lob wirkt nicht. Klare Informationen wirken.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q09',
    prompt: 'Was ist eine Echokammer beim Üben mit einer KI?',
    options: [
      { id: 'a', text: 'Die KI wiederholt deine Frage.', explanation: 'Nein. Es geht nicht um Wiederholung, sondern um Bestätigung.' },
      { id: 'b', text: 'Die KI antwortet nicht mehr.', explanation: 'Nein. Sie antwortet, aber nur mit dem, was du hören willst.' },
      { id: 'c', text: 'Du bekommst Lob statt Verbesserung und bleibst bei deiner Sicht.', explanation: 'Richtig. Deshalb bittest du beim Üben ausdrücklich um Kritik.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'assess-q10',
    prompt: 'Ein Sprachmodell hat einen Wissensstand. Was heißt das?',
    options: [
      { id: 'a', text: 'Es weiß alles bis heute.', explanation: 'Nein. Es kennt nur, was bis zu einem bestimmten Zeitpunkt in seinen Trainingsdaten war.' },
      { id: 'b', text: 'Es kennt nur, was bis zu einem bestimmten Zeitpunkt in seinen Trainingsdaten war.', explanation: 'Richtig. Für alles Aktuelle brauchst du eine andere Quelle.' },
      { id: 'c', text: 'Es lernt aus jedem Gespräch dazu.', explanation: 'Nein. Ein Gespräch verändert das Modell nicht.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q11',
    prompt: 'Eine KI hat dir ein Anschreiben geschrieben. Was musst du auf jeden Fall tun?',
    options: [
      { id: 'a', text: 'Jede Angabe über dich prüfen und Erfundenes streichen.', explanation: 'Richtig. Die Verantwortung für den Inhalt bleibt bei dir.' },
      { id: 'b', text: 'Es so abschicken, wenn es gut klingt.', explanation: 'Nein. Gut klingen heißt nicht, dass es stimmt.' },
      { id: 'c', text: 'Es von einer zweiten KI prüfen lassen und dann abschicken.', explanation: 'Nein. Eine zweite KI kennt dich genauso wenig. Prüfen musst du selbst.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q12',
    prompt: 'Welche Daten solltest du nicht in eine KI eingeben?',
    options: [
      { id: 'a', text: 'Allgemeine Fragen zu einem Thema.', explanation: 'Das ist unproblematisch.' },
      { id: 'b', text: 'Einen Text, den du umformulieren willst.', explanation: 'Das ist meist in Ordnung, solange keine persönlichen Daten anderer darin stehen.' },
      { id: 'c', text: 'Persönliche Daten anderer Menschen, zum Beispiel Namen und Adressen von Kindern.', explanation: 'Richtig. Daten anderer Menschen gehören nicht in eine KI.' },
    ],
    correctOptionId: 'c',
  },
] satisfies Assessment;
