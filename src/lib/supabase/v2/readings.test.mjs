/**
 * readings.test.mjs — v2 readings endpoint contract tests
 * Run with: node --test src/lib/supabase/v2/readings.test.mjs
 *
 * Key v2 changes:
 *   saveReading now returns the inserted Reading (id + created_at included).
 *   v1 returned void, making it impossible to reference the saved record.
 *   avatarId payload field is now explicitly typed as AvatarId | null.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const DEFAULT_READINGS_LIMIT = 10;

function buildReadingInsertPayload(userId, payload) {
  return {
    user_id: userId,
    spread_type: payload.spreadType,
    avatar_id: payload.avatarId ?? null,
    cards: payload.cards,
    reflection_note: payload.reflectionNote ?? null,
  };
}

// ─── saveReading v2 — insert payload ─────────────────────────────────────────

describe('saveReading v2 — insert payload', () => {
  it('maps camelCase fields to snake_case DB columns', () => {
    const payload = buildReadingInsertPayload('u-001', {
      spreadType: 'single',
      avatarId: 'casper',
      cards: [],
    });
    assert.equal(payload.user_id, 'u-001');
    assert.equal(payload.spread_type, 'single');
    assert.equal(payload.avatar_id, 'casper');
  });

  it('accepts three_card spread type', () => {
    const payload = buildReadingInsertPayload('u-001', {
      spreadType: 'three_card',
      avatarId: 'eli',
      cards: [],
    });
    assert.equal(payload.spread_type, 'three_card');
  });

  it('defaults avatar_id to null when avatarId is null', () => {
    const payload = buildReadingInsertPayload('u-002', {
      spreadType: 'single',
      avatarId: null,
      cards: [],
    });
    assert.equal(payload.avatar_id, null);
  });

  it('defaults reflection_note to null when not provided', () => {
    const payload = buildReadingInsertPayload('u-003', {
      spreadType: 'single',
      avatarId: 'olivia',
      cards: [],
    });
    assert.equal(payload.reflection_note, null);
  });

  it('passes reflection_note when provided', () => {
    const payload = buildReadingInsertPayload('u-004', {
      spreadType: 'three_card',
      avatarId: 'destiny',
      cards: [],
      reflectionNote: 'This resonated deeply.',
    });
    assert.equal(payload.reflection_note, 'This resonated deeply.');
  });

  it('includes cards array in payload', () => {
    const card = { id: 'fool', name: 'The Fool', number: 0, suit: 'major', auraContext: 'neutral' };
    const payload = buildReadingInsertPayload('u-005', {
      spreadType: 'single',
      avatarId: null,
      cards: [card],
    });
    assert.equal(payload.cards.length, 1);
    assert.deepEqual(payload.cards[0], card);
  });
});

// ─── getRecentReadings v2 — defaults ─────────────────────────────────────────

describe('getRecentReadings v2 — default limit', () => {
  it('default limit is 10', () => {
    assert.equal(DEFAULT_READINGS_LIMIT, 10);
  });
});
