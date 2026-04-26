/**
 * CSS custom property names and helpers for the Majestic theme system.
 *
 * Usage
 * ─────
 * In NativeWind / Tailwind classes (web):  bg-canvas, text-fg-base, etc.
 *   (see tailwind.config.js for the class → CSS-var mapping)
 *
 * In inline styles or StyleSheet (web):
 *   style={{ backgroundColor: cssVar.bgCanvas }}
 *
 * Theme switching (apply to <html> element):
 *   document.documentElement.classList.add(themeClass.light)
 *   document.documentElement.classList.remove(themeClass.dark)
 *
 * Adding a new theme:
 *   1. Add an entry to themeClass below
 *   2. Add :root.theme-<name> { ... } in src/theme/theme.css
 */

/** Raw CSS custom property names (without var()). */
export const cssVarNames = {
  // Backgrounds
  bgCanvas:          '--color-bg-canvas',
  bgSurface:         '--color-bg-surface',
  bgElevated:        '--color-bg-elevated',
  bgInset:           '--color-bg-inset',
  bgOverlay:         '--color-bg-overlay',

  // Foreground / Text
  fgBase:            '--color-fg-base',
  fgMuted:           '--color-fg-muted',
  fgSubtle:          '--color-fg-subtle',
  fgOnAccent:        '--color-fg-on-accent',
  fgOnFeedback:      '--color-fg-on-feedback',

  // Borders
  borderDefault:     '--color-border-default',
  borderSubtle:      '--color-border-subtle',

  // Brand / Interactive
  brand:             '--color-brand',
  interactive:       '--color-interactive',
  interactiveHover:  '--color-interactive-hover',
  interactiveSubtle: '--color-interactive-subtle',

  // World palette (Threshold City)
  worldSignal:       '--color-world-signal',
  worldCanal:        '--color-world-canal',
  worldDusk:         '--color-world-dusk',

  // Feedback
  feedbackSuccess:   '--color-feedback-success',
  feedbackWarning:   '--color-feedback-warning',
  feedbackError:     '--color-feedback-error',
  feedbackInfo:      '--color-feedback-info',
} as const;

export type CssVarName = typeof cssVarNames[keyof typeof cssVarNames];

/** CSS var() references ready for use in inline styles. */
export const cssVar = (Object.fromEntries(
  Object.entries(cssVarNames).map(([k, v]) => [k, `var(${v})`])
) as { [K in keyof typeof cssVarNames]: string });

/** Class names applied to <html> to activate a theme.
 *  To add a theme: extend this object, then add the matching block in theme.css. */
export const themeClass = {
  dark:  'theme-dark',
  light: 'theme-light',
} as const;

export type ThemeName = keyof typeof themeClass;

/**
 * Reads the active theme from the <html> element.
 * Falls back to 'dark' when called outside a browser context (SSR/native).
 */
export function getActiveTheme(): ThemeName {
  if (typeof document === 'undefined') return 'dark';
  const html = document.documentElement;
  if (html.classList.contains(themeClass.light)) return 'light';
  if (html.classList.contains(themeClass.dark))  return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * Sets the active theme by toggling the class on <html>.
 * Persists the choice to localStorage under the key 'majestic-theme'.
 * Call this from your theme toggle UI; the initial load does not require it.
 */
export function setTheme(theme: ThemeName): void {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  Object.values(themeClass).forEach(cls => html.classList.remove(cls));
  html.classList.add(themeClass[theme]);
  try { localStorage.setItem('majestic-theme', theme); } catch { /* ignore */ }
}

/**
 * Restores the persisted theme preference without any flash.
 * Inline this script (minified) in <head> before any CSS for zero-FOUC.
 *
 * @example
 *   <script dangerouslySetInnerHTML={{ __html: restoreThemeScript }} />
 */
export const restoreThemeScript = `(function(){
  try {
    var t = localStorage.getItem('majestic-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.classList.add('theme-' + t);
    }
  } catch(e) {}
})();`;
