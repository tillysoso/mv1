import { Text, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { ROUTE } from '../../src/constants';
import NumberCardPlaceholder from '../../src/components/onboarding/NumberCardPlaceholder';
import { toRoman } from '../../src/utils/roman';
import { useEntranceAnimation } from '../../src/hooks/useEntranceAnimation';

export default function SoulScreen() {
  const router = useRouter();
  const { birthCards, name } = useProfileStore();
  useScrollDepth('/soul');
  const animatedStyle = useEntranceAnimation();

  const isSameCard = birthCards?.sameCard ?? false;
  const soulCard = birthCards?.soulCard;

  function handleContinue() {
    trackNavigationClick('continue_cta', '/profile');
    router.push(ROUTE.ONBOARDING_PROFILE);
  }

  return (
    <OnboardingScreen
      bottomContent={<CTAButton label="Continue" onPress={handleContinue} />}
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
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyS.lineHeight,
    marginBottom: 32,
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
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
  },
});
