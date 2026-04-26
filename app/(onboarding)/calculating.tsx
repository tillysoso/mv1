import { useEffect } from 'react';
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

export default function CalculatingScreen() {
  const router = useRouter();
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
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
    const { dateOfBirth, setBirthCards } = useProfileStore.getState();
    const cards = dateOfBirth
      ? birthCardCalculator(dateOfBirth.day, dateOfBirth.month, dateOfBirth.year)
      : undefined;

    const timer = setTimeout(() => {
      if (cards) setBirthCards(cards);
      router.push('/(onboarding)/personality');
    }, MIN_DURATION_MS);

    return () => clearTimeout(timer);
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
          The signal is reading your pattern.
        </Text>
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
    fontSize: typeScale.displayM.fontSize,
    fontWeight: '400',
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
});
