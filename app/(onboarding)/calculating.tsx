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
import { cardElement } from '../../src/features/birth-card/cardElement';
import { ROUTE } from '../../src/constants';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors, elementAccents } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

// By the time this screen renders, birthCards was already calculated during
// the dob screen's hold beat — no loading state here, only the reveal.
export default function ThresholdScreen() {
  const router = useRouter();
  const birthCards = useProfileStore((s) => s.birthCards);

  const element = birthCards ? cardElement(birthCards.personalityCard.number) : 'air';
  const tint = elementAccents[element].primary;

  const textOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(24);
  const tintOpacity = useSharedValue(0);
  const exitOpacity = useSharedValue(1);

  useEffect(() => {
    textOpacity.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.ease) });
    tintOpacity.value = withTiming(0.3, { duration: 1600 });
    cardOpacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) });
    cardTranslateY.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) });
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
    <Pressable style={styles.root} onPress={handleTap}>
      <Animated.View style={[styles.world, worldStyle]}>
        {/* World shifts barely perceptibly toward the calculated element */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.tint, tintStyle]} pointerEvents="none" />

        <Animated.View style={[styles.textBlock, textStyle]}>
          <Text style={styles.headline}>The pattern is older than you think.</Text>
          <Text style={styles.headlineSecondary}>And more specific than you expected.</Text>
        </Animated.View>

        {/* TODO: real card-back artwork not yet delivered (assets/cards/major-arcana/
            not populated) — placeholder rectangle stands in for the card back */}
        <Animated.View style={[styles.cardBack, cardStyle]} />
      </Animated.View>
    </Pressable>
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
