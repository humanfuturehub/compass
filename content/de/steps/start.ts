import type { Step } from '@/lib/content/types';

export const start = {
  id: 'start',
  kind: 'start',
  title: "Los geht's",
  estimatedMinutes: 8,
  units: [
    {
      id: 'start-willkommen',
      type: 'erklaerung',
      title: 'Willkommen bei Compass',
      body: [
        'Schön, dass du da bist. Compass ist ein kurzer Kurs über künstliche Intelligenz, kurz KI. Du lernst, was KI gut kann, wo sie Fehler macht und wie du sie sicher nutzt. Du brauchst kein Vorwissen. Alles ist in einfacher Sprache geschrieben. Du kannst den Kurs auf dem Handy machen, in kleinen Schritten, wann du willst.',
        'Wichtig: In diesem Kurs gibt es keine KI. Du chattest hier mit niemandem. Alle Beispiele sind aufgezeichnet und vorher geprüft. So kannst du in Ruhe sehen, wie eine KI antwortet, ohne dass etwas Unerwartetes passiert. Und es werden keine persönlichen Daten von dir gebraucht. Du bist hier nur mit deinem Zugangscode unterwegs.',
      ],
    },
    {
      id: 'start-was-dich-erwartet',
      type: 'erklaerung',
      title: 'Was dich erwartet',
      body: [
        'Der Kurs hat sechs Module. Zuerst schauen wir, wie KI wirklich funktioniert. Dann siehst du drei typische Fehler, die eine KI macht. Danach lernst du, wie du bessere Fragen stellst. Im vierten Modul geht es um KI in deinem Alltag, zum Beispiel bei einer Bewerbung. Am Ende bekommst du eine Teilnahmebescheinigung, die du ausdrucken oder speichern kannst.',
        'Jedes Modul dauert nur wenige Minuten. Oben siehst du immer, in welchem Modul du bist und wie viel Zeit ungefähr noch bleibt. Es gibt keine Prozentanzeige und keine Punkte. Du musst dich mit niemandem vergleichen. Es geht nur darum, dass du am Ende KI besser einschätzen kannst als heute.',
      ],
    },
    {
      id: 'start-wie-du-lernst',
      type: 'erklaerung',
      title: 'Wie du hier lernst',
      body: [
        'Zwischendurch gibt es kurze Fragen. Sie heißen Wissenscheck. Du kannst so oft antworten, wie du willst. Zu jeder Antwort bekommst du eine Erklärung, egal ob sie richtig war oder nicht. Es gibt keine Note und keine Bewertung. Die Fragen sind kein Test. Sie helfen dir nur, das Gelernte noch einmal zu sortieren.',
        'Du kannst jede Frage auch überspringen. Der Knopf Weiter ist immer aktiv. Manche Module haben am Ende einen Teil mit dem Namen Mehr dazu. Das ist freiwillig und nicht nötig für die Bescheinigung. Wenn dich ein Thema interessiert, schau rein. Wenn nicht, geh einfach weiter zum nächsten Modul.',
      ],
    },
    {
      id: 'start-aufhoeren-ist-ok',
      type: 'erklaerung',
      title: 'Aufhören ist okay',
      body: [
        'Du kannst jederzeit aufhören. Wir merken uns, wo du warst. Wenn du zurückkommst, geht es genau an dieser Stelle weiter, nicht wieder von vorn. Das gilt auch, wenn du das Handy wechselst. Dafür hast du einen Link bekommen, den du dir selbst schicken kannst, zum Beispiel per WhatsApp. Du findest ihn jederzeit in der Kursübersicht.',
        'Gleich kommen zwölf kurze Fragen. Sie zeigen uns, was du heute schon über KI weißt. Du siehst dabei nicht, ob eine Antwort richtig war, und niemand bewertet dich. Am Ende des Kurses stellen wir dir die gleichen Fragen noch einmal. So siehst du selbst, was sich für dich verändert hat.',
      ],
    },
    {
      id: 'start-einstiegsfragen',
      type: 'assessment',
      title: 'Einstiegsfragen',
      phase: 'pre',
    },
  ],
} satisfies Step;
