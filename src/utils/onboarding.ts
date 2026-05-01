import { useProfileStore } from '../stores/profileStore';

export function isOnboardingComplete(): boolean {
  return useProfileStore.getState().onboardingComplete;
}
