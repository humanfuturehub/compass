// The four inline icons Compass needs. Sized by the caller through className;
// viewBox coordinates are geometry, not layout values.

type IconProps = { className?: string };

const svgProps = {
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

export function BackIcon({ className = 'h-20 w-20' }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );
}

export function TickIcon({ className = 'h-20 w-20' }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function DashIcon({ className = 'h-20 w-20' }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M5 10h10" />
    </svg>
  );
}

export function CopyIcon({ className = 'h-20 w-20' }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="7" y="7" width="9" height="9" rx="1.5" />
      <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" />
    </svg>
  );
}
