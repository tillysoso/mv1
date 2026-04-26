import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Canvas, Path, Skia, BlurMask } from '@shopify/react-native-skia';
import { useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import Animated, {
  withRepeat, withSequence, withTiming, withDelay, Easing,
} from 'react-native-reanimated';
import { avatarAccents } from '../../theme/tokens';
import type { AvatarId } from '../../types/avatar';
import type { AuraContext, PortalShape } from '../../types/avatar';

interface AvatarAuraProps {
  avatarId: AvatarId;
  shape: PortalShape;
  auraContext: AuraContext | 'gathering';
  size?: number;
}

// Intensity targets per context (spec: neutral 0.4, gathering 0.7,
// breakthrough 0.8, shadow 0.3, recognition 0.6)
const INTENSITY: Record<string, number> = {
  neutral:     0.4,
  gathering:   0.7,
  breakthrough: 0.8,
  shadow:      0.3,
  recognition: 0.6,
};

function buildLivingCirclePath(cx: number, cy: number, r: number): ReturnType<typeof Skia.Path.Make> {
  // 270° arc — gap at bottom (90° to 360°)
  const path = Skia.Path.Make();
  path.addArc({ x: cx - r, y: cy - r, width: r * 2, height: r * 2 }, 100, 340);
  return path;
}

function buildArchPath(w: number, h: number, inset: number): ReturnType<typeof Skia.Path.Make> {
  // Two verticals meeting in a rounded bridge at top
  const path = Skia.Path.Make();
  const left = inset;
  const right = w - inset;
  const bottom = h;
  const archTop = h * 0.12;
  const midX = w / 2;
  path.moveTo(left, bottom);
  path.lineTo(left, archTop + (right - left) / 2);
  path.cubicTo(left, archTop, midX - 10, archTop * 0.4, midX, archTop * 0.35);
  path.cubicTo(midX + 10, archTop * 0.4, right, archTop, right, archTop + (right - left) / 2);
  path.lineTo(right, bottom);
  return path;
}

export default function AvatarAura({
  avatarId,
  shape,
  auraContext,
  size = 200,
}: AvatarAuraProps) {
  const accent = avatarAccents[avatarId];
  const targetIntensity = INTENSITY[auraContext] ?? 0.4;
  const strokeOpacity = useSharedValue(targetIntensity);
  const glowOpacity = useSharedValue(targetIntensity * 0.3);

  useEffect(() => {
    const base = INTENSITY[auraContext] ?? 0.4;

    if (auraContext === 'neutral' || auraContext === 'gathering') {
      // Slow ambient pulse
      strokeOpacity.value = withRepeat(
        withSequence(
          withTiming(base + 0.15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(base - 0.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming((base + 0.15) * 0.3, { duration: 1500 }),
          withTiming((base - 0.05) * 0.3, { duration: 1500 }),
        ),
        -1,
        false,
      );
    } else if (auraContext === 'breakthrough') {
      // Spike then settle
      strokeOpacity.value = withSequence(
        withTiming(0.95, { duration: 300 }),
        withTiming(base, { duration: 700 }),
      );
      glowOpacity.value = withSequence(
        withTiming(0.4, { duration: 300 }),
        withTiming(base * 0.3, { duration: 700 }),
      );
    } else if (auraContext === 'shadow') {
      strokeOpacity.value = withTiming(base, { duration: 800 });
      glowOpacity.value = withTiming(base * 0.3, { duration: 800 });
    } else if (auraContext === 'recognition') {
      // Hold still 500ms, single pulse outward, return
      strokeOpacity.value = withSequence(
        withDelay(500, withTiming(0.9, { duration: 400 })),
        withTiming(base, { duration: 600 }),
      );
      glowOpacity.value = withSequence(
        withDelay(500, withTiming(0.4, { duration: 400 })),
        withTiming(base * 0.3, { duration: 600 }),
      );
    }
  }, [auraContext]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;
  const inset = size * 0.12;

  const path = useMemo(
    () => shape === 'livingCircle'
      ? buildLivingCirclePath(cx, cy, r)
      : buildArchPath(size, size, inset),
    [shape, cx, cy, r, size, inset],
  );

  // Reanimated drives opacity — we use an Animated.View wrapper
  // since Skia's Paint alpha isn't directly driven by Reanimated shared values
  const animatedStrokeStyle = { opacity: strokeOpacity };
  const animatedGlowStyle   = { opacity: glowOpacity };

  return (
    <View style={{ width: size, height: size }}>
      {/* Outer glow layer */}
      <Animated.View style={[{ position: 'absolute', width: size, height: size }, animatedGlowStyle]}>
        <Canvas style={{ width: size, height: size }}>
          <Path
            path={path}
            color={accent.primary}
            style="stroke"
            strokeWidth={8}
          >
            <BlurMask blur={10} style="normal" />
          </Path>
        </Canvas>
      </Animated.View>

      {/* Main arc stroke */}
      <Animated.View style={[{ position: 'absolute', width: size, height: size }, animatedStrokeStyle]}>
        <Canvas style={{ width: size, height: size }}>
          <Path
            path={path}
            color={accent.primary}
            style="stroke"
            strokeWidth={2.5}
          />
        </Canvas>
      </Animated.View>
    </View>
  );
}
