/** Plain admin stat: a label and a number. Tokens only. */
export function StatTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-card bg-surface-sunken p-16">
      <p className="text-micro text-ink-muted">{label}</p>
      <p className="mt-4 font-heading text-display text-ink">{value}</p>
    </div>
  );
}
