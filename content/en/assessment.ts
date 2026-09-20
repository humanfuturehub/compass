// English mirror of the assessment instrument. Same 12 ids, same correct options.

import type { Assessment } from '@/lib/content/types';

export const assessment = [
  {
    id: 'assess-q01',
    prompt: 'What does a language model do when it answers?',
    options: [
      { id: 'a', text: 'It looks the answer up in a database of facts.', explanation: 'No. A language model has no database of facts. It has learned patterns from text.' },
      { id: 'b', text: 'It predicts, word by word, what is likely to come next.', explanation: 'Correct. That is how every answer is produced, whether it is true or not.' },
      { id: 'c', text: 'It asks a person in the background.', explanation: 'No. It answers automatically, with no person reading along.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q02',
    prompt: 'An AI gives you a date with no hint of doubt. What does the confident tone mean?',
    options: [
      { id: 'a', text: 'Nothing. The tone says nothing about whether the date is right.', explanation: 'Correct. A language model sounds equally sure about right and wrong statements.' },
      { id: 'b', text: 'That the AI has checked the date.', explanation: 'No. A language model checks nothing. It produces a sentence that fits well.' },
      { id: 'c', text: 'That the date is very likely correct.', explanation: 'No. Dates and numbers are exactly where models are often convincingly wrong.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q03',
    prompt: 'What is an AI hallucination?',
    options: [
      { id: 'a', text: 'A mistake the AI notices and reports itself.', explanation: 'No. The point is that the AI does not notice the mistake.' },
      { id: 'b', text: 'An answer that lies on purpose.', explanation: 'No. There is no intent. The model cannot tell true from invented.' },
      { id: 'c', text: 'An invented answer that sounds convincing.', explanation: 'Correct. That is the definition, and exactly what makes it dangerous.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'assess-q04',
    prompt: 'You ask: "My plan is good, right?" What is likely to happen?',
    options: [
      { id: 'a', text: 'The AI reviews the plan neutrally.', explanation: 'Unlikely. The question suggests an answer, and the model follows it.' },
      { id: 'b', text: 'The AI tends to agree because the question invites agreement.', explanation: 'Correct. This is called sycophancy. Ask about risks instead.' },
      { id: 'c', text: 'The AI rejects the plan to be cautious.', explanation: 'No. Models are trained to seem friendly, not cautious.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q05',
    prompt: 'What is the best request when you want honest criticism of your text?',
    options: [
      { id: 'a', text: '"Name three weaknesses in this text."', explanation: 'Correct. A clear task asking for criticism gets you out of the echo chamber.' },
      { id: 'b', text: '"Do you like my text?"', explanation: 'Not really. This question almost always leads to praise.' },
      { id: 'c', text: '"Confirm that the text is fine."', explanation: 'No. That is a request for agreement, not for criticism.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q06',
    prompt: 'Which task is least suited to a language model?',
    options: [
      { id: 'a', text: 'Rewriting a text in simpler language.', explanation: 'That fits well. It is about language, and you can check the result.' },
      { id: 'b', text: 'Collecting a list of questions for a conversation.', explanation: 'That fits well. Gathering ideas is a strength of language models.' },
      { id: 'c', text: 'Giving the current opening hours of a public office.', explanation: 'Correct, that fits least. Current facts belong on the official website.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'assess-q07',
    prompt: 'What does the C in the RACE formula stand for?',
    options: [
      { id: 'a', text: 'Conciseness', explanation: 'No. Length belongs to the expectation, not to the C.' },
      { id: 'b', text: 'Context', explanation: 'Correct. Role, Assignment, Context, Expectation.' },
      { id: 'c', text: 'Control', explanation: 'No. Checking stays important, but it is not part of the formula.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q08',
    prompt: 'What belongs in the context of a question to an AI?',
    options: [
      { id: 'a', text: 'Information about you and your situation that the AI does not know.', explanation: 'Correct. The AI knows nothing about you. What it does not get, it invents.' },
      { id: 'b', text: 'A request to answer quickly.', explanation: 'No. That changes nothing about the answer.' },
      { id: 'c', text: 'Praise for the AI so that it tries harder.', explanation: 'No. Praise has no effect. Clear information does.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q09',
    prompt: 'What is an echo chamber when practising with an AI?',
    options: [
      { id: 'a', text: 'The AI repeats your question.', explanation: 'No. It is not about repetition but about confirmation.' },
      { id: 'b', text: 'The AI stops answering.', explanation: 'No. It answers, but only with what you want to hear.' },
      { id: 'c', text: 'You get praise instead of improvement and stay with your own view.', explanation: 'Correct. That is why you explicitly ask for criticism when practising.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'assess-q10',
    prompt: 'A language model has a knowledge cutoff. What does that mean?',
    options: [
      { id: 'a', text: 'It knows everything up to today.', explanation: 'No. It only knows what was in its training data up to a certain point in time.' },
      { id: 'b', text: 'It only knows what was in its training data up to a certain point in time.', explanation: 'Correct. For anything current you need another source.' },
      { id: 'c', text: 'It learns from every conversation.', explanation: 'No. A conversation does not change the model.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'assess-q11',
    prompt: 'An AI wrote a cover letter for you. What must you do in any case?',
    options: [
      { id: 'a', text: 'Check every statement about yourself and delete anything invented.', explanation: 'Correct. Responsibility for the content stays with you.' },
      { id: 'b', text: 'Send it as it is if it sounds good.', explanation: 'No. Sounding good does not mean it is true.' },
      { id: 'c', text: 'Have a second AI check it and then send it.', explanation: 'No. A second AI knows you just as little. You have to check it yourself.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'assess-q12',
    prompt: 'Which data should you not enter into an AI?',
    options: [
      { id: 'a', text: 'General questions about a topic.', explanation: 'That is unproblematic.' },
      { id: 'b', text: 'A text you want to rephrase.', explanation: "That is usually fine, as long as it contains no other people's personal data." },
      { id: 'c', text: "Other people's personal data, for example children's names and addresses.", explanation: "Correct. Other people's data does not belong in an AI." },
    ],
    correctOptionId: 'c',
  },
] satisfies Assessment;
