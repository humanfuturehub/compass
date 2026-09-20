import { notFound } from 'next/navigation';
import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/Button';
import { CheckQuestion } from '@/components/CheckQuestion';
import { MerkblattCard } from '@/components/MerkblattCard';
import { ModuleCard } from '@/components/ModuleCard';
import { ScenarioCard } from '@/components/ScenarioCard';
import { StepIndicator } from '@/components/StepIndicator';
import { TranscriptCard } from '@/components/TranscriptCard';
import { UnitDots } from '@/components/UnitDots';
import { sample } from './sample';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-24">
      <p className="mb-12 text-micro text-ink-muted">{title}</p>
      <div className="space-y-12">{children}</div>
    </section>
  );
}

/** Every learner component in every state, inside a 390px frame. Not for production. */
export default function ComponentsPage() {
  if (process.env.VERCEL_ENV === 'production') notFound();

  return (
    <div className="bg-surface-sunken py-24">
      <div className="mx-auto max-w-frame bg-surface">
        <AppHeader
          title={sample.moduleTitle}
          backHref="#"
          dots={['done', 'done', 'current', 'todo', 'todo']}
          remainingMinutes={7}
        />
        <div className="px-20">
          <Section title="StepIndicator">
            <StepIndicator n={3} total={6} />
          </Section>

          <Section title="UnitDots">
            <UnitDots states={['done', 'current', 'todo']} />
            <UnitDots states={['done', 'done', 'done']} />
          </Section>

          <Section title="Button">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="quiet">Quiet</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth={false}>Auto width</Button>
          </Section>

          <Section title="ModuleCard">
            <ModuleCard title="Los geht's" minutes={8} href="#" state="done" />
            <ModuleCard title={sample.moduleTitle} minutes={10} href="#" state="current" />
            <ModuleCard title="Wo KI Fehler macht" minutes={12} href="#" state="todo" />
            <ModuleCard
              title="Besser fragen mit RACE"
              minutes={8}
              href="#"
              state="locked"
              previousTitle="Wo KI Fehler macht"
            />
            <ModuleCard title="Tokens" href="#" state="todo" variant="extra" />
            <ModuleCard title="Kontextfenster" href="#" state="locked" variant="extra" />
          </Section>

          <Section title="TranscriptCard">
            <TranscriptCard turns={sample.turns} />
          </Section>

          <Section title="CheckQuestion">
            <CheckQuestion question={sample.question} />
          </Section>

          <Section title="ScenarioCard">
            <ScenarioCard situation={sample.scenario.situation} responses={sample.scenario.responses} />
          </Section>

          <Section title="MerkblattCard">
            <MerkblattCard title={sample.merkblatt.title} summary={sample.merkblatt.summary} />
          </Section>
        </div>
      </div>
    </div>
  );
}
