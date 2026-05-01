export type CardSuit = 'wands' | 'cups' | 'swords' | 'pentacles' | 'major';

export type AuraContext = 'neutral' | 'breakthrough' | 'shadow' | 'recognition';

export type ReadingType = 'daily' | 'one-card' | 'three-card';

export interface TarotCard {
  id: string;
  name: string;
  number: number;
  suit: CardSuit;
  auraContext: AuraContext;
}

export interface BirthCard {
  id: string;
  name: string;
  arcana: 'major';
}

export interface BirthCards {
  personalityCard: { number: number; name: string };
  soulCard: { number: number; name: string };
  sameCard: boolean;
}

export interface MajesticProfile {
  personalityCard: BirthCard;
  soulCard: BirthCard;
}
