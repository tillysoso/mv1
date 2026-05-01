import { TouchableOpacity, View, Platform } from 'react-native';
import { colors } from '../../theme/tokens';

// Conditionally import Skia — only on native
let Canvas: any, Path: any, Skia: any, LinearGradient: any, Rect: any, vec: any, Circle: any, BlurMask: any;
if (Platform.OS !== 'web') {
  const skia = require('@shopify/react-native-skia');
  Canvas = skia.Canvas;
  Path = skia.Path;
  Skia = skia.Skia;
  LinearGradient = skia.LinearGradient;
  Rect = skia.Rect;
  vec = skia.vec;
  Circle = skia.Circle;
  BlurMask = skia.BlurMask;
}

const SIZES = {
  full:  { width: 240, height: 360 },
  daily: { width: 200, height: 300 },
  thumb: { width: 80,  height: 120 },
};

interface CardBackProps {
  size: 'full' | 'daily' | 'thumb';
  onPress?: () => void;
}

function buildArcPath(cx: number, cy: number, r: number) {
  const path = Skia.Path.Make();
  path.addArc({ x: cx - r, y: cy - r, width: r * 2, height: r * 2 }, 100, 340);
  return path;
}

export default function CardBack({ size, onPress }: CardBackProps) {
  const { width, height } = SIZES[size];
  const cx = width / 2;
  const cy = height / 2;
  const r1 = Math.min(width, height) * 0.28;
  const r2 = Math.min(width, height) * 0.38;

  const card = Platform.OS === 'web' ? (
    // Web fallback: plain Views, no Skia
    <View style={{
      width, height,
      borderWidth: 2, borderColor: colors.ash, borderRadius: 8,
      backgroundColor: colors.bg.secondary,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <View style={{
        width: r2 * 2, height: r2 * 2,
        borderRadius: r2,
        borderWidth: 1, borderColor: colors.signal + '50',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <View style={{
          width: r1 * 2, height: r1 * 2,
          borderRadius: r1,
          borderWidth: 1.5, borderColor: colors.signal + '35',
        }} />
      </View>
      <View style={{
        position: 'absolute', top: 8, left: 8, right: 8, bottom: 8,
        borderWidth: 1, borderColor: colors.signal + '30', borderRadius: 4,
      }} />
    </View>
  ) : (
    // Native: full Skia rendering
    <View style={{ width, height, borderWidth: 2, borderColor: colors.ash, borderRadius: 8, overflow: 'hidden' }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width, height }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={[colors.bg.secondary, colors.obsidian, colors.bg.tertiary + '55']}
          />
        </Rect>
        <Path path={buildArcPath(cx, cy, r2)} color={colors.signal + '50'} style="stroke" strokeWidth={1} />
        <Path path={buildArcPath(cx, cy, r1)} color={colors.signal + '35'} style="stroke" strokeWidth={1.5}>
          <BlurMask blur={4} style="normal" />
        </Path>
        <Circle cx={cx} cy={cy} r={5} color={colors.majestic + '55'} />
      </Canvas>
      <View style={{
        position: 'absolute', top: 8, left: 8, right: 8, bottom: 8,
        borderWidth: 1, borderColor: colors.signal + '30', borderRadius: 4,
      }} />
    </View>
  );

  if (!onPress) return card;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
      {card}
    </TouchableOpacity>
  );
}
