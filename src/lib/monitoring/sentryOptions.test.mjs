/**
 * sentryOptions.test.mjs — Sentry init options (tracker #146)
 * Run with: node --test src/lib/monitoring/sentryOptions.test.mjs
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildSentryOptions, TRACES_SAMPLE_RATE } from './sentryOptions.js';

describe('buildSentryOptions — no-op without a DSN', () => {
  it('returns null for undefined DSN', () => {
    assert.equal(buildSentryOptions(undefined, false), null);
  });

  it('returns null for empty-string DSN (unset EXPO_PUBLIC_ var)', () => {
    assert.equal(buildSentryOptions('', false), null);
  });
});

describe('buildSentryOptions — with a DSN', () => {
  const dsn = 'https://public@o0.ingest.sentry.io/0';

  it('passes the DSN through', () => {
    assert.equal(buildSentryOptions(dsn, false).dsn, dsn);
  });

  it('never sends default PII', () => {
    assert.equal(buildSentryOptions(dsn, false).sendDefaultPii, false);
    assert.equal(buildSentryOptions(dsn, true).sendDefaultPii, false);
  });

  it('tags environment from the dev flag', () => {
    assert.equal(buildSentryOptions(dsn, true).environment, 'development');
    assert.equal(buildSentryOptions(dsn, false).environment, 'production');
  });

  it('uses the shared traces sample rate', () => {
    assert.equal(buildSentryOptions(dsn, false).tracesSampleRate, TRACES_SAMPLE_RATE);
  });
});
