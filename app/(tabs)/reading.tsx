import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { useProfileStore } from '../../src/stores/profileStore';
import CardFace from '../../src/components/cards/CardFace';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { MAJOR_ARCANA_CARDS } from '../../src/features/daily-draw/cardData';
import type { TarotCard } from '../../src/types/tarot';
import type { AvatarId } from '../../src/types/avatar';

type SpreadType = 'single' | 'three_card';
type ReadingState = 'spread_select' | 'shuffle' | 'selecting' | 'revealed';

const SPREAD_POSITIONS: Record<SpreadType, string[]> = {
  single: ['What needs attention'],
  three_card: ['Past', 'Present', 'Future'],
};

const AVATAR_NAMES: Record<AvatarId, string> = {
  casper: 'Casper', eli: 'Eli', olivia: 'Olivia', destiny: 'Destiny',
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const ROMAN: Record<number, string> = {
  0: '0', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII',
  8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII', 13: 'XIII',
  14: 'XIV', 15: 'XV', 16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX',
  20: 'XX', 21: 'XXI',
};

interface RevealedCard {
  card: TarotCard;
  position: string;
}

function FaceDownCard({
  onReveal,
  accent,
}: {
  onReveal: () => void;
  accent: { primary: string };
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withTiming(0.96, { duration: 150 });
      }}
      onPressOut={() => {
        scale.value = withSequence(
          withTiming(1.02, { duration: 100 }),
          withTiming(1, { duration: 150 }),
        );
      }}
      onPress={onReveal}
    >
      <Animated.View style={[styles.cardBack, animStyle]}>
        <View style={[styles.cardBackInner, { borderColor: accent.primary + '40' }]} />
        <Text style={styles.cardBackHint}>Tap to reveal</Text>
      </Animated.View>
    </Pressable>
  );
}

function RevealedCardView({
  revealed,
  avatarId,
  accent,
}: {
  revealed: RevealedCard;
  avatarId: AvatarId;
  accent: { primary: string };
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  // Animate in
  useState(() => {
    opacity.value = withDelay(50, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(50, withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) }));
  });

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Text style={styles.positionLabel}>{revealed.position}</Text>
      <CardFace card={revealed.card} avatarId={avatarId} size="daily" />
      <View style={styles.cardMeta}>
        <Text style={styles.cardRoman}>{ROMAN[revealed.card.number] ?? revealed.card.number}</Text>
        <Text style={styles.cardName}>{revealed.card.name}</Text>
        <View style={[styles.interpretationBar, { backgroundColor: accent.primary }]} />
        <Text style={styles.interpretationLine}>
          {AVATAR_NAMES[avatarId]} sees {revealed.card.name} here.
        </Text>
      </View>
    </Animated.View>
  );
}

export default function ReadingScreen() {
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const { birthCards } = useProfileStore();
  const accent = avatarAccents[activeAvatar];

  const [spreadType, setSpreadType] = useState<SpreadType>('single');
  const [readingState, setReadingState] = useState<ReadingState>('spread_select');
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [revealedCards, setRevealedCards] = useState<RevealedCard[]>([]);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  const positions = SPREAD_POSITIONS[spreadType];
  const allRevealed = revealedCards.length === positions.length;

  function startShuffle() {
    // Pick cards without repeats
    const indices = new Set<number>();
    const cards: TarotCard[] = [];
    while (cards.length < positions.length) {
      const idx = Math.floor(Math.random() * MAJOR_ARCANA_CARDS.length);
      if (!indices.has(idx)) {
        indices.add(idx);
        let picked = MAJOR_ARCANA_CARDS[idx];
        // Recognition override for profile cards
        if (birthCards) {
          const isProfile =
            picked.number === birthCards.personalityCard.number ||
            picked.number === birthCards.soulCard.number;
          if (isProfile) picked = { ...picked, auraContext: 'recognition' };
        }
        cards.push(picked);
      }
    }
    setDrawnCards(cards);
    setRevealedCards([]);
    setUsedIndices(indices);
    setReadingState('shuffle');
  }

  function revealCard(index: number) {
    const card = drawnCards[index];
    if (!card) return;
    const position = positions[index];
    setRevealedCards((prev) => [...prev, { card, position }]);
    if (revealedCards.length + 1 === positions.length) {
      setReadingState('revealed');
    } else {
      setReadingState('selecting');
    }
  }

  function reset() {
    setReadingState('spread_select');
    setDrawnCards([]);
    setRevealedCards([]);
    setUsedIndices(new Set());
  }

  return (
    <View style={styles.root}>
      <View style={styles.atmosphereBg} />
      <Animated.View
        style={[styles.accentAtmosphere, { backgroundColor: accent.primary }]}
        pointerEvents="none"
      />

      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Reading</Text>
            {readingState !== 'spread_select' && (
              <Pressable onPress={reset} style={styles.resetBtn}>
                <Text style={styles.resetText}>End</Text>
              </Pressable>
            )}
          </View>

          {/* Spread selection */}
          {readingState === 'spread_select' && (
            <View style={styles.spreadSelect}>
              <Text style={styles.sectionLabel}>Choose your spread</Text>

              <Pressable
                style={[
                  styles.spreadOption,
                  spreadType === 'single' && { borderColor: accent.primary },
                ]}
                onPress={() => setSpreadType('single')}
              >
                <Text style={[styles.spreadOptionTitle, spreadType === 'single' && { color: accent.primary }]}>
                  Single Card
                </Text>
                <Text style={styles.spreadOptionSub}>What needs attention</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.spreadOption,
                  spreadType === 'three_card' && { borderColor: accent.primary },
                ]}
                onPress={() => setSpreadType('three_card')}
              >
                <Text style={[styles.spreadOptionTitle, spreadType === 'three_card' && { color: accent.primary }]}>
                  Three Cards
                </Text>
                <Text style={styles.spreadOptionSub}>Past · Present · Future</Text>
              </Pressable>

              <Pressable
                style={[styles.primaryCta, { borderColor: accent.secondary }]}
                onPress={startShuffle}
              >
                <Text style={[styles.primaryCtaText, { color: accent.secondary }]}>Begin</Text>
              </Pressable>
            </View>
          )}

          {/* Shuffle / selecting state — face-down cards */}
          {(readingState === 'shuffle' || readingState === 'selecting') && (
            <View style={styles.spreadArea}>
              <Text style={styles.sectionLabel}>
                {readingState === 'shuffle'
                  ? 'The spread is laid. Choose your first card.'
                  : `${revealedCards.length} of ${positions.length} revealed.`}
              </Text>

              <View style={[styles.cardRow, spreadType === 'three_card' && styles.cardRowThree]}>
                {positions.map((pos, i) => {
                  const isRevealed = i < revealedCards.length;
                  if (isRevealed) {
                    return (
                      <View key={i} style={styles.cardSlot}>
                        <Text style={styles.positionLabelSmall}>{pos}</Text>
                        <CardFace
                          card={revealedCards[i].card}
                          avatarId={activeAvatar}
                          size={spreadType === 'three_card' ? 'thumb' : 'daily'}
                        />
                      </View>
                    );
                  }
                  // Only allow revealing next unrevealed card in order
                  const isNext = i === revealedCards.length;
                  return (
                    <View key={i} style={styles.cardSlot}>
                      <Text style={styles.positionLabelSmall}>{pos}</Text>
                      {isNext ? (
                        <FaceDownCard onReveal={() => revealCard(i)} accent={accent} />
                      ) : (
                        <View style={[styles.cardBack, styles.cardBackDisabled]} />
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Full interpretation — all cards revealed */}
          {readingState === 'revealed' && (
            <View style={styles.interpretationArea}>
              <Text style={styles.sectionLabel}>Your reading</Text>

              {revealedCards.map((rev, i) => (
                <View key={i} style={i > 0 ? styles.cardBlock : undefined}>
                  <RevealedCardView
                    revealed={rev}
                    avatarId={activeAvatar}
                    accent={accent}
                  />
                </View>
              ))}

              {/* Reflection prompt */}
              <View style={styles.reflectionBlock}>
                <View style={[styles.reflectionBorder, { backgroundColor: accent.primary }]} />
                <Text style={styles.reflectionPrompt}>
                  What does this bring up for you?
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [styles.secondaryCta, pressed && { opacity: 0.7 }]}
                onPress={reset}
              >
                <Text style={styles.secondaryCtaText}>New reading</Text>
              </Pressable>
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
  atmosphereBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.primary,
  },
  accentAtmosphere: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    opacity: 0.05,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 48,
    marginBottom: 32,
  },
  screenTitle: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 2,
  },
  resetBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.ash,
  },
  resetText: {
    fontFamily: fonts.terminal,
    fontSize: typeScale.micro.fontSize,
    color: colors.mist,
    letterSpacing: 1,
  },
  sectionLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.micro.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  // Spread select
  spreadSelect: {
    paddingHorizontal: 32,
    gap: 12,
  },
  spreadOption: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  spreadOptionTitle: {
    fontFamily: fonts.display,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.bone,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  spreadOptionSub: {
    fontFamily: fonts.terminal,
    fontSize: typeScale.micro.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
  },
  primaryCta: {
    borderWidth: 1,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryCtaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    letterSpacing: 2,
  },
  // Card spread
  spreadArea: {
    paddingHorizontal: 32,
  },
  cardRow: {
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
  },
  cardRowThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardSlot: {
    alignItems: 'center',
    gap: 8,
  },
  positionLabelSmall: {
    fontFamily: fonts.terminal,
    fontSize: 10,
    color: colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardBack: {
    width: 200,
    height: 300,
    backgroundColor: colors.bg.secondary,
    borderWidth: 1,
    borderColor: colors.bg.dusk,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardBackDisabled: {
    opacity: 0.4,
    width: 80,
    height: 120,
  },
  cardBackInner: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderWidth: 1,
    borderRadius: 4,
  },
  cardBackHint: {
    fontFamily: fonts.terminal,
    fontSize: 10,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
  },
  // Interpretation
  interpretationArea: {
    paddingHorizontal: 32,
  },
  cardBlock: {
    marginTop: 40,
  },
  positionLabel: {
    fontFamily: fonts.terminal,
    fontSize: 11,
    color: colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  cardMeta: {
    marginTop: 16,
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
    fontSize: typeScale.displayM.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    marginBottom: 16,
  },
  interpretationBar: {
    width: 20,
    height: 1,
    marginBottom: 16,
    opacity: 0.7,
  },
  interpretationLine: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.primary,
    lineHeight: typeScale.bodyM.lineHeight,
  },
  reflectionBlock: {
    marginTop: 48,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  reflectionBorder: {
    width: 2,
    minHeight: 48,
    opacity: 0.5,
    marginTop: 4,
  },
  reflectionPrompt: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    fontStyle: 'italic',
    flex: 1,
  },
  secondaryCta: {
    marginTop: 40,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.ash,
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
  },
  secondaryCtaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: typeScale.label.fontSize,
    color: colors.bone,
    letterSpacing: 2,
  },
});
