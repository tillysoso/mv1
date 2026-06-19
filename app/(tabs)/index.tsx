import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { useProfileStore } from '../../src/stores/profileStore';
import { useDailyDraw } from '../../src/features/daily-draw/useDailyDraw';
import AvatarPortrait from '../../src/components/avatar/AvatarPortrait';
import CardFace from '../../src/components/cards/CardFace';
import AvatarPortrait from '../../src/components/avatar/AvatarPortrait';
import { interpretationPlaceholder } from '../../src/features/reading/interpretationPlaceholder';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import type { AuraContext } from '../../src/types';
import type { AvatarId } from '../../src/types/avatar';
import { AURA_CONTEXT, PRESENCE_LEVEL } from '../../src/constants';
import { AURA_CONTEXT } from '../../src/constants';

const AVATAR_NAMES: Record<AvatarId, string> = {
  casper: 'Casper',
  eli: 'Eli',
  olivia: 'Olivia',
  destiny: 'Destiny',
};

export default function HomeScreen() {
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const setAuraState = useAvatarStore((s) => s.setAuraState);
  const { name } = useProfileStore();
  const { card, hasDrawnToday, isLoading, draw } = useDailyDraw();
  const accent = avatarAccents[activeAvatar];

  const [revealed, setRevealed] = useState(false);
  const [drawing, setDrawing] = useState(false);

  // Ambient card shimmer
  const shimmerOpacity = useSharedValue(0.6);
  // Content fade in
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    shimmerOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      contentOpacity.value = withTiming(1, { duration: 600 });
    }
  }, [isLoading]);

  useEffect(() => {
    if (hasDrawnToday && card) {
      setRevealed(true);
    }
  }, [hasDrawnToday, card]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: shimmerOpacity.value,
  }));

  const greeting = name ? `Good to see you, ${name}.` : 'Good to see you.';

  const auraContext = drawing
  const [drawing, setDrawing] = useState(false);

  const auraContext: AuraContext | 'gathering' = drawing
    ? AURA_CONTEXT.GATHERING
    : card?.auraContext ?? AURA_CONTEXT.NEUTRAL;

  async function handleDraw() {
    setDrawing(true);
    await draw();
    setDrawing(false);
    setRevealed(true);
    // Drive the avatar's reaction once the card face is resolved (03.6) —
    // never fire this before the face has actually revealed.
    if (card) {
      setAuraState(card.auraContext);
    }
  }

  const greeting = name ? `Good to see you, ${name}.` : 'Good to see you.';

  return (
    <View style={styles.root}>
      {/* Background */}
      <View style={styles.bg} />

      {/* Accent atmosphere */}
      <Animated.View
        style={[styles.accentAtmosphere, { backgroundColor: accent.primary }, shimmerStyle]}
        pointerEvents="none"
      />

      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>{greeting}</Text>
            <View style={[styles.avatarChip, { borderColor: accent.primary }]}>
              <Text style={[styles.avatarChipText, { color: accent.primary }]}>
                {AVATAR_NAMES[activeAvatar]}
              </Text>
            </View>
          </View>

            {/* Avatar voice */}
            <Text style={styles.avatarVoice}>
              {revealed && card
                ? DRAWN_INTROS[activeAvatar]
                : DRAW_PROMPTS[activeAvatar]}
            </Text>

            {/* Avatar portrait — reacts once the card face resolves */}
            <View style={styles.avatarSection}>
              <AvatarPortrait
                avatarId={activeAvatar}
                presenceLevel={PRESENCE_LEVEL.PRESENCE}
                auraContext={auraContext}
                imageState={hasDrawnToday ? 'reflective' : 'neutral'}
              />
            </View>

            {/* Card area */}
            <View style={styles.cardArea}>
              {isLoading ? (
                <View style={styles.cardBack}>
                  <Animated.View
                    style={[styles.cardBackShimmer, { backgroundColor: accent.primary }, shimmerStyle]}
                  />
                </View>
              ) : revealed && card ? (
                <CardFace card={card} avatarId={activeAvatar} size="daily" />
              ) : (
                <Pressable
                  onPress={handleDraw}
                  style={({ pressed }) => [styles.cardBack, pressed && styles.cardBackPressed]}
                >
                  <Animated.View
                    style={[styles.cardBackShimmer, { backgroundColor: accent.primary }, shimmerStyle]}
                  />
                  <Text style={styles.drawHint}>Hold to draw</Text>
                </Pressable>
              )}
            </View>

            {/* Card interpretation — shown after draw */}
            {revealed && card && (
              <View style={styles.interpretation}>
                <Text style={styles.cardRoman}>
                  {toRoman(card.number)}
                </Text>
                <Text style={styles.cardName}>{card.name}</Text>
                <View style={[styles.interpretationDivider, { backgroundColor: accent.primary }]} />
                <Text style={styles.interpretationText}>
                  {interpretationPlaceholder[activeAvatar](card.name)}
                </Text>
                <Text style={styles.reflectionPrompt}>
                  What does this bring up for you?
                </Text>
              </View>
            )}

            {/* Draw again — only if already drawn and want to view a new card */}
            {revealed && (
              <View style={styles.footer}>
                <Text style={styles.footerNote}>
                  Your card for today. It stays in your codex.
                </Text>
              </View>
            )}

            {/* Draw CTA */}
            {!revealed && !isLoading && (
              <Pressable
                style={({ pressed }) => [styles.drawCta, pressed && { opacity: 0.7 }]}
                onPress={handleDraw}
              >
                <Text style={styles.drawCtaText}>Draw</Text>
              </Pressable>
            )}
          </Animated.View>
          <Text style={styles.worldLabel}>Threshold City</Text>

          <View style={styles.avatarSection}>
            <AvatarPortrait
              avatarId={activeAvatar}
              presenceLevel="presence"
              auraContext={auraContext}
              imageState={hasDrawnToday ? 'reflective' : 'neutral'}
            />
          </View>

          {!hasDrawnToday && !isLoading && (
            <View style={styles.idleSection}>
              <Text style={styles.prompt}>What needs your attention today?</Text>
              <TouchableOpacity
                style={styles.drawButton}
                onPress={handleDraw}
                activeOpacity={0.7}
              >
                <Text style={styles.drawButtonText}>Draw your card</Text>
              </TouchableOpacity>
            </View>
          )}

          {hasDrawnToday && card && (
            <View style={styles.cardSection}>
              <Text style={styles.positionLabel}>What needs attention</Text>
              <CardFace card={card} avatarId={activeAvatar} size="daily" />
              <View style={styles.interpretationWrap}>
                <Text style={styles.interpretationText}>
                  {interpretationPlaceholder[activeAvatar](card.name)}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.obsidian,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  greeting: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    flex: 1,
  },
  avatarChip: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
  },
  avatarChipText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.micro.fontSize,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  avatarVoice: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  cardBack: {
    width: 200,
    height: 300,
    backgroundColor: colors.bg.secondary,
    borderWidth: 1,
    borderColor: colors.bg.dusk,
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBackPressed: {
    borderColor: colors.mist,
  },
  cardBackShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.08,
  },
  drawHint: {
    fontFamily: fonts.terminal,
    fontSize: typeScale.micro.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 1,
  },
  interpretation: {
    marginBottom: 32,
  },
  cardRoman: {
    fontFamily: fonts.display,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.mist,
    letterSpacing: 2,
    marginBottom: 4,
  },
  cardName: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.displayL.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    marginBottom: 20,
  },
  interpretationDivider: {
    width: 24,
    height: 1,
    marginBottom: 20,
    opacity: 0.6,
  },
  interpretationText: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.primary,
    lineHeight: typeScale.bodyM.lineHeight,
    marginBottom: 24,
  },
  reflectionPrompt: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    lineHeight: typeScale.bodyS.lineHeight,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 8,
  },
  footerNote: {
    fontFamily: fonts.body,
    fontSize: typeScale.micro.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  drawCta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignSelf: 'center',
    marginTop: 8,
  },
  drawCtaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    color: colors.bone,
    letterSpacing: 2,
  worldLabel: {
    fontSize: 10,
    letterSpacing: 4,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 32,
  },
  avatarSection: {
    marginBottom: 40,
  },
  idleSection: {
    alignItems: 'center',
  },
  prompt: {
    fontSize: typeScale.bodyM.fontSize,
    lineHeight: typeScale.bodyM.lineHeight,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  drawButton: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 2,
  },
  drawButtonText: {
    fontSize: 12,
    letterSpacing: 3,
    color: colors.bone,
    textTransform: 'uppercase',
  },
  cardSection: {
    alignItems: 'center',
  },
  positionLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  interpretationWrap: {
    paddingHorizontal: 8,
    marginTop: 20,
  },
  interpretationText: {
    fontSize: typeScale.bodyM.fontSize,
    lineHeight: typeScale.bodyM.lineHeight,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
