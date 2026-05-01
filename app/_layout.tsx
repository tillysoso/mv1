import '../global.css';

import { Component, type ReactNode, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore, initAuthListener } from '../src/stores/authStore';
import { useProfileStore } from '../src/stores/profileStore';
import { isSupabaseConfigured } from '../src/lib/supabase/client';
import { colors } from '../src/theme/tokens';
import { ROUTE } from '../src/constants';

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
