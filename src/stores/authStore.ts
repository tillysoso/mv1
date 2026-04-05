import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { onAuthStateChange } from '../lib/supabase/auth';

interface AuthStore {
  user: User | null;
  initialised: boolean;
  setUser: (user: User | null) => void;
  setInitialised: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  initialised: false,
  setUser: (user) => set({ user }),
  setInitialised: () => set({ initialised: true }),
}));

// Initialise auth listener
export function initAuthListener() {
  const { setUser, setInitialised } = useAuthStore.getState();
  const { data: { subscription } } = onAuthStateChange((user) => {
    setUser(user);
    setInitialised();
  });
  return () => subscription.unsubscribe();
}
