import '../global.css';

import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Cinzel_400Regular,
  Cinzel_600SemiBold,
  Cinzel_700Bold,
} from '@expo-google-fonts/cinzel';
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';
import { useAuthStore, initAuthListener } from '../src/stores/authStore';
import { useProfileStore } from '../src/stores/profileStore';
import { localFontAssets } from '../src/theme/typography';
import { colors } from '../src/theme/tokens';

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

  const [fontsLoaded, fontError] = useFonts({
    Cinzel_400Regular,
    Cinzel_600SemiBold,
    Cinzel_700Bold,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    SpaceMono_400Regular,
    ...localFontAssets,
  });

  useEffect(() => {
    return initAuthListener();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useAuthRouting();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!initialised) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.obsidian, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.majestic} size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
