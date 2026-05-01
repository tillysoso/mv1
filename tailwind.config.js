/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        /* Semantic surface tokens — use these for backgrounds */
        surface: {
          base:     'var(--color-surface-base)',
          raised:   'var(--color-surface-raised)',
          elevated: 'var(--color-surface-elevated)',
          sunken:   'var(--color-surface-sunken)',
        },
        /* Semantic text tokens */
        content: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
          muted:     'var(--color-text-muted)',
          link:      'var(--color-text-link)',
          'on-accent': 'var(--color-text-on-accent)',
          disabled:  'var(--color-text-disabled)',
        },
        /* Border tokens */
        border: {
          subtle:  'var(--color-border-subtle)',
          default: 'var(--color-border-default)',
          strong:  'var(--color-border-strong)',
        },
        /* Brand accent */
        accent: {
          DEFAULT: 'var(--color-accent-primary)',
          hover:   'var(--color-accent-primary-hover)',
          active:  'var(--color-accent-primary-active)',
          subtle:  'var(--color-accent-primary-subtle)',
        },
        /* Status tokens */
        status: {
          success:        'var(--color-status-success)',
          'success-bg':   'var(--color-status-success-subtle)',
          'success-text': 'var(--color-status-success-text)',
          warning:        'var(--color-status-warning)',
          'warning-bg':   'var(--color-status-warning-subtle)',
          'warning-text': 'var(--color-status-warning-text)',
          error:          'var(--color-status-error)',
          'error-bg':     'var(--color-status-error-subtle)',
          'error-text':   'var(--color-status-error-text)',
          info:           'var(--color-status-info)',
          'info-bg':      'var(--color-status-info-subtle)',
          'info-text':    'var(--color-status-info-text)',
        },
      },
      borderRadius: {
        xs:   'var(--radius-xs)',
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
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
