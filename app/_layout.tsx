import '../global.css';

import { Component, type ErrorInfo, type ReactNode, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter, useSegments, usePathname } from 'expo-router';
import { useFonts } from 'expo-font';
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
import { trackPageView } from '../src/lib/analytics';
import { initMonitoring, captureError, wrapRoot } from '../src/lib/monitoring';
import { initProductAnalytics, identifyUser, setAccentTheme } from '../src/lib/analytics/posthog';
import { useAvatarStore } from '../src/stores/avatarStore';
import { localFontAssets } from '../src/theme/typography';
import { isSupabaseConfigured } from '../src/lib/supabase/client';
import { colors } from '../src/theme/tokens';
import { ROUTE } from '../src/constants';

initMonitoring();
initProductAnalytics();
SplashScreen.preventAutoHideAsync();

function usePageTracking() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
}

// PostHog identity: Supabase user id only, and the accent theme as a plain
// value. No user (incl. prototype mode) → PostHog's anonymous id stands.
function useProductAnalyticsIdentity() {
  const userId = useAuthStore((s) => s.user?.id ?? null);
  // Wait for the restored session so a signed-in cold start isn't read as
  // signed out. Prototype mode never initialises auth — it's resolved as-is.
  const authResolved = useAuthStore((s) => s.initialised) || !isSupabaseConfigured;
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  useEffect(() => {
    if (authResolved) identifyUser(userId);
  }, [authResolved, userId]);
  useEffect(() => {
    setAccentTheme(activeAvatar);
  }, [activeAvatar]);
}

// Error boundary — surfaces runtime crashes instead of blank white screen
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    captureError(error, { componentStack: info.componentStack });
  }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.obsidian, padding: 24 }}>
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
        router.replace(ROUTE.ONBOARDING);
      }
    } else if (!birthCards) {
      if (!inOnboarding) {
        router.replace(ROUTE.ONBOARDING_PROFILE);
      }
    } else {
      if (!inTabs) {
        router.replace(ROUTE.TABS);
      }
    }
  }, [user, initialised, birthCards, segments]);
}

function AppContent() {
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
  useProductAnalyticsIdentity();

  if (!fontsLoaded && !fontError) {
    return null;
  }

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

function RootLayout() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default wrapRoot(RootLayout);
