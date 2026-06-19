import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import CardReveal from '../../src/components/cards/CardReveal';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import { useProfileStore } from '../../src/stores/profileStore';
import { getCardOneliner } from '../../src/features/onboarding/cardOneliners';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { ROUTE } from '../../src/constants';
import NumberCardPlaceholder from '../../src/components/onboarding/NumberCardPlaceholder';
import { toRoman } from '../../src/utils/roman';
import { useEntranceAnimation } from '../../src/hooks/useEntranceAnimation';

// Reveal sequence timings, mirrored from CardReveal's 'taut' tone so the
// three lines below land in step with the card settling into its breathing pulse.
const LIFT_MS = 500;
const FLIP_MS = 700;
const SETTLE_MS = LIFT_MS + FLIP_MS + 150;
const LINE_STAGGER_MS = 650;
const CTA_BEAT_MS = 1800;

// Stagger is driven by mounting each line on a timer (see effect below);
// this just fades in whatever is currently mounted.
function FadeInLine({ style, children }: { style: any; children: React.ReactNode }) {
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}

export default function PersonalityScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  useScrollDepth('/personality');
  const animatedStyle = useEntranceAnimation();

  const [linesShown, setLinesShown] = useState(0);
  const [ctaReady, setCtaReady] = useState(false);

  const card = birthCards?.personalityCard;
  const oneliner = card ? getCardOneliner(card.number) : undefined;

  useEffect(() => {
    if (!card) return;
    const timers = [
      setTimeout(() => setLinesShown(1), SETTLE_MS),
      setTimeout(() => setLinesShown(2), SETTLE_MS + LINE_STAGGER_MS),
      setTimeout(() => setLinesShown(3), SETTLE_MS + LINE_STAGGER_MS * 2),
      setTimeout(() => setCtaReady(true), SETTLE_MS + LINE_STAGGER_MS * 2 + CTA_BEAT_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [card]);

  function handleContinue() {
    trackNavigationClick('continue_cta', '/soul');
    router.push(ROUTE.ONBOARDING_SOUL);
  }

  return (
    <OnboardingScreen
      bottomContent={
        <CTAButton
          label="Continue"
          onPress={() => {
            trackNavigationClick('continue_cta', '/soul');
            router.push(ROUTE.ONBOARDING_SOUL);
          }}
        />
        ctaReady ? (
          <CTAButton
            label="Continue"
            onPress={() => {
              trackNavigationClick('continue_cta', '/soul');
              router.push(ROUTE.ONBOARDING_SOUL);
            }}
          />
        ) : null
      }
    >
      <View style={styles.content}>
        <Text style={styles.eyebrow}>{name ? `${name}.` : ''}</Text>
        <Text style={styles.label}>This is your personality card.</Text>

        {card && <CardReveal number={card.number} tone="taut" />}

        {card && oneliner && (
          <View style={styles.lines}>
            {linesShown >= 1 && (
              <FadeInLine style={styles.lineBlock}>
                <Text style={styles.cardName}>{card.name}</Text>
              </FadeInLine>
            )}
            {linesShown >= 2 && (
              <FadeInLine style={styles.lineBlock}>
                <Text style={styles.essence}>{oneliner.personality}</Text>
              </FadeInLine>
            )}
            {linesShown >= 3 && (
              <FadeInLine style={styles.lineBlock}>
                <Text style={styles.resonance}>
                  This card tends to come up a lot for you. You will see why.
                </Text>
              </FadeInLine>
            )}
          </View>
        )}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  eyebrow: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 1,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    color: colors.text.secondary,
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sublabel: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyS.lineHeight,
    marginBottom: 32,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  cardNumber: {
    fontFamily: fonts.display,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.mist,
    letterSpacing: 2,
    marginBottom: 8,
  lines: {
    alignItems: 'center',
    marginTop: 8,
  },
  lineBlock: {
    marginBottom: 14,
    alignItems: 'center',
  },
  cardName: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.displayL.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    textAlign: 'center',
  },
  essence: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    textAlign: 'center',
    maxWidth: 320,
  },
  resonance: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
