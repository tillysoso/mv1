import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

export default function EntryScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const emblemOpacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    emblemOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const emblemStyle = useAnimatedStyle(() => ({
    opacity: emblemOpacity.value,
  }));

  return (
    <OnboardingScreen
      bottomContent={
        <CTAButton label="Begin" onPress={() => router.push('/(onboarding)/name')} />
      }
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.topSpacer} />

        <Text style={styles.wordmark}>Majestic</Text>
        {/* TODO: Replace with Majestic emblem asset from assets/emblems/ once delivered */}
        <Animated.View style={[styles.emblemPlaceholder, emblemStyle]} />

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
  wordmark: {
    fontFamily: fonts.wordmark,
    fontSize: 48,
    color: colors.bone,
  emblemPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bg.dusk,
    marginBottom: 48,
  },
  headline: {
    fontFamily: fonts.displayBold,
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale.displayM.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    lineHeight: 36,
    marginBottom: 16,
  },
  subHeadline: {
    fontFamily: fonts.body,
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
    fontFamily: fonts.display,
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
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    color: colors.bone,
    letterSpacing: 2,
  },
});
