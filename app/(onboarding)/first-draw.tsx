import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { useProfileStore } from '../../src/stores/profileStore';
import { useAuthStore } from '../../src/stores/authStore';
import { saveProfile } from '../../src/lib/supabase/profile';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

// TODO: Wire up actual card draw component in Step 5 (card draw feature).
//       This screen currently acts as the ritual entry point / placeholder.

export default function FirstDrawScreen() {
  const router = useRouter();
  const { name, dateOfBirth, birthCards, setOnboardingComplete } = useProfileStore();
  const { user } = useAuthStore();

  async function handleDraw() {
    setOnboardingComplete(true);

    if (user?.id && dateOfBirth && birthCards) {
      saveProfile(user.id, dateOfBirth, birthCards).catch(() => {
        // Silently fail — local state is source of truth until sync
      });
    }

    router.replace('/(tabs)');
  }

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
          onPress={handleDraw}
        >
          <Text style={styles.ctaText}>Draw</Text>
        </Pressable>
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
    fontFamily: fonts.display,
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtext: {
    fontFamily: fonts.bodyLight,
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
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cta: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: colors.ash,
    alignSelf: 'center',
  },
  ctaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    color: colors.bone,
    letterSpacing: 2,
  },
});
