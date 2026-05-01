import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import NumberCardPlaceholder from '../../src/components/onboarding/NumberCardPlaceholder';
import { toRoman } from '../../src/utils/roman';
import { useEntranceAnimation } from '../../src/hooks/useEntranceAnimation';
import { toRoman } from '../../src/utils/romanNumerals';

const ROMAN: Record<number, string> = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII',
  8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII', 13: 'XIII',
  14: 'XIV', 15: 'XV', 16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX',
  20: 'XX', 21: 'XXI', 22: 'XXII',
};

// TODO: Replace CardPlaceholder with actual card art once assets are delivered.

function CardPlaceholder({ number }: { number: number }) {
  return (
    <View style={styles.cardPlaceholder}>
      <Text style={styles.cardPlaceholderText}>{toRoman(number)}</Text>
    </View>
  );
}

export default function SoulScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  useScrollDepth('/soul');
  const translateY = useSharedValue(60);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
    opacity.value = withDelay(100, withTiming(1, { duration: 500 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  const animatedStyle = useEntranceAnimation();

  const isSameCard = birthCards?.sameCard ?? false;
  const soulCard = birthCards?.soulCard;

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
          onPress={() => {
            trackNavigationClick('continue_cta', '/profile');
            router.push('/(onboarding)/profile');
          }}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
        <CTAButton label="Continue" onPress={() => router.push('/(onboarding)/profile')} />
      }
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        {isSameCard ? (
          <>
            <Text style={styles.label}>Both cards are the same{name ? `, ${name}` : ''}.</Text>
            <View style={styles.sameCardCallout}>
              <Text style={styles.sameCardText}>
                You carry your nature.
              </Text>
            </View>
            <Text style={styles.sameCardSubtext}>
              You carry your purpose as your nature. Some people spend a
              lifetime finding what you were born knowing. The work is
              learning to trust it.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Your Soul Card</Text>
            <Text style={styles.sublabel}>
              Not who you are. Who you are here to become.
            </Text>

            {soulCard && <NumberCardPlaceholder number={soulCard.number} />}

            {soulCard && (
              <>
                <Text style={styles.cardNumber}>{toRoman(soulCard.number)}</Text>
                <Text style={styles.cardName}>{soulCard.name}</Text>
                <Text style={styles.essence}>
                  Your purpose. The direction of your growth.{'\n'}
                  The becoming.
                </Text>
              </>
            )}
          </>
        )}
      </Animated.View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
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
    fontFamily: fonts.body,
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyS.lineHeight,
    marginBottom: 32,
  },
  cardPlaceholder: {
    width: 140,
    height: 220,
    backgroundColor: colors.bg.tertiary,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    alignSelf: 'center',
  },
  cardPlaceholderText: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.mist,
    letterSpacing: 2,
  },
  cardNumber: {
    fontFamily: fonts.display,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.mist,
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardName: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.displayL.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    marginBottom: 20,
  },
  essence: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
  },
  sameCardCallout: {
    borderLeftWidth: 2,
    borderLeftColor: colors.bg.dusk,
    paddingLeft: 20,
    marginBottom: 24,
    marginTop: 32,
  },
  sameCardText: {
    fontFamily: fonts.display,
    fontSize: typeScale.displayM.fontSize,
    color: colors.bone,
    letterSpacing: 1,
  },
  sameCardSubtext: {
    fontFamily: fonts.body,
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
  },
  cta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    alignSelf: 'stretch',
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
  },
  ctaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    color: colors.bone,
    letterSpacing: 2,
  },
});
