import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Canvas, Path, Skia, BlurMask } from '@shopify/react-native-skia';
import { useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { useEffect } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
  withRepeat, withSequence, withTiming, withDelay, Easing,
  useSharedValue,
} from 'react-native-reanimated';
import { avatarAccents } from '../../theme/tokens';
import type { AvatarId, AuraContext, PortalShape } from '../../types';
import { AURA_CONTEXT, PORTAL_SHAPE } from '../../constants';
import type { AvatarId, PortalShape } from '../../types/avatar';
import type { AuraContext } from '../../types/tarot';

// Conditionally import Skia — only loaded on native where WASM is not needed
let Canvas: any, Path: any, Skia: any, BlurMask: any;
if (Platform.OS !== 'web') {
  const skia = require('@shopify/react-native-skia');
  Canvas = skia.Canvas;
  Path = skia.Path;
  Skia = skia.Skia;
  BlurMask = skia.BlurMask;
}

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
    if (auraContext === AURA_CONTEXT.NEUTRAL || auraContext === AURA_CONTEXT.GATHERING) {
      strokeOpacity.value = withRepeat(
        withSequence(
          withTiming(b + 0.15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(b - 0.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming((b + 0.15) * 0.3, { duration: 1500 }),
          withTiming((b - 0.05) * 0.3, { duration: 1500 }),
        ),
        -1,
        false,
      );
    } else if (auraContext === AURA_CONTEXT.BREAKTHROUGH) {
      strokeOpacity.value = withSequence(withTiming(0.95, { duration: 300 }), withTiming(b, { duration: 700 }));
      glowOpacity.value = withSequence(withTiming(0.4, { duration: 300 }), withTiming(b * 0.3, { duration: 700 }));
    } else if (auraContext === AURA_CONTEXT.SHADOW) {
      strokeOpacity.value = withTiming(b, { duration: 800 });
      glowOpacity.value = withTiming(b * 0.3, { duration: 800 });
    } else if (auraContext === AURA_CONTEXT.RECOGNITION) {
      strokeOpacity.value = withSequence(
        withDelay(500, withTiming(0.9, { duration: 400 })),
        withTiming(b, { duration: 600 }),
      );
      glowOpacity.value = withSequence(
        withDelay(500, withTiming(0.4, { duration: 400 })),
        withTiming(b * 0.3, { duration: 600 }),
      );
    }
  }, [auraContext]);

  // Web fallback: animated border circle/arc — no Skia WASM needed
  if (Platform.OS === 'web') {
    const r = size * 0.44;
    const isCircle = shape === PORTAL_SHAPE.LIVING_CIRCLE;
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        {/* Glow ring */}
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
        {/* Main arc border */}
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

  const path = shape === PORTAL_SHAPE.LIVING_CIRCLE
    ? buildLivingCirclePath(cx, cy, r)
    : buildArchPath(size, size, inset);
  const path = useMemo(
    () => shape === 'livingCircle'
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
