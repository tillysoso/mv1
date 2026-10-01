import * as Sentry from '@sentry/react-native';
import type { ComponentType } from 'react';
import { buildSentryOptions } from './sentryOptions';

const options = buildSentryOptions(process.env.EXPO_PUBLIC_SENTRY_DSN, __DEV__);

// False when EXPO_PUBLIC_SENTRY_DSN isn't set — every export below no-ops.
export const isMonitoringConfigured = options !== null;

/** Call once, at module scope in app/_layout.tsx, before any rendering. */
export function initMonitoring(): void {
  if (!options) return;
  Sentry.init(options);
}

/** Report a caught error. Safe to call whether or not Sentry is configured. */
export function captureError(error: unknown, context?: Record<string, unknown>): void {
  if (!options) return;
  Sentry.captureException(error, context ? { extra: context } : undefined);
}

/** Wraps the root component so Sentry can capture native + JS crashes. */
export function wrapRoot<P extends Record<string, unknown>>(
  component: ComponentType<P>,
): ComponentType<P> {
  if (!options) return component;
  return Sentry.wrap(component);
}
