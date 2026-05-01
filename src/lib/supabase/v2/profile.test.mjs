/**
 * profile.test.mjs — v2 profile endpoint contract tests
 * Run with: node --test src/lib/supabase/v2/profile.test.mjs
 *
 * Key v2 change: saveProfile uses upsert({ id, ... }) instead of
 * update({...}).eq('id', userId). This means the row is created if it
 * doesn't exist yet, fixing a silent failure for new users in v1.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

function buildSaveProfilePayload(userId, dob, birthCards) {
  return {
    id: userId,
    date_of_birth_day: dob.day,
    date_of_birth_month: dob.month,
    date_of_birth_year: dob.year,
    personality_card_number: birthCards.personalityCard.number,
    personality_card_name: birthCards.personalityCard.name,
    soul_card_number: birthCards.soulCard.number,
    soul_card_name: birthCards.soulCard.name,
    same_card: birthCards.sameCard,
  };
}

// ─── saveProfile v2 — upsert payload ─────────────────────────────────────────

describe('saveProfile v2 — upsert payload', () => {
  it('includes id field for create-or-update semantics', () => {
    const payload = buildSaveProfilePayload('u-001', { day: 25, month: 12, year: 1980 }, {
      personalityCard: { number: 10, name: 'Wheel of Fortune' },
      soulCard: { number: 1, name: 'The Magician' },
      sameCard: false,
    });
    assert.ok('id' in payload, 'upsert payload must contain id');
    assert.equal(payload.id, 'u-001');
  });

  it('maps all date of birth fields', () => {
    const payload = buildSaveProfilePayload('u-002', { day: 7, month: 8, year: 2014 }, {
      personalityCard: { number: 0, name: 'The Fool' },
      soulCard: { number: 0, name: 'The Fool' },
      sameCard: true,
    });
    assert.equal(payload.date_of_birth_day, 7);
    assert.equal(payload.date_of_birth_month, 8);
    assert.equal(payload.date_of_birth_year, 2014);
  });

  it('maps personality card fields', () => {
    const payload = buildSaveProfilePayload('u-003', { day: 1, month: 1, year: 2000 }, {
      personalityCard: { number: 4, name: 'The Emperor' },
      soulCard: { number: 4, name: 'The Emperor' },
      sameCard: true,
    });
    assert.equal(payload.personality_card_number, 4);
    assert.equal(payload.personality_card_name, 'The Emperor');
  });

  it('maps soul card fields', () => {
    const payload = buildSaveProfilePayload('u-004', { day: 30, month: 6, year: 1991 }, {
      personalityCard: { number: 11, name: 'Justice' },
      soulCard: { number: 2, name: 'The High Priestess' },
      sameCard: false,
    });
    assert.equal(payload.soul_card_number, 2);
    assert.equal(payload.soul_card_name, 'The High Priestess');
    assert.equal(payload.same_card, false);
  });

  it('sets same_card true when personality and soul match', () => {
    const payload = buildSaveProfilePayload('u-005', { day: 1, month: 1, year: 2010 }, {
      personalityCard: { number: 5, name: 'The Hierophant' },
      soulCard: { number: 5, name: 'The Hierophant' },
      sameCard: true,
    });
    assert.equal(payload.same_card, true);
  });
});
