import { TouchableOpacity, View } from 'react-native';
import { Canvas, Path, Skia, LinearGradient, Rect, vec, Circle, BlurMask } from '@shopify/react-native-skia';
import { colors } from '../../theme/tokens';

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

  const arc1 = buildArcPath(cx, cy, r1);
  const arc2 = buildArcPath(cx, cy, r2);

  const card = (
    <View style={{ width, height, borderWidth: 2, borderColor: colors.ash, borderRadius: 8, overflow: 'hidden' }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width, height }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={[colors.bg.secondary, colors.obsidian, colors.bg.tertiary + '55']}
          />
        </Rect>
        <Path path={arc2} color={colors.signal + '50'} style="stroke" strokeWidth={1} />
        <Path path={arc1} color={colors.signal + '35'} style="stroke" strokeWidth={1.5}>
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
