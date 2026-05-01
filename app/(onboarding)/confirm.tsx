import { useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useRouter, Stack } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { useAuthStore } from '../../src/stores/authStore';
import { updateAvatar } from '../../src/lib/supabase/v2/profile';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import type { AvatarId } from '../../src/types/avatar';

// TODO: fontFamily strings require expo-font preloading.

const AVATAR_IMAGES: Record<AvatarId, any> = {
  casper:  require('../../assets/avatars/casper/casper-neutral.png'),
  eli:     require('../../assets/avatars/eli/eli-neutral.png'),
  olivia:  require('../../assets/avatars/olivia/olivia-neutral.png'),
  destiny: require('../../assets/avatars/destiny/destiny-active.png'),
};

const AVATAR_NAMES: Record<AvatarId, string> = {
  casper:  'Casper',
  eli:     'Eli',
  olivia:  'Olivia',
  destiny: 'Destiny',
};

const FIRST_WORDS: Record<AvatarId, string> = {
  casper:  'Right. Let\'s go.',
  eli:     'There\'s a lot to explore.',
  olivia:  'Good. We\'ll figure it out together.',
  destiny: 'I\'m glad you\'re here.',
};

export default function ConfirmScreen() {
  const router = useRouter();
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const { user } = useAuthStore();
  const accent = avatarAccents[activeAvatar];

  const overlayOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    overlayOpacity.value = withTiming(0.15, { duration: 1400, easing: Easing.out(Easing.ease) });
    contentOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });

    if (user?.id) {
      updateAvatar(user.id, activeAvatar).catch(() => {
        // Silently fail — will sync on next session
      });
    }
  }, []);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    backgroundColor: accent.primary,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
          onPress={() => router.push('/(onboarding)/first-draw')}
        >
          <Text style={styles.ctaText}>Let's Begin</Text>
        </Pressable>
      }
    >
      <Animated.View style={[StyleSheet.absoluteFill, overlayStyle]} pointerEvents="none" />

      <Animated.View style={[styles.content, contentStyle]}>
        <Text style={styles.presenceLine}>
          {AVATAR_NAMES[activeAvatar]} is with you.
        </Text>
    <>
      {/* Prevent back-swipe — avatar choice is committed */}
      <Stack.Screen options={{ gestureEnabled: false }} />
      <OnboardingScreen
        bottomContent={
          <CTAButton label="Let's Begin" onPress={() => router.push('/(onboarding)/first-draw')} />
        }
      >
        {/* Elemental accent bloom overlay */}
        <Animated.View style={[StyleSheet.absoluteFill, overlayStyle]} pointerEvents="none" />

        <Animated.View style={[styles.content, contentStyle]}>
          <Text style={styles.presenceLine}>
            {AVATAR_NAMES[activeAvatar]} is with you.
          </Text>

        <Image
          source={AVATAR_IMAGES[activeAvatar]}
          style={styles.portrait}
          resizeMode="cover"
        />

        <Text style={[styles.avatarName, { color: accent.primary }]}>
          {AVATAR_NAMES[activeAvatar]}
        </Text>
          <Text style={[styles.avatarName, { color: accent.primary }]}>
            {AVATAR_NAMES[activeAvatar]}
          </Text>

          <Text style={styles.firstWords}>
            "{FIRST_WORDS[activeAvatar]}"
          </Text>
        </Animated.View>
      </OnboardingScreen>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  presenceLine: {
    fontFamily: fonts.body,
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    letterSpacing: 1,
    marginBottom: 24,
  },
  portrait: {
    width: 120,
    height: 180,
    marginBottom: 24,
  },
  avatarName: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.displayXL.fontSize,
    letterSpacing: 2,
    marginBottom: 32,
  },
  firstWords: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyL.fontSize,
    color: colors.bone,
    lineHeight: typeScale.bodyL.lineHeight,
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
