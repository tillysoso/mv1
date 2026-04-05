import { useProfileStore } from '../stores/profileStore';

export function isOnboardingComplete(): boolean {
  const { birthCards, dateOfBirth } = useProfileStore.getState();
  return birthCards !== null && dateOfBirth !== null;
}
