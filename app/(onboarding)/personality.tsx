import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import NumberCardPlaceholder from '../../src/components/onboarding/NumberCardPlaceholder';
import { toRoman } from '../../src/utils/roman';
import { useEntranceAnimation } from '../../src/hooks/useEntranceAnimation';

export default function PersonalityScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  const animatedStyle = useEntranceAnimation();

  const card = birthCards?.personalityCard;

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
          onPress={() => router.push('/(onboarding)/soul')}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
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
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.text.secondary,
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sublabel: {
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyS.lineHeight,
    marginBottom: 32,
  },
  cardNumber: {
    fontSize: typeScale.bodyM.fontSize,
    color: colors.mist,
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardName: {
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
    marginBottom: 16,
  },
  resonance: {
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    fontStyle: 'italic',
  },
  cta: {
    paddingVertical: 16,
    alignSelf: 'flex-start',
  },
  ctaText: {
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 2,
  },
});
