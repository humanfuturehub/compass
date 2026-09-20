// Sample props for the component gallery only. Not learner-facing content.

export const sample = {
  moduleTitle: 'Wie KI wirklich funktioniert',
  turns: [
    { role: 'user' as const, text: 'Wann ist Goethe zum ersten Mal geflogen?' },
    {
      role: 'assistant' as const,
      text: 'Goethe flog 1798 von Weimar nach Frankfurt.',
      highlight: true,
    },
  ],
  question: {
    id: 'dev-q1',
    prompt: 'Was macht ein Sprachmodell, wenn es eine Antwort schreibt?',
    options: [
      {
        id: 'a',
        text: 'Es schlägt in einer Datenbank mit Fakten nach.',
        explanation: 'Nein. Ein Sprachmodell hat keine Faktendatenbank, es hat Muster aus Texten gelernt.',
      },
      {
        id: 'b',
        text: 'Es sagt Wort für Wort voraus, was wahrscheinlich als Nächstes kommt.',
        explanation: 'Genau. Es berechnet, welches Wort statistisch am besten passt, eines nach dem anderen.',
      },
      {
        id: 'c',
        text: 'Es versteht die Frage und denkt wie ein Mensch nach.',
        explanation: 'Nein. Es gibt kein Verstehen im menschlichen Sinn, nur sehr gute Mustererkennung.',
      },
    ],
    correctOptionId: 'b',
  },
  scenario: {
    situation:
      'Du sollst morgen ein Anschreiben abgeben. Eine KI hat dir einen Entwurf geschrieben, der gut klingt, aber zwei Dinge über dich erfindet.',
    responses: [
      {
        id: 'a',
        label: 'Weg A',
        text: 'Du streichst die erfundenen Stellen und schickst den Rest.',
        explanation: 'Schnell und ehrlich. Der Text bleibt aber vielleicht unpersönlich.',
      },
      {
        id: 'b',
        label: 'Weg B',
        text: 'Du schreibst den Entwurf mit eigenen Beispielen neu.',
        explanation: 'Mehr Arbeit, aber der Text ist dann wirklich deiner.',
      },
      {
        id: 'c',
        label: 'Weg C',
        text: 'Du bittest die KI um eine Version ohne erfundene Details.',
        explanation: 'Geht oft gut, aber du musst wieder alles prüfen.',
      },
    ],
  },
  merkblatt: {
    title: 'Merkblatt: KI im Bewerbungsprozess',
    summary: 'Die wichtigsten Regeln auf einer Seite.',
  },
};
