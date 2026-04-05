import { create } from 'zustand';
import type { AvatarId } from '../types/avatar';

interface AvatarStore {
  activeAvatar: AvatarId;
  setAvatar: (id: AvatarId) => void;
}

export const useAvatarStore = create<AvatarStore>((set) => ({
  activeAvatar: 'casper',
  setAvatar: (id) => set({ activeAvatar: id }),
}));
