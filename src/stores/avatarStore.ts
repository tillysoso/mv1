import { create } from 'zustand';
import type { AvatarId, AvatarState, AuraContext } from '../types';
import { DEFAULT_AVATAR_ID, AVATAR_STATE, AURA_CONTEXT } from '../constants';

// Portal edge / particle response to the active aura state — spec 03.6.
const AURA_PORTAL_RESPONSE: Record<AuraContext, { accentIntensity: number; particleDensity: number }> = {
  [AURA_CONTEXT.BREAKTHROUGH]: { accentIntensity: 1.0, particleDensity: 0.6 },
  [AURA_CONTEXT.SHADOW]:       { accentIntensity: 0.6, particleDensity: 0.3 },
  [AURA_CONTEXT.NEUTRAL]:      { accentIntensity: 0.8, particleDensity: 0.4 },
  [AURA_CONTEXT.RECOGNITION]:  { accentIntensity: 1.0, particleDensity: 0.6 },
};

const STANDARD_HOLD_MS = 1500;
const RECOGNITION_HOLD_MS = 3000;

interface AvatarStore {
  activeAvatar: AvatarId;
  avatarState: AvatarState;
  auraContext: AuraContext | null;
  portalAccentIntensity: number;
  particleDensity: number;
  setAvatar: (id: AvatarId) => void;
  /**
   * Drives the avatar's reaction to a resolved card. Avatar must not react
   * before the card face is revealed (03.6) — call only once the flip's
   * Phase 2 has resolved the face, never on draw/anticipation.
   */
  setAuraState: (context: AuraContext) => void;
}

let holdTimer: ReturnType<typeof setTimeout> | null = null;

export const useAvatarStore = create<AvatarStore>((set) => ({
  activeAvatar: DEFAULT_AVATAR_ID,
  avatarState: AVATAR_STATE.NEUTRAL,
  auraContext: null,
  portalAccentIntensity: 0.8,
  particleDensity: 0.4,
  setAvatar: (id) => set({ activeAvatar: id }),
  setAuraState: (context) => {
    if (holdTimer) clearTimeout(holdTimer);

    const response = AURA_PORTAL_RESPONSE[context];
    set({
      avatarState: AVATAR_STATE.ACTIVE,
      auraContext: context,
      portalAccentIntensity: response.accentIntensity,
      particleDensity: response.particleDensity,
    });

    const holdDuration = context === AURA_CONTEXT.RECOGNITION ? RECOGNITION_HOLD_MS : STANDARD_HOLD_MS;
    holdTimer = setTimeout(() => {
      set({
        avatarState: AVATAR_STATE.NEUTRAL,
        portalAccentIntensity: 0.8,
        particleDensity: 0.4,
      });
    }, holdDuration);
  },
}));
