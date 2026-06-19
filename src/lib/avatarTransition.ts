import { makeMutable, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { AccessibilityInfo } from 'react-native';
import type { AvatarId } from '../types';
import { useAvatarStore } from '../stores/avatarStore';

// ─── Reduced motion ────────────────────────────────────────────────────────
// Cached at module load and refreshed on change. Particle/shimmer effects
// check this; accent colour and border states are never gated by it.

export const reducedMotionEnabled = makeMutable(false);

AccessibilityInfo.isReduceMotionEnabled?.().then((enabled) => {
  reducedMotionEnabled.value = enabled;
});
AccessibilityInfo.addEventListener?.('reduceMotionChanged', (enabled: boolean) => {
  reducedMotionEnabled.value = enabled;
});

// ─── Global transition shared values ───────────────────────────────────────
// Created outside React (Reanimated `makeMutable`) so every accent-bearing
// surface in the app — nav, cards, emblem, aura — can read the same values
// without prop-drilling. 1 = full accent presence, 0 = drained to world neutral.

export const accentIntensity = makeMutable(1);
// Fades in the new avatar's portal during Phase 4 (fires at 1200ms).
export const portalArrivalOpacity = makeMutable(1);

// Stub for #106 — particle system isn't built yet. Wired up here so the
// transition timeline already calls it at the right moments.
export function triggerParticleSwap(avatarId: AvatarId, stage: 'dissolve' | 'begin' | 'fullMotion') {
  // no-op — particle rendering lands in #106
}

let transitioning = false;

export function isAvatarTransitioning() {
  return transitioning;
}

/**
 * Runs the 1500ms avatar switch sequence (Majestic — Task #131, section 05).
 * Phase 1 (0-400ms): current accent fades to neutral.
 * Phase 2 (400-700ms): held at world neutral — activeAvatar swaps here, invisibly.
 * Phase 3 (700-1500ms): new accent blooms in; particle stages stub-fire alongside.
 * Phase 4 (fires at 1200ms): new avatar portal fades in, completing by 1500ms.
 */
export function runAvatarSwitchTransition(nextAvatar: AvatarId) {
  const { activeAvatar, setAvatar } = useAvatarStore.getState();
  if (activeAvatar === nextAvatar || transitioning) return;
  transitioning = true;

  const reduced = reducedMotionEnabled.value;

  // Phase 1 — fade out (0-400ms, ease-out)
  accentIntensity.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) }, () => {
    triggerParticleSwap(activeAvatar, 'dissolve');
  });

  // Phase 2 — neutral beat (400-700ms): swap the underlying avatar identity
  // while no accent is visible, so the bloom in Phase 3 reveals the new colour.
  setTimeout(() => {
    setAvatar(nextAvatar);
  }, 400);

  // Phase 3 — bloom (700-1500ms, ease-in-out)
  setTimeout(() => {
    accentIntensity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });
    if (!reduced) {
      setTimeout(() => triggerParticleSwap(nextAvatar, 'begin'), 150); // 850ms
      setTimeout(() => triggerParticleSwap(nextAvatar, 'fullMotion'), 350); // 1050ms
    }
  }, 700);

  // Phase 4 — avatar arrival (fires at 1200ms, completes by 1500ms)
  portalArrivalOpacity.value = 0;
  portalArrivalOpacity.value = withDelay(1200, withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) }));

  setTimeout(() => {
    transitioning = false;
  }, 1500);
}
