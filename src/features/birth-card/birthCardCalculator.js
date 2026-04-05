/**
 * Birth Card Calculator — Majestic Tarot App
 *
 * Uses numerology to derive two Major Arcana cards from a date of birth:
 *   - Personality Card: who you appear to be in the world
 *   - Soul Card:        your deeper inner nature
 */

// ─── Major Arcana Map ────────────────────────────────────────────────────────

const MAJOR_ARCANA = {
  0:  "The Fool",
  1:  "The Magician",
  2:  "The High Priestess",
  3:  "The Empress",
  4:  "The Emperor",
  5:  "The Hierophant",
  6:  "The Lovers",
  7:  "The Chariot",
  8:  "Strength",
  9:  "The Hermit",
  10: "Wheel of Fortune",
  11: "Justice",
  12: "The Hanged Man",
  13: "Death",
  14: "Temperance",
  15: "The Devil",
  16: "The Tower",
  17: "The Star",
  18: "The Moon",
  19: "The Sun",
  20: "Judgement",
  21: "The World",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Sum all decimal digits of a positive integer.
 * e.g. sumDigits(28) → 10, sumDigits(10) → 1
 */
function sumDigits(n) {
  return String(n)
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
}

/**
 * Return the name of a Major Arcana card by number.
 * Throws if the number is out of range.
 */
function arcanaName(n) {
  if (!(n in MAJOR_ARCANA)) {
    throw new RangeError(`No Major Arcana card for number: ${n}`);
  }
  return MAJOR_ARCANA[n];
}

// ─── Main Export ─────────────────────────────────────────────────────────────

/**
 * Calculate the Personality and Soul birth cards for a given date of birth.
 *
 * @param {number} day   - Day of birth (1–31)
 * @param {number} month - Month of birth (1–12)
 * @param {number} year  - Four-digit year of birth
 *
 * @returns {{
 *   personalityCard: { number: number, name: string },
 *   soulCard:        { number: number, name: string },
 *   sameCard:        boolean
 * }}
 *
 * @example
 *   birthCardCalculator(25, 12, 1980)
 *   // → {
 *   //     personalityCard: { number: 10, name: "Wheel of Fortune" },
 *   //     soulCard:        { number: 1,  name: "The Magician" },
 *   //     sameCard:        false
 *   //   }
 */
export function birthCardCalculator(day, month, year) {

  // ── Step 1: Sum every digit of the full date ──────────────────────────────
  //
  // Concatenate day, month, and year as strings, then add each character
  // as an integer. This treats each digit independently regardless of
  // whether day/month are one or two digits.
  //
  // e.g. day=25, month=12, year=1980 → "25121980" → 2+5+1+2+1+9+8+0 = 28

  const digitString = `${day}${month}${year}`;
  let sum = digitString.split("").reduce((acc, d) => acc + Number(d), 0);

  // ── Step 2: Reduce to the range 1–22 ─────────────────────────────────────
  //
  // If the running total is above 22, collapse it by summing its own digits.
  // 22 is a legal stopping point (it maps to The Fool); anything ≤ 21 is a
  // direct Major Arcana number. Repeat until the value is in range.
  //
  // In practice, the digit sum of any real date never exceeds ~43, so this
  // loop runs at most once — but we write it as a loop for safety.

  while (sum > 22) {
    sum = sumDigits(sum);
  }

  // ── Step 3: Resolve Personality Card number ───────────────────────────────
  //
  // 22 is the only special case: it represents The Fool (card 0).
  // Every other value (1–21) maps directly to its Major Arcana card.

  const personalityNumber = sum === 22 ? 0 : sum;

  // ── Step 4: Resolve Soul Card number ─────────────────────────────────────
  //
  // For two-digit Personality Cards (10–21): add those two digits once.
  // For single-digit Personality Cards (0–9): the Soul Card is the same card.
  //
  // Note: The Fool (0) is treated as single-digit for this purpose.
  //   e.g. personality=12 → 1+2=3 (The Empress)
  //        personality=7  → soul=7 (The Chariot, same card)
  //        personality=0  → soul=0 (The Fool, same card)

  const soulNumber =
    personalityNumber >= 10 ? sumDigits(personalityNumber) : personalityNumber;

  // ── Step 5: Same-card flag ────────────────────────────────────────────────
  //
  // When the Personality and Soul numbers are identical, the two aspects
  // of the self are unified — the user "carries their nature" without
  // the duality that most people experience between outer and inner self.

  const sameCard = personalityNumber === soulNumber;

  // ── Return ────────────────────────────────────────────────────────────────

  return {
    personalityCard: {
      number: personalityNumber,
      name:   arcanaName(personalityNumber),
    },
    soulCard: {
      number: soulNumber,
      name:   arcanaName(soulNumber),
    },
    sameCard,
  };
}

export { MAJOR_ARCANA };
