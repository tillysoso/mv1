import { useEffect, useMemo } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { avatarAccents } from '../../theme/tokens';
import type { AvatarId, PortalShape } from '../../types/avatar';
import type { AuraContext } from '../../types/tarot';
import { AURA_CONTEXT, PORTAL_SHAPE } from '../../constants';

// Conditionally import Skia — only loaded on native where WASM is not needed
let Canvas: any, Path: any, Skia: any, BlurMask: any;
if (Platform.OS !== 'web') {
  const skia = require('@shopify/react-native-skia');
  Canvas = skia.Canvas;
  Path = skia.Path;
  Skia = skia.Skia;
  BlurMask = skia.BlurMask;
}

interface AvatarAuraProps {
  avatarId: AvatarId;
  shape: PortalShape;
  auraContext: AuraContext | 'gathering';
  size?: number;
}

const INTENSITY: Record<string, number> = {
  [AURA_CONTEXT.NEUTRAL]:      0.4,
  [AURA_CONTEXT.GATHERING]:    0.7,
  [AURA_CONTEXT.BREAKTHROUGH]: 0.8,
  [AURA_CONTEXT.SHADOW]:       0.3,
  [AURA_CONTEXT.RECOGNITION]:  0.6,
};

// Breathing amplitude per spec 03.3 — breakthrough breathes outward (largest
// swing), shadow contracts inward (smaller swing), neutral is barely perceptible.
const BREATH_DELTA: Record<string, number> = {
  [AURA_CONTEXT.BREAKTHROUGH]: 0.15,
  [AURA_CONTEXT.SHADOW]:       0.08,
  [AURA_CONTEXT.NEUTRAL]:      0.04,
  [AURA_CONTEXT.GATHERING]:    0.1,
};

function buildLivingCirclePath(cx: number, cy: number, r: number) {
  const path = Skia.Path.Make();
  path.addArc({ x: cx - r, y: cy - r, width: r * 2, height: r * 2 }, 100, 340);
  return path;
}

function buildArchPath(w: number, h: number, inset: number) {
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
  const base = INTENSITY[auraContext] ?? 0.4;
  const strokeOpacity = useSharedValue(base);
  const glowOpacity = useSharedValue(base * 0.3);

  useEffect(() => {
    const b = INTENSITY[auraContext] ?? 0.4;

    if (auraContext === AURA_CONTEXT.RECOGNITION) {
      // One-shot rise, then settle into the recognition hold level — no repeat.
      strokeOpacity.value = withSequence(
        withDelay(500, withTiming(0.9, { duration: 400, easing: Easing.out(Easing.ease) })),
        withTiming(b, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      );
      glowOpacity.value = withSequence(
        withDelay(500, withTiming(0.4, { duration: 400, easing: Easing.out(Easing.ease) })),
        withTiming(b * 0.3, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      );
      return;
    }

    // Build to the resting level first (ease-out), then breathe around it
    // at the 4s period shared with the card's own breathing pulse (03.3).
    const delta = BREATH_DELTA[auraContext] ?? 0.04;
    strokeOpacity.value = withSequence(
      withTiming(b, { duration: 600, easing: Easing.out(Easing.ease) }),
      withRepeat(
        withSequence(
          withTiming(b + delta, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
          withTiming(b - delta * 0.3, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );
    glowOpacity.value = withSequence(
      withTiming(b * 0.3, { duration: 600, easing: Easing.out(Easing.ease) }),
      withRepeat(
        withSequence(
          withTiming((b + delta) * 0.3, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
          withTiming((b - delta * 0.3) * 0.3, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );
  }, [auraContext]);

  // Web fallback: animated border circle/arc — no Skia WASM needed
  if (Platform.OS === 'web') {
    const r = size * 0.44;
    const isCircle = shape === PORTAL_SHAPE.LIVING_CIRCLE;
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{
          position: 'absolute',
          width: isCircle ? r * 2 : size * 0.76,
          height: isCircle ? r * 2 : size * 0.88,
          borderRadius: isCircle ? r : size * 0.38,
          borderWidth: 8,
          borderColor: accent.primary,
          opacity: glowOpacity,
          // @ts-ignore — web-only shadow for glow effect
          boxShadow: `0 0 12px 4px ${accent.primary}`,
        }} />
        <Animated.View style={{
          position: 'absolute',
          width: isCircle ? r * 2 : size * 0.76,
          height: isCircle ? r * 2 : size * 0.88,
          borderRadius: isCircle ? r : size * 0.38,
          borderWidth: 2,
          borderColor: accent.primary,
          opacity: strokeOpacity,
        }} />
      </View>
    );
  }

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;
  const inset = size * 0.12;

  const path = useMemo(
    () => shape === PORTAL_SHAPE.LIVING_CIRCLE
      ? buildLivingCirclePath(cx, cy, r)
      : buildArchPath(size, size, inset),
    [shape, cx, cy, r, size, inset],
  );

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[{ position: 'absolute', width: size, height: size }, { opacity: glowOpacity }]}>
        <Canvas style={{ width: size, height: size }}>
          <Path path={path} color={accent.primary} style="stroke" strokeWidth={8}>
            <BlurMask blur={10} style="normal" />
          </Path>
        </Canvas>
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', width: size, height: size }, { opacity: strokeOpacity }]}>
        <Canvas style={{ width: size, height: size }}>
          <Path path={path} color={accent.primary} style="stroke" strokeWidth={2.5} />
        </Canvas>
      </Animated.View>
    </View>
  );
}
