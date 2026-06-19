import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import { useProfileStore } from '../../src/stores/profileStore';
import { getCardOneliner } from '../../src/features/onboarding/cardOneliners';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { ROUTE } from '../../src/constants';
import { toRoman } from '../../src/utils/roman';

// TODO: Replace card placeholders with actual card art once assets are delivered.

function MiniCard({ number, name, role, essence }: { number: number; name: string; role: string; essence: string }) {
  return (
    <View style={styles.miniCard}>
      <View style={styles.miniCardImage}>
        <Text style={styles.miniCardRoman}>{toRoman(number)}</Text>
      </View>
      <Text style={styles.miniCardRole}>{role}</Text>
      <Text style={styles.miniCardName}>{name}</Text>
      <Text style={styles.miniCardEssence}>{essence}</Text>
    </View>
  );
}

// Codex emblem — a quiet, momentary appearance marking the first entry in the
// user's personal continuity. Not gamified: no unlock animation, no confetti,
// just a soft fade in and back out.
function CodexEmblem() {
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withDelay(
      600,
      withTiming(1, { duration: 900 }, () => {
        opacity.value = withDelay(1400, withTiming(0.3, { duration: 1200 }));
      })
    );
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return (
    <Animated.View style={[styles.emblem, animatedStyle]}>
      <View style={styles.emblemRing} />
      <View style={styles.emblemDot} />
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  useScrollDepth('/profile');
  const { width } = useWindowDimensions();
  const useRow = width >= 360;

  const isSameCard = birthCards?.sameCard ?? false;
  const personalityOneliner = birthCards ? getCardOneliner(birthCards.personalityCard.number) : undefined;
  const soulOneliner = birthCards ? getCardOneliner(birthCards.soulCard.number) : undefined;

  function handleEnterWorld() {
    trackNavigationClick('enter_the_world_cta', '/quiz');
    router.push(ROUTE.ONBOARDING_QUIZ);
  }

  return (
    <OnboardingScreen
      bottomContent={
        <CTAButton
          label="Enter the World"
          onPress={() => {
            trackNavigationClick('enter_the_world_cta', '/quiz');
            router.push(ROUTE.ONBOARDING_QUIZ);
          }}
        />
      }
    >
      <View style={styles.content}>
        <Text style={styles.heading}>
          This is your Majestic Profile{name ? `, ${name}` : ''}.
        </Text>
        <Text style={styles.subheading}>
          Your foundation. Your first entry in your codex.
          Everything that follows will be read in light of this.
        </Text>

        {birthCards && (
          <View style={[styles.cardsRow, useRow && styles.cardsRowHorizontal]}>
            <MiniCard
              number={birthCards.personalityCard.number}
              name={birthCards.personalityCard.name}
              role="Personality"
              essence={personalityOneliner?.personality ?? ''}
            />
            {!isSameCard && (
              <MiniCard
                number={birthCards.soulCard.number}
                name={birthCards.soulCard.name}
                role="Soul"
                essence={soulOneliner?.soul ?? ''}
              />
            )}
            {isSameCard && (
              <View style={styles.sameCardNote}>
                <Text style={styles.sameCardNoteText}>You carry your nature.</Text>
              </View>
            )}
          </View>
        )}

        <Text style={styles.resonanceNote}>
          These cards tend to appear in your readings.
          When they do, Majestic will recognise them.
        </Text>

        <CodexEmblem />
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
  },
  heading: {
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale.displayM.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    lineHeight: 36,
    marginBottom: 16,
  },
  subheading: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    marginBottom: 40,
  },
  cardsRow: {
    flexDirection: 'column',
    gap: 24,
    marginBottom: 32,
  },
  cardsRowHorizontal: {
    flexDirection: 'row',
    gap: 20,
  },
  miniCard: {
    flex: 1,
    maxWidth: 160,
  },
  miniCardImage: {
    width: '100%',
    aspectRatio: 0.65,
    backgroundColor: colors.bg.tertiary,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  miniCardRoman: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.mist,
    letterSpacing: 2,
  },
  miniCardRole: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.micro.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  miniCardName: {
    fontFamily: fonts.display,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.bone,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  miniCardEssence: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.micro.fontSize,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  sameCardNote: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: colors.ash,
  },
  sameCardNoteText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  resonanceNote: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    fontStyle: 'italic',
    marginBottom: 24,
  },
  emblem: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemRing: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.brass,
  },
  emblemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brass,
  },
});
