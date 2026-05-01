import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { useProfileStore } from '../../src/stores/profileStore';
import AvatarPortrait from '../../src/components/avatar/AvatarPortrait';
import CardFace from '../../src/components/cards/CardFace';
import CardBack from '../../src/components/cards/CardBack';
import { interpretationPlaceholder } from '../../src/features/reading/interpretationPlaceholder';
import { MAJOR_ARCANA_CARDS } from '../../src/features/daily-draw/cardData';
import { colors } from '../../src/theme/tokens';
import { typeScale } from '../../src/theme/typography';
import type { TarotCard, AuraContext, AvatarPresenceLevel } from '../../src/types';
import { SPREAD_TYPE, PRESENCE_LEVEL, AURA_CONTEXT, AVATAR_STATE } from '../../src/constants';

type SpreadType = 'single' | 'three_card';
type ReadingPhase = 'select' | 'shuffle';

const POSITIONS: Record<SpreadType, string[]> = {
  [SPREAD_TYPE.SINGLE]:     ['What needs attention'],
  [SPREAD_TYPE.THREE_CARD]: ['Past', 'Present', 'Future'],
};

function pickCards(count: number, profileNumbers: number[]): TarotCard[] {
  const shuffled = [...MAJOR_ARCANA_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(card => {
    if (profileNumbers.includes(card.number)) {
      return { ...card, auraContext: AURA_CONTEXT.RECOGNITION as AuraContext };
    }
    return card;
  });
}

export default function ReadingScreen() {
  const { activeAvatar } = useAvatarStore();
  const { birthCards } = useProfileStore();
  const profileNumbers = birthCards
    ? [birthCards.personalityCard.number, birthCards.soulCard.number]
    : [];

  const [phase, setPhase] = useState<ReadingPhase>('select');
  const [spreadType, setSpreadType] = useState<SpreadType>(SPREAD_TYPE.SINGLE);
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);

  function startReading(type: SpreadType) {
    const count = type === SPREAD_TYPE.SINGLE ? 1 : 3;
    const picked = pickCards(count, profileNumbers);
    setSpreadType(type);
    setCards(picked);
    setRevealed(new Array(count).fill(false));
    setPhase('shuffle');
  }

  function revealCard(index: number) {
    setRevealed(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  function reset() {
    setPhase('select');
    setCards([]);
    setRevealed([]);
  }

  const revealedCount = revealed.filter(r => r).length;
  const allRevealed = revealed.length > 0 && revealed.every(r => r);

  // Avatar presence: hero during shuffle, signal after first reveal
  const avatarPresence: AvatarPresenceLevel = revealedCount === 0 ? PRESENCE_LEVEL.HERO : PRESENCE_LEVEL.SIGNAL;

  // Aura: gathering before any reveal, then last-revealed card's context
  let currentAuraContext: AuraContext | 'gathering' = AURA_CONTEXT.GATHERING;
  if (revealedCount > 0) {
    for (let i = cards.length - 1; i >= 0; i--) {
      if (revealed[i]) {
        currentAuraContext = cards[i].auraContext;
        break;
      }
    }
  }

  if (phase === 'select') {
    return (
      <View style={styles.root}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.selectScreen}>
            <Text style={styles.screenLabel}>Reading</Text>
            <Text style={styles.selectHeadline}>Choose your spread</Text>

            <TouchableOpacity
              style={styles.spreadOption}
              onPress={() => startReading(SPREAD_TYPE.SINGLE)}
              activeOpacity={0.75}
            >
              <Text style={styles.spreadTitle}>Single Card</Text>
              <Text style={styles.spreadDesc}>What needs attention</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.spreadOption}
              onPress={() => startReading(SPREAD_TYPE.THREE_CARD)}
              activeOpacity={0.75}
            >
              <Text style={styles.spreadTitle}>Three Card</Text>
              <Text style={styles.spreadDesc}>Past · Present · Future</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const positions = POSITIONS[spreadType];

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar — hero with arch and gathering aura during shuffle; signal after first reveal */}
          <View style={styles.avatarSection}>
            <AvatarPortrait
              avatarId={activeAvatar}
              presenceLevel={avatarPresence}
              auraContext={currentAuraContext}
              imageState={revealedCount > 0 ? AVATAR_STATE.REFLECTIVE : AVATAR_STATE.NEUTRAL}
            />
          </View>

          {/* Card slots — one per spread position */}
          {cards.map((card, index) => (
            <View key={index} style={styles.cardSlot}>
              <Text style={styles.positionLabel}>{positions[index]}</Text>

              {revealed[index] ? (
                <View style={styles.revealedSlot}>
                  <CardFace card={card} avatarId={activeAvatar} size="full" />
                  <Text style={styles.interpretation}>
                    {interpretationPlaceholder[activeAvatar](card.name)}
                  </Text>
                </View>
              ) : (
                <View style={styles.faceDownSlot}>
                  <CardBack size="daily" onPress={() => revealCard(index)} />
                  <Text style={styles.tapHint}>tap to reveal</Text>
                </View>
              )}
            </View>
          ))}

          {/* Reflection prompt — appears after all cards are revealed */}
          {allRevealed && (
            <View style={styles.reflectionSection}>
              <View style={styles.reflectionDivider} />
              <Text style={styles.reflectionPrompt}>
                What does this bring up for you?
              </Text>
              <View style={styles.reflectionInput}>
                <Text style={styles.reflectionPlaceholder}>Reflect here...</Text>
              </View>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={reset}
                activeOpacity={0.7}
              >
                <Text style={styles.resetButtonText}>New reading</Text>
              </TouchableOpacity>
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
    backgroundColor: colors.bg.primary,
  },
  safe: {
    flex: 1,
  },

  // ─── Select screen ────────────────────────────────────────────────────────────
  selectScreen: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 40,
  },
  screenLabel: {
    fontSize: 10,
    letterSpacing: 4,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  selectHeadline: {
    fontSize: typeScale.displayS.fontSize,
    letterSpacing: typeScale.displayS.letterSpacing,
    color: colors.bone,
    marginBottom: 32,
  },
  spreadOption: {
    borderWidth: 1,
    borderColor: colors.ash,
    padding: 24,
    borderRadius: 2,
    marginBottom: 16,
  },
  spreadTitle: {
    fontSize: 14,
    letterSpacing: 2,
    color: colors.bone,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  spreadDesc: {
    fontSize: 13,
    color: colors.text.secondary,
    letterSpacing: 0.5,
  },

  // ─── Reading screen ───────────────────────────────────────────────────────────
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  avatarSection: {
    marginBottom: 40,
  },
  cardSlot: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  positionLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  faceDownSlot: {
    alignItems: 'center',
  },
  tapHint: {
    fontSize: 10,
    letterSpacing: 2,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginTop: 12,
  },
  revealedSlot: {
    alignItems: 'center',
  },
  interpretation: {
    fontSize: typeScale.bodyM.fontSize,
    lineHeight: typeScale.bodyM.lineHeight,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 300,
    marginTop: 20,
  },

  // ─── Reflection ───────────────────────────────────────────────────────────────
  reflectionSection: {
    alignItems: 'center',
    width: '100%',
  },
  reflectionDivider: {
    width: 40,
    height: 1,
    backgroundColor: colors.ash,
    marginBottom: 24,
  },
  reflectionPrompt: {
    fontSize: typeScale.displayS.fontSize,
    letterSpacing: 1,
    color: colors.bone,
    textAlign: 'center',
    marginBottom: 20,
  },
  reflectionInput: {
    width: '100%',
    minHeight: 100,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 2,
    padding: 16,
    marginBottom: 24,
  },
  reflectionPlaceholder: {
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 2,
  },
  resetButtonText: {
    fontSize: 11,
    letterSpacing: 3,
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
});
