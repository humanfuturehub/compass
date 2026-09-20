import type { Config } from 'tailwindcss';

// The only place besides app/globals.css where literal px values are allowed.
// Every scale below *replaces* the Tailwind default so that only token-named
// classes exist. Spacing keys are named by their px value: p-16 is 16px.

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'hfh-blue': 'var(--hfh-blue)',
      'hfh-orange': 'var(--hfh-orange)',
      'hfh-teal': 'var(--hfh-teal)',
      'blue-tint': 'var(--hfh-blue-tint)',
      'orange-tint': 'var(--hfh-orange-tint)',
      'teal-tint': 'var(--hfh-teal-tint)',
      ink: 'var(--ink)',
      'ink-muted': 'var(--ink-muted)',
      surface: 'var(--surface)',
      'surface-sunken': 'var(--surface-sunken)',
      border: 'var(--border)',
    },
    spacing: {
      0: '0',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      32: '32px',
      40: '40px',
      56: '56px',
    },
    borderRadius: {
      none: '0',
      card: 'var(--r-card)',
      btn: 'var(--r-btn)',
      pill: 'var(--r-pill)',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
    },
    boxShadow: {
      DEFAULT: 'var(--shadow)',
      none: 'none',
    },
    fontFamily: {
      heading: ['var(--font-heading)', 'sans-serif'],
      body: ['var(--font-body)', 'sans-serif'],
    },
    fontSize: {
      display: ['28px', { lineHeight: '34px', fontWeight: '600' }],
      h1: ['24px', { lineHeight: '30px', fontWeight: '600' }],
      h2: ['19px', { lineHeight: '26px', fontWeight: '600' }],
      body: ['17px', { lineHeight: '27px' }],
      small: ['15px', { lineHeight: '23px' }],
      micro: ['13px', { lineHeight: '18px', fontWeight: '500' }],
    },
    maxWidth: {
      none: 'none',
      full: '100%',
      learner: '520px',
      admin: '1100px',
      frame: '390px', // /dev/components only
    },
    transitionDuration: {
      DEFAULT: '120ms',
    },
    ringWidth: {
      DEFAULT: '2px',
      0: '0',
      1: '1px',
    },
    ringOffsetWidth: {
      DEFAULT: '2px',
      0: '0',
    },
    extend: {
      height: {
        header: '56px',
        btn: '48px',
        option: '56px',
        tap: '44px',
        dot: '8px',
      },
      minHeight: {
        btn: '48px',
        option: '56px',
        tap: '44px',
      },
      width: {
        tap: '44px',
        dot: '8px',
      },
      minWidth: {
        tap: '44px',
      },
      gap: {
        dots: '6px',
      },
    },
  },
  plugins: [],
};

export default config;
