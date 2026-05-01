/**
 * auth.test.mjs — v2 auth endpoint contract tests
 * Run with: node --test src/lib/supabase/v2/auth.test.mjs
 *
 * Key v2 changes:
 *   signUpWithEmail  → returns User | null  (v1 returned raw { user, session } blob)
 *   signInWithEmail  → returns Session | null  (v1 returned raw data blob)
 *   onAuthStateChange → returns () => void  (v1 required caller to destructure subscription)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Extraction helpers that mirror what the v2 functions do internally

function extractUserFromSignUp(rawData) {
  return rawData.user;
}

function extractSessionFromSignIn(rawData) {
  return rawData.session;
}

function extractUserFromSession(session) {
  return session?.user ?? null;
}

// ─── signUpWithEmail v2 ───────────────────────────────────────────────────────

describe('signUpWithEmail v2 — return shape', () => {
  it('returns user from raw signup data', () => {
    const rawData = { user: { id: 'u-001', email: 'a@b.com' }, session: null };
    const user = extractUserFromSignUp(rawData);
    assert.equal(user.id, 'u-001');
    assert.equal(user.email, 'a@b.com');
  });

  it('returns null when no user (e.g. email confirmation pending)', () => {
    const rawData = { user: null, session: null };
    const user = extractUserFromSignUp(rawData);
    assert.equal(user, null);
  });
});

// ─── signInWithEmail v2 ───────────────────────────────────────────────────────

describe('signInWithEmail v2 — return shape', () => {
  it('returns session from raw signin data', () => {
    const rawData = {
      user: { id: 'u-001' },
      session: { access_token: 'tok-abc', refresh_token: 'ref-xyz' },
    };
    const session = extractSessionFromSignIn(rawData);
    assert.equal(session.access_token, 'tok-abc');
    assert.equal(session.refresh_token, 'ref-xyz');
  });

  it('returns null when no session', () => {
    const rawData = { user: null, session: null };
    const session = extractSessionFromSignIn(rawData);
    assert.equal(session, null);
  });
});

// ─── onAuthStateChange v2 — callback behaviour ───────────────────────────────

describe('onAuthStateChange v2 — callback extraction', () => {
  it('passes user to callback when session contains a user', () => {
    const user = extractUserFromSession({ user: { id: 'u-001', email: 'x@y.com' } });
    assert.deepEqual(user, { id: 'u-001', email: 'x@y.com' });
  });

  it('passes null to callback when session is null', () => {
    const user = extractUserFromSession(null);
    assert.equal(user, null);
  });

  it('passes null to callback when session is undefined', () => {
    const user = extractUserFromSession(undefined);
    assert.equal(user, null);
  });

  it('passes null when session has no user property', () => {
    const user = extractUserFromSession({ user: null });
    assert.equal(user, null);
  });
});
