/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      /**
       * Semantic color utilities backed by CSS custom properties.
       *
       * These resolve correctly on web (CSS variables) and are available as
       * Tailwind utilities: bg-canvas, text-fg-base, border-border-default, etc.
       *
       * For React Native (non-web), use src/theme/tokens.ts directly, as CSS
       * variables are web-only. NativeWind v4 bridges these for web builds.
       *
       * The mapping mirrors src/theme/theme.css exactly — update both together.
       */
      colors: {
        // Backgrounds
        canvas:          'var(--color-bg-canvas)',
        surface:         'var(--color-bg-surface)',
        elevated:        'var(--color-bg-elevated)',
        inset:           'var(--color-bg-inset)',
        overlay:         'var(--color-bg-overlay)',

        // Foreground / Text
        'fg-base':       'var(--color-fg-base)',
        'fg-muted':      'var(--color-fg-muted)',
        'fg-subtle':     'var(--color-fg-subtle)',
        'fg-on-accent':  'var(--color-fg-on-accent)',
        'fg-on-feedback':'var(--color-fg-on-feedback)',

        // Borders
        'border-default':'var(--color-border-default)',
        'border-subtle': 'var(--color-border-subtle)',

        // Brand / Interactive
        brand:                'var(--color-brand)',
        interactive:          'var(--color-interactive)',
        'interactive-hover':  'var(--color-interactive-hover)',
        'interactive-subtle': 'var(--color-interactive-subtle)',

        // World palette (Threshold City)
        'world-signal': 'var(--color-world-signal)',
        'world-canal':  'var(--color-world-canal)',
        'world-dusk':   'var(--color-world-dusk)',

        // Feedback
        'feedback-success': 'var(--color-feedback-success)',
        'feedback-warning': 'var(--color-feedback-warning)',
        'feedback-error':   'var(--color-feedback-error)',
        'feedback-info':    'var(--color-feedback-info)',
      },
    },
  },
  plugins: [],
};
