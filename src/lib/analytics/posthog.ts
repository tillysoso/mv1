import PostHog from 'posthog-react-native';
import { Platform } from 'react-native';
import {
  ANALYTICS_EVENT,
  ACCENT_THEME_PROPERTY,
  buildPostHogConfig,
  createWebStorage,
  resolveIdentityAction,
} from './posthogConfig';

// PostHog product analytics (tracker #147). Runs alongside the web-only GA
// wrapper in ./index.ts — that one is untouched this wave.

const config = buildPostHogConfig(
  process.env.EXPO_PUBLIC_POSTHOG_KEY,
  process.env.EXPO_PUBLIC_POSTHOG_HOST,
);

// False when EXPO_PUBLIC_POSTHOG_KEY isn't set — every export below no-ops.
export const isProductAnalyticsConfigured = config !== null;

let client: PostHog | null = null;
// undefined until the first auth state has been processed.
let identifiedUserId: string | null | undefined = undefined;
let accentTheme: string | null = null;

// Accessing window.localStorage can itself throw (blocked site data).
function webLocalStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Call once, at module scope in app/_layout.tsx, before any rendering. */
export function initProductAnalytics(): void {
  if (!config || client) return;
  client = new PostHog(config.apiKey, {
    ...config.options,
    ...(Platform.OS === 'web'
      ? { customStorage: createWebStorage(webLocalStorage()) }
      : {}),
  });
}

/**
 * Identify by Supabase user id only — never name, email, or DOB. Call once auth
 * has resolved (first state included), and with null on sign-out. With no user
 * (incl. prototype mode) PostHog's anonymous id stands.
 */
export function identifyUser(userId: string | null): void {
  if (!client || userId === identifiedUserId) return;
  const c = client;
  const previousUserId = identifiedUserId;
  identifiedUserId = userId;
  // ready(): persisted ids are loaded asynchronously on native.
  void c.ready().then(() => {
    const storedIdIsIdentified = c.getDistinctId() !== c.getAnonymousId();
    const action = resolveIdentityAction(previousUserId, userId, storedIdIsIdentified);
    if (action.reset) c.reset();
    if (action.identify && userId) c.identify(userId);
    // reset() clears super + person properties, and a newly identified
    // person needs the accent too — reapply after any identity change.
    if (action.reset || action.identify) applyAccentTheme(c);
  });
}

function applyAccentTheme(c: PostHog): void {
  if (!accentTheme) return;
  void c.register({ [ACCENT_THEME_PROPERTY]: accentTheme });
  c.setPersonProperties({ [ACCENT_THEME_PROPERTY]: accentTheme });
}

/**
 * Accent theme (avatar id) as a plain value — for avatar distribution. Set as
 * a super property (on every event) and a person property (per-user count).
 */
export function setAccentTheme(theme: string): void {
  accentTheme = theme;
  const c = client;
  if (!c) return;
  void c.ready().then(() => applyAccentTheme(c));
}

export function trackOnboardingCompleted(): void {
  client?.capture(ANALYTICS_EVENT.ONBOARDING_COMPLETED);
}

export function trackDailyDrawCompleted(): void {
  client?.capture(ANALYTICS_EVENT.DAILY_DRAW_COMPLETED);
}
