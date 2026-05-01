import type { TarotCard, AuraContext } from '../../types';
import { AURA_CONTEXT, SUIT } from '../../constants';

// Breakthrough cards per card-data-placeholder.md
const BREAKTHROUGH_NAMES = new Set([
  'The Fool', 'The Star', 'The Sun', 'The World', 'Judgement', 'The Chariot',
]);

// Shadow cards per card-data-placeholder.md
const SHADOW_NAMES = new Set([
  'The Tower', 'The Devil', 'The Moon', 'The Hanged Man', 'Death',
]);

function auraFor(name: string): AuraContext {
  if (BREAKTHROUGH_NAMES.has(name)) return AURA_CONTEXT.BREAKTHROUGH;
  if (SHADOW_NAMES.has(name)) return AURA_CONTEXT.SHADOW;
  return AURA_CONTEXT.NEUTRAL;
}

function card(id: string, name: string, number: number): TarotCard {
  return { id, name, number, suit: SUIT.MAJOR, auraContext: auraFor(name) };
}

// imagePath omitted — TarotCard type does not carry it yet.
// When assets land, extend TarotCard with imagePath: string | null
// and add the path here per the convention in card-data-placeholder.md.

export const MAJOR_ARCANA_CARDS: TarotCard[] = [
  card('major-00', 'The Fool',        0),
  card('major-01', 'The Magician',    1),
  card('major-02', 'The High Priestess', 2),
  card('major-03', 'The Empress',     3),
  card('major-04', 'The Emperor',     4),
  card('major-05', 'The Hierophant',  5),
  card('major-06', 'The Lovers',      6),
  card('major-07', 'The Chariot',     7),
  card('major-08', 'Strength',        8),
  card('major-09', 'The Hermit',      9),
  card('major-10', 'Wheel of Fortune', 10),
  card('major-11', 'Justice',         11),
  card('major-12', 'The Hanged Man',  12),
  card('major-13', 'Death',           13),
  card('major-14', 'Temperance',      14),
  card('major-15', 'The Devil',       15),
  card('major-16', 'The Tower',       16),
  card('major-17', 'The Star',        17),
  card('major-18', 'The Moon',        18),
  card('major-19', 'The Sun',         19),
  card('major-20', 'Judgement',       20),
  card('major-21', 'The World',       21),
];
