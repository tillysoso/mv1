import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

const ROMAN: Record<number, string> = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII',
  8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII', 13: 'XIII',
  14: 'XIV', 15: 'XV', 16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX',
  20: 'XX', 21: 'XXI', 22: 'XXII',
};

// TODO: fontFamily strings require expo-font preloading.
// TODO: Replace CardPlaceholder with actual card art once assets are delivered.

function CardPlaceholder({ number }: { number: number }) {
  return (
    <View style={styles.cardPlaceholder}>
      <Text style={styles.cardPlaceholderText}>{ROMAN[number] ?? number}</Text>
    </View>
  );
}

export default function SoulScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
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

  const isSameCard = birthCards?.sameCard ?? false;
  const soulCard = birthCards?.soulCard;

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
          onPress={() => router.push('/(onboarding)/profile')}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
      }
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        {isSameCard ? (
          // Same-card state — distinct callout
          <>
            <Text style={styles.label}>Both cards are the same, {name ?? 'traveller'}.</Text>
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
          // Standard soul card layout
          <>
            <Text style={styles.label}>Your Soul Card</Text>
            <Text style={styles.sublabel}>
              Not who you are. Who you are here to become.
            </Text>

            {soulCard && <CardPlaceholder number={soulCard.number} />}

            {soulCard && (
              <>
                <Text style={styles.cardNumber}>{ROMAN[soulCard.number] ?? soulCard.number}</Text>
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
    // TODO: fontFamily: fonts.body (Montserrat)
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.text.secondary,
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sublabel: {
    // TODO: fontFamily: fonts.body (Montserrat) light
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
  },
  cardPlaceholderText: {
    fontSize: 28,
    color: colors.mist,
    letterSpacing: 2,
  },
  cardNumber: {
    fontSize: typeScale.bodyM.fontSize,
    color: colors.mist,
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardName: {
    // TODO: fontFamily: fonts.display (Cinzel) bold
    fontSize: typeScale.displayL.fontSize,
    fontWeight: '700',
    color: colors.bone,
    letterSpacing: 1,
    marginBottom: 20,
  },
  essence: {
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
    // TODO: fontFamily: fonts.display (Cinzel)
    fontSize: typeScale.displayM.fontSize,
    fontWeight: '400',
    color: colors.bone,
    letterSpacing: 1,
  },
  sameCardSubtext: {
    // TODO: fontFamily: fonts.body (Montserrat) light
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
  },
  cta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
  },
  ctaText: {
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 2,
  },
});
