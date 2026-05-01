import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { toRoman } from '../../src/utils/roman';
import { toRoman } from '../../src/utils/romanNumerals';

// TODO: Replace card placeholders with actual card art once assets are delivered.

function MiniCard({ number, name, role }: { number: number; name: string; role: string }) {
  return (
    <View style={styles.miniCard}>
      <View style={styles.miniCardImage}>
        <Text style={styles.miniCardRoman}>{toRoman(number)}</Text>
      </View>
      <Text style={styles.miniCardRole}>{role}</Text>
      <Text style={styles.miniCardName}>{name}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  const { width } = useWindowDimensions();
  const useRow = width >= 360;

  const isSameCard = birthCards?.sameCard ?? false;

  return (
    <OnboardingScreen
      bottomContent={
        <CTAButton label="Enter the World" onPress={() => router.push('/(onboarding)/quiz')} />
      }
    >
      <View style={styles.content}>
        <Text style={styles.heading}>
          Your Majestic Profile{name ? `, ${name}` : ''}.
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
            />
            {!isSameCard && (
              <MiniCard
                number={birthCards.soulCard.number}
                name={birthCards.soulCard.name}
                role="Soul"
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
