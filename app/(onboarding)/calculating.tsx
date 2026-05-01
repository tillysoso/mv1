import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { birthCardCalculator } from '../../src/features/birth-card/birthCardCalculator';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

const MIN_DURATION_MS = 2000;
const SLOW_THRESHOLD_MS = 5000;

export default function CalculatingScreen() {
  const router = useRouter();
  const pulseOpacity = useSharedValue(0.4);
  const [showSlowMsg, setShowSlowMsg] = useState(false);

  useEffect(() => {
    // Slow atmospheric pulse — runs until component unmounts on navigation
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200 }),
        withTiming(0.4, { duration: 1200 }),
      ),
      -1,
      false,
    );
  }, []);

  useEffect(() => {
    let mounted = true;

    const slowTimer = setTimeout(() => {
      if (mounted) setShowSlowMsg(true);
    }, SLOW_THRESHOLD_MS);

    async function run() {
      const start = Date.now();

      let cards: BirthCards | undefined;
      if (dateOfBirth) {
        cards = birthCardCalculator(dateOfBirth.day, dateOfBirth.month, dateOfBirth.year);
      }

      // Wait for the minimum display duration measured against actual completion
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);
      await new Promise<void>((resolve) => setTimeout(resolve, remaining));
    const { dateOfBirth, setBirthCards } = useProfileStore.getState();
    const cards = dateOfBirth
      ? birthCardCalculator(dateOfBirth.day, dateOfBirth.month, dateOfBirth.year)
      : undefined;

      if (!mounted) return;
      clearTimeout(slowTimer);
      if (cards) setBirthCards(cards);
      router.push('/(onboarding)/personality');
    }

    run();
    }, MIN_DURATION_MS);

    return () => {
      mounted = false;
      clearTimeout(slowTimer);
    };
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  return (
    <OnboardingScreen>
      <View style={styles.content}>
        <Animated.Text style={[styles.headline, pulseStyle]}>
          The pattern is forming.
        </Animated.Text>
        <Text style={styles.subline}>
          Your birth cards are next.
          Your numbers are unusual.
        </Text>
        {showSlowMsg && (
          <Text style={styles.slowLine}>
            // This is taking a moment. Still working.
          </Text>
        )}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontFamily: fonts.display,
    fontSize: typeScale.displayM.fontSize,
    color: colors.mist,
    letterSpacing: 2,
    marginBottom: 16,
  },
  subline: {
    fontFamily: fonts.terminal,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
  },
  slowLine: {
    fontFamily: fonts.terminal,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
    marginTop: 20,
    opacity: 0.7,
  },
});
