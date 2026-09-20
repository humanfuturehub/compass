import type { UnitOfType } from '@/lib/content/types';

export function ErklaerungUnit({ unit }: { unit: UnitOfType<'erklaerung'> }) {
  return (
    <article>
      <h1 className="text-ink">{unit.title}</h1>
      <div className="mt-16 space-y-16">
        {unit.body.map((paragraph, i) => (
          <p key={i} className="text-body text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
