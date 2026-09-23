// Plain .js so node:test can import it directly, with no TS type-stripping
// needed (same reason as birthCardCalculator.js). Types live in the sibling posthogConfig.d.ts — no @ts-ignore.

/**
 * Product events (tracker #147). Wrappers in posthog.ts take no free-form
 * properties, so nothing personal (name, DOB, birth cards, journal text) can
 * ride along on an event.
 */
export const ANALYTICS_EVENT = Object.freeze({
  ONBOARDING_COMPLETED: 'onboarding_completed',
  DAILY_DRAW_COMPLETED: 'daily_draw_completed',
});

/** Super + person property carrying the active accent theme (avatar id). */
export const ACCENT_THEME_PROPERTY = 'accent_theme';

/**
 * PostHog client config, or null when no API key is set — in which case
 * PostHog is never constructed (same no-op pattern as prototype mode).
 * An unset host falls through to the SDK default.
 */
export function buildPostHogConfig(apiKey, host) {
  if (!apiKey) return null;
  return {
    apiKey,
    options: {
      ...(host ? { host } : {}),
      // Retention (D3/D7/D30) is built in PostHog from these + our events.
      captureAppLifecycleEvents: true,
      // Errors belong to Sentry (tracker #146) — don't double-report.
      errorTracking: { autocapture: false },
      enableSessionReplay: false,
    },
  };
}

/**
 * Wraps a Web Storage object (window.localStorage) as PostHog custom storage.
 * PostHog's default 'file' persistence has no web backend without
 * AsyncStorage installed. Storage can throw (private mode, blocked site data);
 * failures degrade to "nothing persisted" rather than crashing.
 */
export function createWebStorage(storage) {
  return {
    getItem(key) {
      try {
        return storage ? storage.getItem(key) : null;
      } catch {
        return null;
      }
    },
    setItem(key, value) {
      try {
        if (storage) storage.setItem(key, value);
      } catch {
        // ignore — persistence is best-effort on web
      }
    },
  };
}

/**
 * What to do when the auth user changes. `previousUserId` is undefined until
 * the first auth state has been processed. `storedIdIsIdentified` is whether
 * PostHog's persisted distinct id belongs to an identified user (it can
 * outlive the Supabase session, e.g. expired session or cleared auth storage).
 *
 * - reset: drop the identified id so events stop being attributed to it.
 *   Never on a plain anonymous cold start — that would mint a new anonymous
 *   id every launch and break anonymous retention.
 * - identify: attach the (new) Supabase user id.
 */
export function resolveIdentityAction(previousUserId, nextUserId, storedIdIsIdentified) {
  if (nextUserId === previousUserId) return { reset: false, identify: false };
  if (nextUserId) {
    // Switching accounts without a signed-out state in between.
    const switching = typeof previousUserId === 'string';
    return { reset: switching, identify: true };
  }
  if (previousUserId === undefined) return { reset: storedIdIsIdentified, identify: false };
  return { reset: true, identify: false };
}
