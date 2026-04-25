import '../global.css';

import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Cinzel_400Regular,
  Cinzel_700Bold,
} from '@expo-google-fonts/cinzel';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore, initAuthListener } from '../src/stores/authStore';
import { useProfileStore } from '../src/stores/profileStore';
import { fontAssets } from '../src/theme/typography';

SplashScreen.preventAutoHideAsync();

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
  }, [user, initialised, birthCards]);
}

export default function RootLayout() {
  const { initialised } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    SpaceMono_400Regular,
    ...fontAssets,
  });

  useEffect(() => {
    return initAuthListener();
  }, []);

  useAuthRouting();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!initialised || !fontsLoaded) {
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
