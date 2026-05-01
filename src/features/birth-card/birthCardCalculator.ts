// @ts-ignore — TS resolves .js to same-named .ts; Metro/Bun handle the real .js at runtime
import { birthCardCalculator as _calculate } from './birthCardCalculator.js';
import type { BirthCards } from '../../types/tarot';

export function birthCardCalculator(
  day: number,
  month: number,
  year: number
): BirthCards {
  return _calculate(day, month, year);
}
