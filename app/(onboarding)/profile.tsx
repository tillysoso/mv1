import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

// TODO: fontFamily strings require expo-font preloading.
// TODO: Replace card placeholders with actual card art once assets are delivered.

const ROMAN: Record<number, string> = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII',
  8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII', 13: 'XIII',
  14: 'XIV', 15: 'XV', 16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX',
  20: 'XX', 21: 'XXI', 22: 'XXII',
};

function MiniCard({ number, name, role }: { number: number; name: string; role: string }) {
  return (
    <View style={styles.miniCard}>
      <View style={styles.miniCardImage}>
        <Text style={styles.miniCardRoman}>{ROMAN[number] ?? number}</Text>
      </View>
      <Text style={styles.miniCardRole}>{role}</Text>
      <Text style={styles.miniCardName}>{name}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  useScrollDepth('/profile');
  const { width } = useWindowDimensions();
  const useRow = width >= 360;

  const isSameCard = birthCards?.sameCard ?? false;

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
          onPress={() => {
            trackNavigationClick('enter_the_world_cta', '/quiz');
            router.push('/(onboarding)/quiz');
          }}
        >
          <Text style={styles.ctaText}>Enter the World</Text>
        </Pressable>
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
    // TODO: fontFamily: fonts.display (Cinzel)
    fontSize: typeScale.displayM.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 1,
    lineHeight: 36,
    marginBottom: 16,
  },
  subheading: {
    // TODO: fontFamily: fonts.body (Montserrat) light
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
    fontSize: 22,
    color: colors.mist,
    letterSpacing: 2,
  },
  miniCardRole: {
    fontSize: typeScale.micro.fontSize,
    fontWeight: '600',
    color: colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  miniCardName: {
    // TODO: fontFamily: fonts.display (Cinzel)
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
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  resonanceNote: {
    // TODO: fontFamily: fonts.body (Montserrat) light
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
