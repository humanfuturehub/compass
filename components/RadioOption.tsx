import type { ReactNode } from 'react';

// One 56px-min option in a radio group. Native radio (sr-only) for semantics and
// keyboard behaviour; the label carries the visual state through peer- variants.
// Used by CheckQuestion, AssessmentRunner and QuizRunner.

const optionLabel =
  'flex min-h-option w-full cursor-pointer items-center gap-12 rounded-btn border border-border ' +
  'bg-surface px-16 py-12 text-body text-ink transition-opacity duration-120 ' +
  'peer-checked:border-hfh-blue peer-checked:bg-blue-tint peer-checked:ring-1 ' +
  'peer-checked:ring-inset peer-checked:ring-hfh-blue ' +
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ' +
  'peer-focus-visible:outline-hfh-blue';

type Props = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  trailing?: ReactNode;
};

export function RadioOption({ id, name, value, checked, onChange, children, trailing }: Props) {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <label htmlFor={id} className={optionLabel}>
        <span className="flex-1">{children}</span>
        {trailing}
      </label>
    </>
  );
}
