import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

interface OnboardingScreenProps {
  children: React.ReactNode;
  bottomContent?: React.ReactNode;
  style?: ViewStyle;
}

// Radial gradient atmosphere layer: approximated with layered Views since
// React Native has no built-in radial gradient. expo-linear-gradient only
// supports linear — when Skia particle/aura system is wired up in a later
// step, replace this with a Canvas radial gradient.
function AtmosphereLayer() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Centre glow — #1A1A2E bleeding outward */}
      <View style={styles.atmosphereCenter} />
    </View>
  );
}

export default function OnboardingScreen({
  children,
  bottomContent,
  style,
}: OnboardingScreenProps) {
  return (
    <View style={styles.root}>
      <AtmosphereLayer />
      <SafeAreaView style={[styles.safe, style]}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>{children}</ScrollView>
        {bottomContent && (
          <View style={styles.bottom}>{bottomContent}</View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D0D14',
  },
  atmosphereCenter: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    bottom: '20%',
    borderRadius: 999,
    backgroundColor: '#1A1A2E',
    opacity: 0.45,
    // Soften with scale — gives a radial feel without a gradient library
    transform: [{ scaleX: 1.4 }, { scaleY: 1.0 }],
  },
  safe: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 24,
  },
  bottom: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
});
