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
import { Component, type ReactNode, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Cinzel_400Regular,
  Cinzel_700Bold,
} from '@expo-google-fonts/cinzel';
import {
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
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore, initAuthListener } from '../src/stores/authStore';
import { useProfileStore } from '../src/stores/profileStore';
import { fontAssets } from '../src/theme/typography';

SplashScreen.preventAutoHideAsync();
import { useAuthStore, initAuthListener } from '../src/stores/authStore';
import { useProfileStore } from '../src/stores/profileStore';
import { localFontAssets } from '../src/theme/typography';
import { colors } from '../src/theme/tokens';

SplashScreen.preventAutoHideAsync();
import { isSupabaseConfigured } from '../src/lib/supabase/client';

// Error boundary — surfaces runtime crashes instead of blank white screen
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: '#0D0D14', padding: 24 }}>
          <Text style={{ color: '#FF4444', fontSize: 16, fontWeight: 'bold', marginTop: 60, marginBottom: 12 }}>
            Runtime Error
          </Text>
          <Text style={{ color: '#FF8888', fontSize: 13, marginBottom: 16 }}>
            {this.state.error.message}
          </Text>
          <Text style={{ color: '#888', fontSize: 11, fontFamily: 'monospace' }}>
            {this.state.error.stack}
          </Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

function useAuthRouting() {
  const router = useRouter();
  const segments = useSegments();
  const { user, initialised } = useAuthStore();
  const { birthCards } = useProfileStore();

  useEffect(() => {
    // Prototype mode: no Supabase configured. Skip all routing — the default
    // route resolves to (tabs)/index already. Calling router.replace here fires
    // before navigationRef.isReady() and crashes with "navigate before mounting".
    if (!isSupabaseConfigured) return;

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

function AppContent() {
  const { initialised } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
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
    ...fontAssets,
    ...localFontAssets,
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    return initAuthListener();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useAuthRouting();
  usePageTracking();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!initialised || !fontsLoaded) {
  if (!fontsLoaded && !fontError) {
    return null;
  // In prototype mode skip the loading gate entirely
  if (!isSupabaseConfigured) {
    return <Stack screenOptions={{ headerShown: false }} />;
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

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
