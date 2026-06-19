import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import CardReveal from '../../src/components/cards/CardReveal';
import NumberCardPlaceholder from '../../src/components/onboarding/NumberCardPlaceholder';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import { useProfileStore } from '../../src/stores/profileStore';
import { getCardOneliner } from '../../src/features/onboarding/cardOneliners';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { ROUTE } from '../../src/constants';

// 'expansive' tone timings — softer and slower than the personality reveal.
const LIFT_MS = 700;
const FLIP_MS = 900;
const SETTLE_MS = LIFT_MS + FLIP_MS + 150;
const LINE_STAGGER_MS = 700;
const CTA_BEAT_MS = 1800;

export default function SoulScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  useScrollDepth('/soul');
  const { width } = useWindowDimensions();
  const useRow = width >= 360;

  const isSameCard = birthCards?.sameCard ?? false;
  const personalityCard = birthCards?.personalityCard;
  const soulCard = birthCards?.soulCard;
  const oneliner = soulCard ? getCardOneliner(soulCard.number) : undefined;

  const [linesShown, setLinesShown] = useState(0);
  const [ctaReady, setCtaReady] = useState(false);

  useEffect(() => {
    if (!birthCards) return;
    if (isSameCard) {
      const timers = [
        setTimeout(() => setLinesShown(2), 400),
        setTimeout(() => setCtaReady(true), 400 + CTA_BEAT_MS),
      ];
      return () => timers.forEach(clearTimeout);
    }
    const timers = [
      setTimeout(() => setLinesShown(1), SETTLE_MS),
      setTimeout(() => setLinesShown(2), SETTLE_MS + LINE_STAGGER_MS),
      setTimeout(() => setCtaReady(true), SETTLE_MS + LINE_STAGGER_MS + CTA_BEAT_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [birthCards, isSameCard]);

  return (
    <OnboardingScreen
      bottomContent={
        ctaReady ? (
          <CTAButton
            label="Continue"
            onPress={() => {
              trackNavigationClick('continue_cta', '/profile');
              router.push(ROUTE.ONBOARDING_PROFILE);
            }}
          />
        ) : null
      }
    >
      <View style={styles.content}>
        {isSameCard ? (
          <>
            <Text style={styles.label}>
              Both cards are the same{name ? `, ${name}` : ''}.
            </Text>
            {personalityCard && (
              <View style={styles.sameCardWrap}>
                <NumberCardPlaceholder number={personalityCard.number} />
                <Text style={styles.cardName}>{personalityCard.name}</Text>
              </View>
            )}
            {linesShown >= 2 && (
              <Text style={styles.sameCardSubtext}>
                You carry your purpose as your nature. Some people spend a
                lifetime finding what you were born knowing. The work is
                learning to trust it.
              </Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.label}>And this is your soul card.</Text>
            <Text style={styles.sublabel}>
              Not who you are. Who you are here to become.
            </Text>

            <View style={[styles.cardsRow, useRow && styles.cardsRowHorizontal]}>
              {personalityCard && (
                <View style={styles.settledCard}>
                  <NumberCardPlaceholder number={personalityCard.number} />
                  <Text style={styles.settledCardName}>{personalityCard.name}</Text>
                </View>
              )}
              {soulCard && (
                <View style={styles.revealingCard}>
                  <CardReveal number={soulCard.number} tone="expansive" />
                </View>
              )}
            </View>

            {soulCard && oneliner && linesShown >= 1 && (
              <View style={styles.lines}>
                <Text style={styles.cardName}>{soulCard.name}</Text>
                {linesShown >= 2 && <Text style={styles.essence}>{oneliner.soul}</Text>}
              </View>
            )}
          </>
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
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    color: colors.text.secondary,
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  sublabel: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyS.lineHeight,
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  cardsRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  cardsRowHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  settledCard: {
    alignItems: 'center',
  },
  settledCardName: {
    fontFamily: fonts.display,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    marginTop: -16,
  },
  revealingCard: {
    alignItems: 'center',
  },
  lines: {
    alignItems: 'center',
    marginTop: 20,
  },
  cardName: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.displayL.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 14,
  },
  essence: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    textAlign: 'center',
    maxWidth: 320,
  },
  sameCardWrap: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  sameCardSubtext: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    textAlign: 'center',
    maxWidth: 320,
  },
});
