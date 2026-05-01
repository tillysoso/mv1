// @ts-ignore — TS resolves .js to same-named .ts; Metro/Bun handle the real .js at runtime
import { birthCardCalculator as _calculate, MAJOR_ARCANA } from './birthCardCalculator.js';
import type { BirthCards } from '../../types';

export function birthCardCalculator(
  day: number,
  month: number,
  year: number
): BirthCards {
  return _calculate(day, month, year);
}

export { MAJOR_ARCANA };
