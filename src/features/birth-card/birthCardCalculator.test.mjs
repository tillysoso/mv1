/**
 * birthCardCalculator.test.mjs
 * Node built-in test runner — run with:
 *   node --test src/features/birth-card/
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { birthCardCalculator, MAJOR_ARCANA } from './birthCardCalculator.js';

// ─── MAJOR_ARCANA map ────────────────────────────────────────────────────────

describe('MAJOR_ARCANA', () => {
  it('has 22 named entries (0–21)', () => {
    assert.equal(Object.keys(MAJOR_ARCANA).length, 22);
  });

  it('entry 0 is The Fool', () => {
    assert.equal(MAJOR_ARCANA[0], 'The Fool');
  });

  it('entry 21 is The World', () => {
    assert.equal(MAJOR_ARCANA[21], 'The World');
  });
});

// ─── Documented example ──────────────────────────────────────────────────────

describe('birthCardCalculator — documented example', () => {
  // 25/12/1980 → digits "25121980" → 2+5+1+2+1+9+8+0 = 28 → 2+8 = 10
  // personality: 10 (Wheel of Fortune), soul: 1+0 = 1 (The Magician)
  it('25/12/1980 → Wheel of Fortune + The Magician', () => {
    const result = birthCardCalculator(25, 12, 1980);
    assert.deepEqual(result, {
      personalityCard: { number: 10, name: 'Wheel of Fortune' },
      soulCard:        { number: 1,  name: 'The Magician' },
      sameCard:        false,
    });
  });
});

// ─── Same-card cases (single-digit personality) ───────────────────────────────

describe('birthCardCalculator — same card (single-digit personality)', () => {
  // 01/01/2000 → "112000" → 1+1+2+0+0+0 = 4 → personality 4 → soul 4
  it('01/01/2000 → The Emperor (same card)', () => {
    const result = birthCardCalculator(1, 1, 2000);
    assert.equal(result.personalityCard.number, 4);
    assert.equal(result.personalityCard.name, 'The Emperor');
    assert.equal(result.soulCard.number, 4);
    assert.equal(result.sameCard, true);
  });

  // 01/01/2010 → "112010" → 1+1+2+0+1+0 = 5 → personality 5 → soul 5
  it('01/01/2010 → The Hierophant (same card)', () => {
    const result = birthCardCalculator(1, 1, 2010);
    assert.equal(result.personalityCard.number, 5);
    assert.equal(result.soulCard.number, 5);
    assert.equal(result.sameCard, true);
  });
});

// ─── The Fool (22 → 0) ───────────────────────────────────────────────────────

describe('birthCardCalculator — The Fool (sum collapses to 22)', () => {
  // 07/08/2014 → "782014" → 7+8+2+0+1+4 = 22 → personalityNumber = 0 (The Fool)
  // soul: 0 < 10 → soulNumber = 0, sameCard = true
  it('07/08/2014 → The Fool (same card)', () => {
    const result = birthCardCalculator(7, 8, 2014);
    assert.equal(result.personalityCard.number, 0);
    assert.equal(result.personalityCard.name, 'The Fool');
    assert.equal(result.soulCard.number, 0);
    assert.equal(result.soulCard.name, 'The Fool');
    assert.equal(result.sameCard, true);
  });
});

// ─── Two-digit personality → reduced soul ────────────────────────────────────

describe('birthCardCalculator — two-digit personality reduces to soul', () => {
  // 15/03/1998 → "1531998" → 1+5+3+1+9+9+8 = 36 → 3+6 = 9
  // personality 9 (The Hermit) — single digit → sameCard
  it('15/03/1998 → The Hermit (same card)', () => {
    const result = birthCardCalculator(15, 3, 1998);
    assert.equal(result.personalityCard.number, 9);
    assert.equal(result.personalityCard.name, 'The Hermit');
    assert.equal(result.soulCard.number, 9);
    assert.equal(result.sameCard, true);
  });

  // 14/07/1985 → "1471985" → 1+4+7+1+9+8+5 = 35 → 3+5 = 8
  // personality 8 (Strength) — single digit → sameCard
  it('14/07/1985 → Strength (same card)', () => {
    const result = birthCardCalculator(14, 7, 1985);
    assert.equal(result.personalityCard.number, 8);
    assert.equal(result.personalityCard.name, 'Strength');
    assert.equal(result.soulCard.number, 8);
    assert.equal(result.sameCard, true);
  });

  // 30/06/1991 → "3061991" → 3+0+6+1+9+9+1 = 29 → 2+9 = 11
  // personality 11 (Justice) → soul: 1+1 = 2 (The High Priestess)
  it('30/06/1991 → Justice + The High Priestess', () => {
    const result = birthCardCalculator(30, 6, 1991);
    assert.equal(result.personalityCard.number, 11);
    assert.equal(result.personalityCard.name, 'Justice');
    assert.equal(result.soulCard.number, 2);
    assert.equal(result.soulCard.name, 'The High Priestess');
    assert.equal(result.sameCard, false);
  });

  // 28/02/1995 → "2821995" → 2+8+2+1+9+9+5 = 36 → 3+6 = 9
  // personality 9 (The Hermit) — same card
  it('28/02/1995 → The Hermit (same card)', () => {
    const result = birthCardCalculator(28, 2, 1995);
    assert.equal(result.personalityCard.number, 9);
    assert.equal(result.soulCard.number, 9);
    assert.equal(result.sameCard, true);
  });
});

// ─── All 21 non-Fool personality numbers reachable ───────────────────────────

describe('birthCardCalculator — spot-checks across the arcana', () => {
  // personality 21 (The World) → soul: 2+1 = 3 (The Empress)
  // Need digit string summing to 21:
  // 03/09/1990 → "391990" → 3+9+1+9+9+0 = 31 → 3+1 = 4 (no)
  // 20/01/2000 → "2012000" → 2+0+1+2+0+0+0 = 5 (no)
  // 29/04/1961 → "2941961" → 2+9+4+1+9+6+1 = 32 → 3+2 = 5 (no)
  // 03/09/2019 → "392019" → 3+9+2+0+1+9 = 24 → 2+4 = 6 (no)
  // Let me find sum=21:
  // 12/09/1990 → "1291990" → 1+2+9+1+9+9+0 = 31 → 3+1 = 4 (no)
  // 12/12/1980 → "12121980" → 1+2+1+2+1+9+8+0 = 24 → 2+4 = 6 (no)
  // 19/04/1979 → "1941979" → 1+9+4+1+9+7+9 = 40 → 4+0 = 4 (no)
  // 03/09/2009 → "392009" → 3+9+2+0+0+9 = 23 → 2+3 = 5 (no)
  // For sum=21: 06/06/1990 → "661990" → 6+6+1+9+9+0 = 31 → 3+1 = 4 (no)
  // 09/03/1990 → "931990" → 9+3+1+9+9+0 = 31 → 3+1 = 4 (no)
  // direct sum=21: need digits to add to 21
  // day=9, month=3, year=1900: "931900" → 9+3+1+9+0+0 = 22 → The Fool
  // day=9, month=3, year=2001: "932001" → 9+3+2+0+0+1 = 15 → personality 15
  // day=9, month=4, year=2000: "942000" → 9+4+2+0+0+0 = 15 → personality 15
  // day=3, month=9, year=2019: "392019" → 3+9+2+0+1+9=24 → 2+4=6
  // day=3, month=9, year=2010: "392010" → 3+9+2+0+1+0=15 → personality 15
  // day=9, month=3, year=2010: "932010" → 9+3+2+0+1+0=15 → personality 15
  // day=6, month=6, year=2019: "662019" → 6+6+2+0+1+9=24 → 2+4=6
  // day=9, month=9, year=1993: "991993" → 9+9+1+9+9+3=40 → 4+0=4
  // day=9, month=9, year=2003: "992003" → 9+9+2+0+0+3=23 → 2+3=5
  // day=9, month=9, year=2012: "992012" → 9+9+2+0+1+2=23 → 2+3=5
  // day=9, month=9, year=2021: "992021" → 9+9+2+0+2+1=23 → 2+3=5
  // day=19, month=9, year=2012: "1992012" → 1+9+9+2+0+1+2=24 → 2+4=6
  // day=29, month=9, year=2003: "2992003" → 2+9+9+2+0+0+3=25 → 2+5=7
  // day=29, month=9, year=2012: "2992012" → 2+9+9+2+0+1+2=25 → 2+5=7
  // day=29, month=9, year=2021: "2992021" → 2+9+9+2+0+2+1=25 → 2+5=7
  // day=19, month=9, year=2003: "1992003" → 1+9+9+2+0+0+3=24 → 2+4=6
  // day=19, month=9, year=2021: "1992021" → 1+9+9+2+0+2+1=24 → 2+4=6
  // Let me try: need digits to sum exactly to 21 (sum=21 <= 22 so no reduction needed)
  // "9+9+3" = 21 but 3 needs to be split: need a date like day=9, month=9, year=9xxx but year must be 4 digits...
  // day=9, month=3, year=9000 → future, weird
  // Actually: sum of digits of "day month year" where result = 21
  // day=9, month=3, year=1800 → "931800" → 9+3+1+8+0+0=21 → personality=21 (The World), soul=2+1=3 (The Empress), sameCard=false ✓
  it('09/03/1800 → The World + The Empress', () => {
    const result = birthCardCalculator(9, 3, 1800);
    assert.equal(result.personalityCard.number, 21);
    assert.equal(result.personalityCard.name, 'The World');
    assert.equal(result.soulCard.number, 3);
    assert.equal(result.soulCard.name, 'The Empress');
    assert.equal(result.sameCard, false);
  });

  // personality 20 (Judgement) → soul: 2+0 = 2 (The High Priestess)
  // Need sum=20: day=2, month=9, year=1800 → "291800" → 2+9+1+8+0+0=20 ✓
  it('02/09/1800 → Judgement + The High Priestess', () => {
    const result = birthCardCalculator(2, 9, 1800);
    assert.equal(result.personalityCard.number, 20);
    assert.equal(result.personalityCard.name, 'Judgement');
    assert.equal(result.soulCard.number, 2);
    assert.equal(result.soulCard.name, 'The High Priestess');
    assert.equal(result.sameCard, false);
  });
});

// ─── Return shape ─────────────────────────────────────────────────────────────

describe('birthCardCalculator — return shape', () => {
  it('always returns personalityCard, soulCard, sameCard', () => {
    const result = birthCardCalculator(1, 1, 2000);
    assert.ok('personalityCard' in result);
    assert.ok('soulCard' in result);
    assert.ok('sameCard' in result);
    assert.ok('number' in result.personalityCard);
    assert.ok('name' in result.personalityCard);
    assert.ok('number' in result.soulCard);
    assert.ok('name' in result.soulCard);
    assert.equal(typeof result.sameCard, 'boolean');
  });

  it('sameCard is true iff personality and soul numbers match', () => {
    const a = birthCardCalculator(25, 12, 1980); // personality 10, soul 1 → false
    assert.equal(a.sameCard, a.personalityCard.number === a.soulCard.number);

    const b = birthCardCalculator(1, 1, 2000); // personality 4, soul 4 → true
    assert.equal(b.sameCard, b.personalityCard.number === b.soulCard.number);
  });
});
