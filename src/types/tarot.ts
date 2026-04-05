export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export type AuraContext = 'neutral' | 'breakthrough' | 'shadow' | 'recognition';

export interface TarotCard {
  id: string;
  name: string;
  number: number;
  suit: Suit;
  auraContext: AuraContext;
}

export interface BirthCards {
  personalityCard: { number: number; name: string };
  soulCard: { number: number; name: string };
  sameCard: boolean;
}
