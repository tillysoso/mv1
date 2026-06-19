import { Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import NumberCardPlaceholder from '../../src/components/onboarding/NumberCardPlaceholder';
import { useEntranceAnimation } from '../../src/hooks/useEntranceAnimation';
import { toRoman } from '../../src/utils/romanNumerals';

// TODO: Replace CardPlaceholder with actual card image from assets/cards/major-arcana/
//       once card art is delivered in a later step.

export default function PersonalityScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  useScrollDepth('/personality');
  const animatedStyle = useEntranceAnimation();

  const card = birthCards?.personalityCard;

  return (
    <OnboardingScreen
      bottomContent={
        <CTAButton label="Continue" onPress={() => {
          trackNavigationClick('continue_cta', '/soul');
          router.push('/(onboarding)/soul');
        }} />
      }
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.eyebrow}>{name ? `${name}.` : ''}</Text>
        <Text style={styles.label}>Your Personality Card</Text>
        <Text style={styles.sublabel}>
          The face you show the world.
        </Text>

        {card && <NumberCardPlaceholder number={card.number} />}

        {card && (
          <>
            <Text style={styles.cardNumber}>{toRoman(card.number)}</Text>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.essence}>
              This is who you are. Your shadow. Your essence.{'\n'}
              The archetype you were born carrying.
            </Text>
            <Text style={styles.resonance}>
              This card tends to come up a lot for you. You will see why.
            </Text>
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
  eyebrow: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 1,
    marginBottom: 12,
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
    marginBottom: 16,
  },
  resonance: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    fontStyle: 'italic',
  },
});
