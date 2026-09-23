/**
 * posthogConfig.test.mjs — PostHog config + web storage adapter (tracker #147)
 * Run with: node --test src/lib/analytics/posthogConfig.test.mjs
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ANALYTICS_EVENT,
  ACCENT_THEME_PROPERTY,
  buildPostHogConfig,
  createWebStorage,
} from './posthogConfig.js';

describe('buildPostHogConfig — no-op without a key', () => {
  it('returns null for undefined key', () => {
    assert.equal(buildPostHogConfig(undefined, 'https://eu.i.posthog.com'), null);
  });

  it('returns null for empty-string key (unset EXPO_PUBLIC_ var)', () => {
    assert.equal(buildPostHogConfig('', undefined), null);
  });
});

describe('buildPostHogConfig — with a key', () => {
  it('passes the key through', () => {
    assert.equal(buildPostHogConfig('phc_test', undefined).apiKey, 'phc_test');
  });

  it('sets host only when provided, so the SDK default applies otherwise', () => {
    assert.equal(buildPostHogConfig('phc_test', 'https://eu.i.posthog.com').options.host, 'https://eu.i.posthog.com');
    assert.equal('host' in buildPostHogConfig('phc_test', undefined).options, false);
    assert.equal('host' in buildPostHogConfig('phc_test', '').options, false);
  });

  it('leaves error capture to Sentry and session replay off', () => {
    const { options } = buildPostHogConfig('phc_test', undefined);
    assert.deepEqual(options.errorTracking, { autocapture: false });
    assert.equal(options.enableSessionReplay, false);
  });

  it('captures app lifecycle events (retention signal)', () => {
    assert.equal(buildPostHogConfig('phc_test', undefined).options.captureAppLifecycleEvents, true);
  });
});

describe('event names', () => {
  it('are stable snake_case strings', () => {
    assert.equal(ANALYTICS_EVENT.ONBOARDING_COMPLETED, 'onboarding_completed');
    assert.equal(ANALYTICS_EVENT.DAILY_DRAW_COMPLETED, 'daily_draw_completed');
    assert.equal(ACCENT_THEME_PROPERTY, 'accent_theme');
  });

  it('cannot be mutated at runtime', () => {
    assert.ok(Object.isFrozen(ANALYTICS_EVENT));
  });
});

describe('createWebStorage', () => {
  it('reads and writes through to the backing storage', () => {
    const map = new Map();
    const backing = { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
    const s = createWebStorage(backing);
    s.setItem('a', '1');
    assert.equal(s.getItem('a'), '1');
    assert.equal(s.getItem('missing'), null);
  });

  it('degrades to no persistence when storage is unavailable', () => {
    const s = createWebStorage(null);
    s.setItem('a', '1');
    assert.equal(s.getItem('a'), null);
  });

  it('swallows storage exceptions (private mode, blocked site data)', () => {
    const throwing = {
      getItem() { throw new Error('SecurityError'); },
      setItem() { throw new Error('QuotaExceededError'); },
    };
    const s = createWebStorage(throwing);
    assert.doesNotThrow(() => s.setItem('a', '1'));
    assert.equal(s.getItem('a'), null);
  });
});
