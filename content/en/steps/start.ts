import type { Step } from '@/lib/content/types';

export const start = {
  id: 'start',
  kind: 'start',
  title: "Let's go",
  estimatedMinutes: 8,
  units: [
    {
      id: 'start-willkommen',
      type: 'erklaerung',
      title: 'Welcome to Compass',
      body: [
        "Good to have you here. Compass is a short course about artificial intelligence, AI for short. You will learn what AI does well, where it makes mistakes and how to use it safely. You don't need any prior knowledge. Everything is written in plain language. You can do the course on your phone, in small steps, whenever you like.",
        'Important: there is no AI in this course. You are not chatting with anyone here. Every example is recorded and was checked beforehand. That way you can calmly watch how an AI answers without anything unexpected happening. And no personal data is needed from you. You are here with nothing but your access code.',
      ],
    },
    {
      id: 'start-was-dich-erwartet',
      type: 'erklaerung',
      title: 'What to expect',
      body: [
        'The course has six modules. First we look at how AI really works. Then you will see three typical mistakes an AI makes. After that you learn how to ask better questions. The fourth module is about AI in your everyday life, for example when applying for a job. At the end you receive a certificate of participation that you can print or save.',
        'Each module takes only a few minutes. At the top you always see which module you are in and roughly how much time is left. There is no percentage bar and there are no points. You do not have to compare yourself with anyone. The only goal is that at the end you can judge AI better than you can today.',
      ],
    },
    {
      id: 'start-wie-du-lernst',
      type: 'erklaerung',
      title: 'How you learn here',
      body: [
        'In between there are short questions. They are called knowledge checks. You can answer as often as you like. For every answer you get an explanation, whether it was right or not. There is no grade and no rating. The questions are not a test. They only help you sort what you have learned once more.',
        'You can also skip any question. The Next button is always active. Some modules end with a part called Go deeper. That part is optional and not needed for the certificate. If a topic interests you, take a look. If not, simply move on to the next module and keep going at your own pace.',
      ],
    },
    {
      id: 'start-aufhoeren-ist-ok',
      type: 'erklaerung',
      title: 'Stopping is fine',
      body: [
        'You can stop at any time. We remember where you were. When you come back, you continue exactly there, not from the beginning again. That also applies if you switch phones. For that you received a link you can send to yourself, for example on WhatsApp. You can find it at any time in the course overview.',
        'Next come twelve short questions. They show us what you already know about AI today. You will not see whether an answer was right, and nobody rates you. At the end of the course we ask you the same questions again. That way you can see for yourself what has changed for you since today.',
      ],
    },
    {
      id: 'start-einstiegsfragen',
      type: 'assessment',
      title: 'Opening questions',
      phase: 'pre',
    },
  ],
} satisfies Step;
