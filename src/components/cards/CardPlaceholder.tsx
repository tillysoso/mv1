import { View, Text, StyleSheet } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { avatarAccents, colors } from '../../theme/tokens';
import { fonts } from '../../theme/typography';
import type { TarotCard } from '../../types/tarot';
import type { AvatarId } from '../../types/avatar';
import { toRoman } from '../../utils/roman';

const SIZES = {
  full:  { width: 240, height: 360 },
  daily: { width: 200, height: 300 },
  thumb: { width: 80,  height: 120 },
};

interface CardPlaceholderProps {
  card: TarotCard;
  avatarId: AvatarId;
  size: 'full' | 'daily' | 'thumb';
}

export default function CardPlaceholder({ card, avatarId, size }: CardPlaceholderProps) {
  const { width, height } = SIZES[size];
  const accent = avatarAccents[avatarId];
  const isThumb = size === 'thumb';

  return (
    <View style={[styles.outer, { width, height, borderColor: colors.ash }]}>
      {/* Gradient background via Skia */}
      <Canvas style={StyleSheet.absoluteFill}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={[accent.primary + '99', colors.charcoal, accent.secondary + '66']}
          />
        </Rect>
      </Canvas>

      {/* Inner signal border */}
      <View style={[styles.innerBorder, { borderColor: accent.secondary }]} />

      {/* Card content */}
      {!isThumb && (
        <View style={styles.content}>
          <Text style={[styles.roman, { color: accent.secondary }]}>
            {toRoman(card.number)}
          </Text>
          <Text style={[styles.name, { color: colors.bone }]} numberOfLines={2}>
            {card.name}
          </Text>
        </View>
      )}

      {/* Bottom accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accent.primary }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderWidth: 3,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1.5,
    borderRadius: 6,
    margin: 6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  roman: {
    fontFamily: fonts.display,
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 8,
    opacity: 0.7,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 18,
  },
  accentBar: {
    height: 3,
    width: '100%',
    opacity: 0.8,
  },
});
