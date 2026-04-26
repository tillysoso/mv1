import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

// TODO: Replace Text fontFamily strings with loaded Cinzel/Montserrat once
// Luke's font assets are delivered. Use expo-font for preloading.

export default function EntryScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => router.push('/(onboarding)/name')}
        >
          <Text style={styles.ctaText}>Begin</Text>
        </Pressable>
      }
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.topSpacer} />

        {/* TODO: Replace with Majestic emblem asset from assets/emblems/ once delivered */}
        <View style={styles.emblemPlaceholder} />

        <Text style={styles.headline}>
          Something in this city reads patterns.
        </Text>

        <Text style={styles.subHeadline}>
          It always has. Not everyone notices.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.brandLine}>
          Your adventure. But Majestic.
        </Text>
      </Animated.View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  topSpacer: {
    flex: 1,
  },
  emblemPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bg.dusk,
    opacity: 0.6,
    marginBottom: 48,
    // Pulse animation handled by avatar aura system in a later step
  },
  headline: {
    // TODO: fontFamily: fonts.display (Cinzel) — awaiting font delivery
    fontSize: typeScale.displayM.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 1,
    lineHeight: 36,
    marginBottom: 16,
  },
  subHeadline: {
    // TODO: fontFamily: fonts.body (Montserrat)
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    marginBottom: 40,
  },
  divider: {
    width: 32,
    height: 1,
    backgroundColor: colors.ash,
    marginBottom: 24,
  },
  brandLine: {
    // TODO: fontFamily: fonts.display (Cinzel)
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 2,
    marginBottom: 60,
  },
  cta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'stretch',
  },
  ctaPressed: {
    borderColor: colors.mist,
    opacity: 0.8,
  },
  ctaText: {
    // TODO: fontFamily: fonts.body (Montserrat)
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 2,
  },
});
