import '../global.css';

import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments, usePathname } from 'expo-router';
import { useAuthStore, initAuthListener } from '../src/stores/authStore';
import { useProfileStore } from '../src/stores/profileStore';
import { trackPageView } from '../src/lib/analytics';

function usePageTracking() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
}

function useAuthRouting() {
  const router = useRouter();
  const segments = useSegments();
  const { user, initialised } = useAuthStore();
  const { birthCards } = useProfileStore();

  useEffect(() => {
    if (!initialised) return;

    const inOnboarding = segments[0] === '(onboarding)';
    const inTabs = segments[0] === '(tabs)';

    if (!user) {
      // Not signed in — go to onboarding entry if not already there
      if (!inOnboarding) {
        router.replace('/(onboarding)');
      }
    } else if (!birthCards) {
      // Signed in but no profile — go to profile step
      if (!inOnboarding) {
        router.replace('/(onboarding)/profile');
      }
    } else {
      // Fully onboarded — go to main app
      if (!inTabs) {
        router.replace('/(tabs)');
      }
    }
  }, [user, initialised, birthCards]);
}

export default function RootLayout() {
  const { initialised } = useAuthStore();

  useEffect(() => {
    return initAuthListener();
  }, []);

  useAuthRouting();
  usePageTracking();

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
