import { create } from 'zustand';
import type { BirthCards, TarotCard, AvatarId } from '../types';

interface ProfileStore {
  name: string | null;
  birthCards: BirthCards | null;
  dateOfBirth: { day: number; month: number; year: number } | null;
  onboardingComplete: boolean;
  quizScores: Record<string, number>;
  todaysCard: TarotCard | null;
  setName: (name: string) => void;
  setBirthCards: (cards: BirthCards) => void;
  setDateOfBirth: (dob: { day: number; month: number; year: number }) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setQuizScores: (scores: Record<string, number>) => void;
  setTodaysCard: (card: TarotCard) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  name: null,
  birthCards: null,
  dateOfBirth: null,
  onboardingComplete: false,
  quizScores: {},
  todaysCard: null,
  setName: (name) => set({ name }),
  setBirthCards: (cards) => set({ birthCards: cards }),
  setDateOfBirth: (dob) => set({ dateOfBirth: dob }),
  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  setQuizScores: (scores) => set({ quizScores: scores }),
  setTodaysCard: (card) => set({ todaysCard: card }),
}));
