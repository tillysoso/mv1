import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { birthCardCalculator } from '../../src/features/birth-card/birthCardCalculator';
import { ROUTE } from '../../src/constants';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors, elementAccents } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

// By the time this screen renders, birthCards was already calculated during
// the dob screen's hold beat — no loading state here, only the reveal.
export default function ThresholdScreen() {
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
      const { dateOfBirth, setBirthCards } = useProfileStore.getState();

      const { dateOfBirth, setBirthCards } = useProfileStore.getState();
      const cards = dateOfBirth
        ? birthCardCalculator(dateOfBirth.day, dateOfBirth.month, dateOfBirth.year)
        : undefined;

      // Wait for the minimum display duration measured against actual completion
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);
      await new Promise<void>((resolve) => setTimeout(resolve, remaining));

      if (!mounted) return;
      clearTimeout(slowTimer);
      if (cards) setBirthCards(cards);
      router.push(ROUTE.ONBOARDING_PERSONALITY);
    }

    run();

    return () => {
      mounted = false;
      clearTimeout(slowTimer);
    };
  }, []);

  function handleTap() {
    // The user will tap fast here — that's intended, don't fight it with delay.
    exitOpacity.value = withTiming(0, { duration: 250 }, () => {
      runOnJS(router.push)(ROUTE.ONBOARDING_PERSONALITY);
    });
  }

  const worldStyle = useAnimatedStyle(() => ({ opacity: exitOpacity.value }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));
  const tintStyle = useAnimatedStyle(() => ({ opacity: tintOpacity.value, backgroundColor: tint }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  return (
    <OnboardingScreen>
      <View style={styles.content}>
        <Animated.Text style={[styles.headline, pulseStyle]}>
          The pattern is forming.
        </Animated.Text>
        <Text style={styles.subline}>
          Your birth cards are next.
        </Text>
        {showSlowMsg && (
          <Text style={styles.slowLine}>
            This is taking a moment. Still working.
          </Text>
        )}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.obsidian,
  },
  world: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tint: {
    borderRadius: 0,
  },
  textBlock: {
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 56,
  },
  headline: {
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    lineHeight: 28,
    textAlign: 'center',
  },
  headlineSecondary: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    textAlign: 'center',
    marginTop: 12,
  },
  cardBack: {
    width: 96,
    height: 152,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.ash,
    backgroundColor: colors.charcoal,
  },
});
