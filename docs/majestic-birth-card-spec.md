# Majestic — Birth Card Calculator: Technical Specification

 **Auth note:** The authentication prompt fires at this screen — after the avatar's first words and a 1-second hold. A bottom sheet appears with Apple Sign In and Google Sign In only. No email/password. Copy: "Your companion is set. Let's make sure the world remembers you." Full timing, copy, fallback logic, and dev implementation in `majestic-auth-monetisation-spec.md`.


## Overview

The Birth Card system derives two personalised tarot cards from a user's date of birth using numerology. Both cards come from the **Major Arcana** (cards 0–21). The cards are:

| Card | What it represents |
|---|---|
| **Personality Card** | The face you show the world; your outer nature |
| **Soul Card** | Your deeper inner nature; the hidden self |

---

## The Major Arcana Mapping

| Number | Card Name |
|---|---|
| 0 | The Fool |
| 1 | The Magician |
| 2 | The High Priestess |
| 3 | The Empress |
| 4 | The Emperor |
| 5 | The Hierophant |
| 6 | The Lovers |
| 7 | The Chariot |
| 8 | Strength |
| 9 | The Hermit |
| 10 | Wheel of Fortune |
| 11 | Justice |
| 12 | The Hanged Man |
| 13 | Death |
| 14 | Temperance |
| 15 | The Devil |
| 16 | The Tower |
| 17 | The Star |
| 18 | The Moon |
| 19 | The Sun |
| 20 | Judgement |
| 21 | The World |

---

## Calculation: Personality Card

### Step 1 — Extract all digits from the date of birth

Take the full date as three integers: **day**, **month**, and **four-digit year**. Write each value as a decimal string and treat every character as an individual digit.

```
Date: 25 December 1980
→ "25" + "12" + "1980"
→ digits: 2, 5, 1, 2, 1, 9, 8, 0
```

> **Implementation note:** Do not zero-pad single-digit days or months. Day 9 contributes the single digit `9`, not `0` and `9`. This is handled naturally when each integer is converted directly to its string representation.

### Step 2 — Sum all digits

Add every digit together into a single total.

```
2 + 5 + 1 + 2 + 1 + 9 + 8 + 0 = 28
```

### Step 3 — Reduce to the range 1–22

If the running total is **greater than 22**, sum its own digits and repeat. Continue until the value falls in the range **1–22** (inclusive).

```
28 → 2 + 8 = 10  ✓ (in range)
```

```
47 → 4 + 7 = 11  ✓ (in range)
```

The stopping range is **1 to 22**, not 1 to 21. The number 22 is a valid intermediate value with its own special meaning (see below).

### Step 4 — Map to a card number

| Reduced value | Personality Card number |
|---|---|
| 1–21 | That number directly |
| **22** | **0 (The Fool)** |

The number 22 is a "master number" in this system. Rather than reducing to 4 (2+2), it is held as-is and assigned to The Fool, which is card 0. This is the only card reached via the number 22.

---

## Calculation: Soul Card

### Step 1 — Check the Personality Card number

| Personality number | Action |
|---|---|
| 0–9 | Soul Card = same card |
| 10–21 | Sum the two digits once |

### Step 2 — Sum once (for two-digit cards only)

```
Personality = 10 → 1 + 0 = 1   → The Magician
Personality = 11 → 1 + 1 = 2   → The High Priestess
Personality = 12 → 1 + 2 = 3   → The Empress
Personality = 13 → 1 + 3 = 4   → The Emperor
Personality = 14 → 1 + 4 = 5   → The Hierophant
Personality = 15 → 1 + 5 = 6   → The Lovers
Personality = 16 → 1 + 6 = 7   → The Chariot
Personality = 17 → 1 + 7 = 8   → Strength
Personality = 18 → 1 + 8 = 9   → The Hermit
Personality = 19 → 1 + 9 = 10  → Wheel of Fortune
Personality = 20 → 2 + 0 = 2   → The High Priestess
Personality = 21 → 2 + 1 = 3   → The Empress
```

> **Note on Personality 19 (The Sun):** The single digit reduction of 19 yields 10 (Wheel of Fortune), which is still a two-digit Major Arcana card. Per this spec, Soul Card calculation applies exactly **one** digit reduction. The Soul Card for The Sun is therefore Wheel of Fortune (10), not The Magician (1). Some alternative tarot traditions continue reducing to 1; Majestic does not.

### The Soul Card is always a valid Major Arcana number (0–21)

Because Personality numbers are bounded to 0–21, and the maximum digit sum of any two-digit number ≤ 21 is `1+9 = 10`, the Soul Card number will always be in range.

---

## The Same Card Condition

When the Personality Card number **equals** the Soul Card number, the user is said to "carry their nature" — there is no duality between their outer presentation and inner self.

This occurs whenever the Personality Card is a **single-digit** (0–9), because the soul reduction produces the same value. The Fool (0) is included in this group.

```
Personality = 7 (The Chariot) → Soul = 7 (The Chariot) → sameCard = true
Personality = 0 (The Fool)    → Soul = 0 (The Fool)    → sameCard = true
Personality = 11 (Justice)    → Soul = 2 (High Priestess) → sameCard = false
```

The UI should surface this condition distinctly — it is considered a significant numerological trait.

---

## Natural Personality / Soul Pairings

Every Personality Card 10–21 has a fixed Soul Card. These are the permanent pairs in the Majestic system:

| Personality | Soul |
|---|---|
| Wheel of Fortune (10) | The Magician (1) |
| Justice (11) | The High Priestess (2) |
| The Hanged Man (12) | The Empress (3) |
| Death (13) | The Emperor (4) |
| Temperance (14) | The Hierophant (5) |
| The Devil (15) | The Lovers (6) |
| The Tower (16) | The Chariot (7) |
| The Star (17) | Strength (8) |
| The Moon (18) | The Hermit (9) |
| The Sun (19) | Wheel of Fortune (10) |
| Judgement (20) | The High Priestess (2) |
| The World (21) | The Empress (3) |

---

## Edge Cases

### The Fool via 22

Dates whose digits sum to exactly 22 (or reduce to 22 through successive digit-summing) yield The Fool as both Personality and Soul Card.

```
1 January 1991 → 1+1+1+9+9+1 = 22 → The Fool (0) / The Fool (0), sameCard = true
```

### Digit sum already in range

If the initial digit sum falls between 1 and 22, no reduction step is needed. The value is used directly.

```
1 January 2000 → 1+1+2+0+0+0 = 4 → The Emperor (4), sameCard = true
```

### Digit sum requires multiple reductions

In theory (and for extreme future years), the initial sum could reduce to a value that is still > 22 after one pass. The while-loop in the implementation handles this correctly.

```
29 September 9999 → "2999999" → 2+9+9+9+9+9+9 = 56 → 5+6 = 11 → Justice
```

### Single-digit vs two-digit months and days

Month 9 contributes one digit (`9`), not two (`0`, `9`). Month 12 contributes two digits (`1`, `2`). The calculation uses the raw integer converted to a string — no zero-padding.

---

## Function Signature

```js
birthCardCalculator(day: number, month: number, year: number)
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `day` | `number` | Day of birth (1–31) |
| `month` | `number` | Month of birth (1–12) |
| `year` | `number` | Four-digit year of birth |

### Return value

```ts
{
  personalityCard: {
    number: number,   // 0–21
    name:   string,   // e.g. "The Chariot"
  },
  soulCard: {
    number: number,   // 0–21
    name:   string,
  },
  sameCard: boolean,  // true when personality and soul are the same card
}
```

---

## Worked Examples

### Example 1 — Two-step reduction, different cards

**Date:** 25 December 1980

```
Digits: 2+5+1+2+1+9+8+0 = 28
Reduce: 2+8 = 10 → Wheel of Fortune
Soul:   1+0 = 1  → The Magician
sameCard: false
```

### Example 2 — No reduction needed, same card

**Date:** 1 January 2000

```
Digits: 1+1+2+0+0+0 = 4 → The Emperor
Soul:   4 (single-digit, no reduction)
sameCard: true
```

### Example 3 — The Fool via 22

**Date:** 1 January 1991

```
Digits: 1+1+1+9+9+1 = 22 → The Fool (0)
Soul:   0 (single-digit, no reduction)
sameCard: true
```

### Example 4 — High Personality number

**Date:** 29 September 1989

```
Digits: 2+9+9+1+9+8+9 = 47
Reduce: 4+7 = 11 → Justice
Soul:   1+1 = 2  → The High Priestess
sameCard: false
```

--- 

## File Reference

| File | Purpose |
|---|---|
| `birthCardCalculator.js` | Core calculator function and Major Arcana map (ES module, `export`) |
| `birthCardCalculator.test.js` | 18 test cases across edge cases, pairings, and same-card conditions (bun:test) |
| `majestic-birth-card-spec.md` | This document |

Run tests: `bun test`
