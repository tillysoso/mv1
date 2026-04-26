import '../global.css';

import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore, initAuthListener } from '../src/stores/authStore';
import { useProfileStore } from '../src/stores/profileStore';
import { isSupabaseConfigured } from '../src/lib/supabase/client';

function useAuthRouting() {
  const router = useRouter();
  const segments = useSegments();
  const { user, initialised } = useAuthStore();
  const { birthCards } = useProfileStore();

  useEffect(() => {
    // Prototype mode: no Supabase configured — go straight to the tabs
    if (!isSupabaseConfigured) {
      if (segments[0] !== '(tabs)') {
        router.replace('/(tabs)');
      }
      return;
    }

    if (!initialised) return;

    const inOnboarding = segments[0] === '(onboarding)';
    const inTabs = segments[0] === '(tabs)';

    if (!user) {
      if (!inOnboarding) {
        router.replace('/(onboarding)');
      }
    } else if (!birthCards) {
      if (!inOnboarding) {
        router.replace('/(onboarding)/profile');
      }
    } else {
      if (!inTabs) {
        router.replace('/(tabs)');
      }
    }
  }, [user, initialised, birthCards, segments]);
}

export default function RootLayout() {
  const { initialised } = useAuthStore();

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    return initAuthListener();
  }, []);

  useAuthRouting();

  // In prototype mode skip the loading gate entirely
  if (!isSupabaseConfigured) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  if (!initialised) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0D14', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#9500FF" size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
