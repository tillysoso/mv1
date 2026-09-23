// Plain .js so node:test can import it directly, with no TS type-stripping
// needed (same reason as birthCardCalculator.js). Types live in the sibling sentryOptions.d.ts — no @ts-ignore.

/** Fraction of transactions sent as performance traces. */
export const TRACES_SAMPLE_RATE = 0.2;

/**
 * Sentry.init options, or null when no DSN is set — in which case Sentry is
 * never initialised (same no-op pattern as prototype mode for Supabase).
 */
export function buildSentryOptions(dsn, isDev) {
  if (!dsn) return null;
  return {
    dsn,
    // Permanent default, not a placeholder: no IPs, cookies, or user details.
    sendDefaultPii: false,
    environment: isDev ? 'development' : 'production',
    tracesSampleRate: TRACES_SAMPLE_RATE,
  };
}
