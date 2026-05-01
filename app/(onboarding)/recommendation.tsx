import { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackSelectContent, trackNavigationClick } from '../../src/lib/analytics';
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import type { AvatarId } from '../../src/types/avatar';

const AVATAR_DESCRIPTIONS: Record<AvatarId, string> = {
  casper:  'Direct. Decisive. Will not let you stall.',
  eli:     'Reframes everything. Sees what others miss.',
  olivia:  'Grounds insight in the real. Steady and durable.',
  destiny: 'Holds space. Sees what you\'re not saying.',
};

const AVATAR_LABELS: Record<AvatarId, string> = {
  casper:  'Casper',
  eli:     'Eli',
  olivia:  'Olivia',
  destiny: 'Destiny',
};

const AVATAR_ORDER: AvatarId[] = ['casper', 'eli', 'olivia', 'destiny'];

// Avatar portrait images (neutral state)
const AVATAR_IMAGES: Record<AvatarId, any> = {
  casper:  require('../../assets/avatars/casper/casper-neutral.png'),
  eli:     require('../../assets/avatars/eli/eli-neutral.png'),
  olivia:  require('../../assets/avatars/olivia/olivia-neutral.png'),
  destiny: require('../../assets/avatars/destiny/destiny-active.png'), // no neutral yet
};

function getRecommendation(scores: Record<AvatarId, number>, tiebreaker: AvatarId | null): AvatarId {
  const max = Math.max(...Object.values(scores));
  const tied = (Object.keys(scores) as AvatarId[]).filter((k) => scores[k] === max);

  if (tied.length === 1) return tied[0];

  if (tiebreaker && tied.includes(tiebreaker)) return tiebreaker;

  // Secondary tiebreaker: olivia beats eli
  if (tied.includes('olivia') && tied.includes('eli')) return 'olivia';

  return tied[0];
}

export default function RecommendationScreen() {
  const router = useRouter();
  const { quizScores, quizTiebreaker } = useProfileStore();
  const { setAvatar } = useAvatarStore();

  const recommended = getRecommendation(quizScores, quizTiebreaker);
  const [selected, setSelected] = useState<AvatarId>(recommended);
  useScrollDepth('/recommendation');

  function handleConfirm() {
    setAvatar(selected);
    trackNavigationClick('choose_avatar_cta', '/confirm');
    router.push('/(onboarding)/confirm');
  }

  return (
    <>
      {/* Prevent back-swipe — quiz scores are committed, going back would corrupt them */}
      <Stack.Screen options={{ gestureEnabled: false }} />
      <OnboardingScreen
        bottomContent={
          <CTAButton label={`Choose ${AVATAR_LABELS[selected]}`} onPress={handleConfirm} />
        }
      >
        <View style={styles.content}>
          <Text style={styles.eyebrow}>Right now —</Text>
          <Text style={styles.headline}>
            {AVATAR_LABELS[recommended]} tends to find people like you.
          </Text>

          <Text style={styles.caveat}>
            This is a suggestion. The choice is always yours.
          </Text>
        </Pressable>
      }
    >
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Right now —</Text>
        <Text style={styles.headline}>
          {AVATAR_LABELS[recommended]} tends to find people like you.
        </Text>

        <Text style={styles.caveat}>
          This is a suggestion. The choice is always yours.
        </Text>

        <View style={styles.grid}>
          {AVATAR_ORDER.map((id) => {
            const accent = avatarAccents[id];
            const isSelected = selected === id;
            const isRecommended = id === recommended;

            return (
              <Pressable
                key={id}
                style={[
                  styles.avatarCard,
                  isSelected && { borderColor: accent.primary },
                ]}
                onPress={() => {
                  trackSelectContent('avatar', id);
                  setSelected(id);
                }}
              >
                <Image
                  source={AVATAR_IMAGES[id]}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
                <Text style={[styles.avatarName, isSelected && { color: accent.primary }]}>
                  {AVATAR_LABELS[id]}
                </Text>
                <Text style={styles.avatarDesc} numberOfLines={2} ellipsizeMode="tail">{AVATAR_DESCRIPTIONS[id]}</Text>
                {isRecommended && (
                  <View style={[styles.recommendedBadge, { backgroundColor: accent.primary }]}>
                    <Text style={styles.recommendedText}>Suggested</Text>
                  </View>
                )}
              </Pressable>
            );
          })}

          <View style={styles.grid}>
            {AVATAR_ORDER.map((id) => {
              const accent = avatarAccents[id];
              const isSelected = selected === id;
              const isRecommended = id === recommended;

              return (
                <Pressable
                  key={id}
                  style={[
                    styles.avatarCard,
                    isSelected && { borderColor: accent.primary },
                  ]}
                  onPress={() => setSelected(id)}
                >
                  <Image
                    source={AVATAR_IMAGES[id]}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                  <Text style={[styles.avatarName, isSelected && { color: accent.primary }]}>
                    {AVATAR_LABELS[id]}
                  </Text>
                  <Text style={styles.avatarDesc}>{AVATAR_DESCRIPTIONS[id]}</Text>
                  {isRecommended && (
                    <View style={[styles.recommendedBadge, { backgroundColor: accent.primary }]}>
                      <Text style={styles.recommendedText}>Suggested</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </OnboardingScreen>
    </>
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
    marginBottom: 8,
  },
  headline: {
    fontFamily: fonts.display,
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    lineHeight: 28,
    marginBottom: 12,
  },
  caveat: {
    fontFamily: fonts.body,
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.mist,
    marginBottom: 36,
    fontStyle: 'italic',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarCard: {
    width: '47%',
    minHeight: 200,
    borderWidth: 1,
    borderColor: colors.ash,
    padding: 12,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: 100,
    marginBottom: 8,
    borderRadius: 2,
  },
  avatarName: {
    fontFamily: fonts.displayBold,
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.bone,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  avatarDesc: {
    fontFamily: fonts.body,
    fontSize: typeScale.micro.fontSize,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  recommendedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  recommendedText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 9,
    color: colors.bone,
    letterSpacing: 0.5,
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
