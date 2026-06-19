// Elemental correspondence for the 22 Major Arcana, following the standard
// Golden Dawn astrological attributions (planet/zodiac sign -> element).
// Used to tint the world toward the user's personality card on Screen 04.
export type CardElement = 'fire' | 'water' | 'earth' | 'air';

const MAJOR_ARCANA_ELEMENT: Record<number, CardElement> = {
  0: 'air', // The Fool — Air
  1: 'air', // The Magician — Mercury
  2: 'water', // The High Priestess — Moon
  3: 'earth', // The Empress — Venus
  4: 'fire', // The Emperor — Aries
  5: 'earth', // The Hierophant — Taurus
  6: 'air', // The Lovers — Gemini
  7: 'water', // The Chariot — Cancer
  8: 'fire', // Strength — Leo
  9: 'earth', // The Hermit — Virgo
  10: 'fire', // Wheel of Fortune — Jupiter
  11: 'air', // Justice — Libra
  12: 'water', // The Hanged Man
  13: 'water', // Death — Scorpio
  14: 'fire', // Temperance — Sagittarius
  15: 'earth', // The Devil — Capricorn
  16: 'fire', // The Tower — Mars
  17: 'air', // The Star — Aquarius
  18: 'water', // The Moon — Pisces
  19: 'fire', // The Sun
  20: 'fire', // Judgement
  21: 'earth', // The World — Saturn
};

export function cardElement(cardNumber: number): CardElement {
  return MAJOR_ARCANA_ELEMENT[cardNumber] ?? 'air';
}
