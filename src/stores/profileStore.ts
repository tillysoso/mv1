import { create } from 'zustand';
import type { BirthCards, TarotCard, AvatarId } from '../types';

interface ProfileStore {
  name: string | null;
  birthCards: BirthCards | null;
  dateOfBirth: { day: number; month: number; year: number } | null;
  onboardingComplete: boolean;
  quizScores: Record<AvatarId, number>;
  quizTiebreaker: AvatarId | null;
  todaysCard: TarotCard | null;
  setName: (name: string) => void;
  setBirthCards: (cards: BirthCards) => void;
  setDateOfBirth: (dob: { day: number; month: number; year: number }) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setQuizScores: (scores: Record<AvatarId, number>, tiebreaker: AvatarId) => void;
  setTodaysCard: (card: TarotCard) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  name: null,
  birthCards: null,
  dateOfBirth: null,
  onboardingComplete: false,
  quizScores: { casper: 0, destiny: 0, eli: 0, olivia: 0 },
  quizTiebreaker: null,
  todaysCard: null,
  setName: (name) => set({ name }),
  setBirthCards: (cards) => set({ birthCards: cards }),
  setDateOfBirth: (dob) => set({ dateOfBirth: dob }),
  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  setQuizScores: (scores, tiebreaker) => set({ quizScores: scores, quizTiebreaker: tiebreaker }),
  setTodaysCard: (card) => set({ todaysCard: card }),
}));
