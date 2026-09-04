import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { useProfileStore } from '../../src/stores/profileStore';
import { useDailyDraw } from '../../src/features/daily-draw/useDailyDraw';
import AvatarPortrait from '../../src/components/avatar/AvatarPortrait';
import CardFace from '../../src/components/cards/CardFace';
import { interpretationPlaceholder } from '../../src/features/reading/interpretationPlaceholder';
import { colors } from '../../src/theme/tokens';
import { typeScale } from '../../src/theme/typography';
import type { AuraContext } from '../../src/types';
import type { AvatarId } from '../../src/types/avatar';
import { AURA_CONTEXT, PRESENCE_LEVEL } from '../../src/constants';

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

  const [drawing, setDrawing] = useState(false);

  const auraContext: AuraContext | 'gathering' = drawing
    ? AURA_CONTEXT.GATHERING
    : card?.auraContext ?? AURA_CONTEXT.NEUTRAL;

  async function handleDraw() {
    setDrawing(true);
    await draw();
    setDrawing(false);
    // Drive the avatar's reaction once the card face is resolved (03.6) —
    // never fire this before the face has actually revealed. useDailyDraw's
    // `card` only updates on the next render after draw() resolves, so this
    // reads the freshly-set value via the store rather than a stale closure.
    const drawn = useProfileStore.getState().todaysCard;
    if (drawn) {
      setAuraState(drawn.auraContext);
    }
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.greeting}>
            {name ? `Good to see you, ${name}.` : 'Good to see you.'}
          </Text>
          <Text style={styles.worldLabel}>Threshold City</Text>

          <View style={styles.avatarSection}>
            <AvatarPortrait
              avatarId={activeAvatar}
              presenceLevel={PRESENCE_LEVEL.PRESENCE}
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
  greeting: {
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  worldLabel: {
    fontSize: 10,
    letterSpacing: 4,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
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
