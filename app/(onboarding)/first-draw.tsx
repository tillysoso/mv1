import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { useAuthStore } from '../../src/stores/authStore';
import { saveProfile } from '../../src/lib/supabase/profile';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

// TODO: Wire up actual card draw component in Step 5 (card draw feature).
//       This screen currently acts as the ritual entry point / placeholder.
// TODO: fontFamily strings require expo-font preloading.

export default function FirstDrawScreen() {
  const router = useRouter();
  const { name, dateOfBirth, birthCards, setOnboardingComplete } = useProfileStore();
  const { user } = useAuthStore();
  const [drawing, setDrawing] = useState(false);

  async function handleDraw() {
    if (drawing) return;
    setDrawing(true);
    setOnboardingComplete(true);

    // Persist to Supabase if user exists
    if (user?.id && dateOfBirth && birthCards) {
      saveProfile(user.id, dateOfBirth, birthCards).catch(() => {
        // Silently fail — local state is source of truth until sync
      });
    }

    // Placeholder pause for the ritual moment — replace with card flip animation in Step 5
    await new Promise((r) => setTimeout(r, 800));
    router.replace('/(tabs)');
  }

  return (
    <OnboardingScreen
      bottomContent={
        <CTAButton label="Draw" onPress={handleDraw} disabled={drawing} align="center" />
      }
    >
      <View style={styles.content}>
        <Text style={styles.greeting}>
          Your first card is ready{name ? `, ${name}` : ''}.
        </Text>
        <Text style={styles.subtext}>
          Take your time. There is no wrong moment.
        </Text>

        {/* Placeholder card face-down */}
        <View style={styles.cardPlaceholder}>
          <View style={styles.cardBack} />
        </View>

        <Text style={styles.note}>
          Your profile and this draw will be in your codex.{'\n'}
          The world is starting to know you.
        </Text>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    // TODO: fontFamily: fonts.display (Cinzel)
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtext: {
    // TODO: fontFamily: fonts.body (Montserrat) light
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    textAlign: 'center',
    marginBottom: 48,
  },
  cardPlaceholder: {
    alignItems: 'center',
    marginBottom: 48,
  },
  cardBack: {
    width: 160,
    height: 256,
    backgroundColor: colors.bg.secondary,
    borderWidth: 1,
    borderColor: colors.bg.dusk,
    borderRadius: 6,
    // TODO: Add ambient shimmer animation using Reanimated in Step 5
  },
  note: {
    // TODO: fontFamily: fonts.body (Montserrat) light
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
