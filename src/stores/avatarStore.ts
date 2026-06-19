import { create } from 'zustand';
import type { AvatarId } from '../types';
import { DEFAULT_AVATAR_ID } from '../constants';

interface AvatarStore {
  activeAvatar: AvatarId;
  setAvatar: (id: AvatarId) => void;
  avatarModalOpen: boolean;
  openAvatarModal: () => void;
  closeAvatarModal: () => void;
}

export const useAvatarStore = create<AvatarStore>((set) => ({
  activeAvatar: DEFAULT_AVATAR_ID,
  setAvatar: (id) => set({ activeAvatar: id }),
  avatarModalOpen: false,
  openAvatarModal: () => set({ avatarModalOpen: true }),
  closeAvatarModal: () => set({ avatarModalOpen: false }),
}));
