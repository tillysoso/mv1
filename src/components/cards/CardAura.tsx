import { useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  type SharedValue,
} from 'react-native-reanimated';
import { useAvatarStore } from '../../stores/avatarStore';
import type { AvatarId } from '../../types/avatar';
import type { AuraContext } from '../../types/tarot';
import { AURA_CONTEXT } from '../../constants';

// Conditionally import Skia — only loaded on native where WASM is not needed
let Canvas: any, Circle: any, RadialGradient: any, vec: any, BlurMask: any, useDerivedValue: any;
if (Platform.OS !== 'web') {
  const skia = require('@shopify/react-native-skia');
  Canvas = skia.Canvas;
  Circle = skia.Circle;
  RadialGradient = skia.RadialGradient;
  vec = skia.vec;
  BlurMask = skia.BlurMask;
  useDerivedValue = skia.useDerivedValue;
}

// Spec 03.2 — base glow per card aura category.
const BASE_GLOW: Record<Exclude<AuraContext, 'recognition'>, { color: string; opacity: number; radius: number }> = {
  breakthrough: { color: '#D4A843', opacity: 0.35, radius: 48 },
  shadow:       { color: '#5B4E8C', opacity: 0.30, radius: 32 },
  neutral:      { color: '#3A3A4A', opacity: 0.20, radius: 24 },
};

// Spec 03.2 — pulse highlight (avatar accent layer, sits above base glow).
// Single-colour breakthrough entries (Eli, Destiny) don't carry an explicit
// opacity in the spec — 0.3 is used to match the gradient avatars' visual weight.
const PULSE_HIGHLIGHT: Record<AvatarId, Record<Exclude<AuraContext, 'recognition'>, { colors: string[]; opacity: number }>> = {
  casper: {
    breakthrough: { colors: ['#C94B2C', '#D4A843'], opacity: 0.35 },
    shadow:       { colors: ['#C94B2C', '#C94B2C'], opacity: 0.15 },
    neutral:      { colors: ['#C94B2C', '#C94B2C'], opacity: 0.08 },
  },
  eli: {
    breakthrough: { colors: ['#6ECFCF', '#6ECFCF'], opacity: 0.30 },
    shadow:       { colors: ['#A8B4C8', '#A8B4C8'], opacity: 0.15 },
    neutral:      { colors: ['#A8B4C8', '#A8B4C8'], opacity: 0.08 },
  },
  olivia: {
    breakthrough: { colors: ['#C49A4A', '#A8C87A'], opacity: 0.35 },
    shadow:       { colors: ['#5C6B3A', '#5C6B3A'], opacity: 0.20 },
    neutral:      { colors: ['#5C6B3A', '#5C6B3A'], opacity: 0.10 },
  },
  destiny: {
    breakthrough: { colors: ['#4DBFCC', '#4DBFCC'], opacity: 0.30 },
    shadow:       { colors: ['#2A7B8C', '#2A7B8C'], opacity: 0.20 },
    neutral:      { colors: ['#2A7B8C', '#2A7B8C'], opacity: 0.10 },
  },
};

// Spec 03.3 — breathing amplitude + direction. Shadow contracts inward
// (negative-leaning swing), breakthrough expands outward, neutral is minimal.
const BREATH_PX: Record<Exclude<AuraContext, 'recognition'>, number> = {
  breakthrough: 8,
  shadow: 4,
  neutral: 2,
};

const RECOGNITION_COLOR = '#9500FF';
const BUILD_DURATION = 600;
const BREATH_PERIOD = 4000; // shared with the card's own breathing pulse — same 4s clock

export type CardAuraSurface = 'full' | 'ambient';

interface CardAuraProps {
  /** Card's own category — pass the underlying card's auraContext, not 'recognition'. */
  auraContext: Exclude<AuraContext, 'recognition'>;
  avatarId: AvatarId;
  /** True if this card matches profileStore's personalityCard/soulCard. */
  isRecognition?: boolean;
  /**
   * 'full' = reading/daily-draw reveal: full glow + breathing pulse.
   * 'ambient' = codex detail: 50% intensity, static, no pulse, no recognition ring.
   */
  surface?: CardAuraSurface;
  /** Scales overall intensity — e.g. onboarding soul card renders at 0.6. */
  intensityScale?: number;
  /**
   * Card face is resolved and the aura should build in. Until #107 (card flip)
   * exposes real phase hooks, callers should flip this true at the moment the
   * card is considered "revealed" — this is the mocked attachment point for
   * the eventual Phase 2/Phase 3 flip callbacks.
   */
  active: boolean;
  width: number;
  height: number;
}

export default function CardAura({
  auraContext,
  avatarId,
  isRecognition = false,
  surface = 'full',
  intensityScale = 1,
  active,
  width,
  height,
}: CardAuraProps) {
  const setAuraState = useAvatarStore((s) => s.setAuraState);
  const recognitionFired = useRef(false);

  const buildProgress = useSharedValue(surface === 'ambient' ? 1 : 0);
  const breathPhase = useSharedValue(0); // -1..1, drives radius/opacity oscillation
  const recognitionRadius = useSharedValue(0);
  const recognitionOpacity = useSharedValue(0);

  useEffect(() => {
    if (!active || surface === 'ambient') return;

    buildProgress.value = withTiming(1, { duration: BUILD_DURATION, easing: Easing.out(Easing.ease) });

    breathPhase.value = withDelay(
      BUILD_DURATION,
      withRepeat(
        withSequence(
          withTiming(1, { duration: BREATH_PERIOD / 2, easing: Easing.inOut(Easing.sin) }),
          withTiming(-1, { duration: BREATH_PERIOD / 2, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );

    // Avatar reacts only once the face has resolved — never anticipatory (03.6).
    setAuraState(isRecognition ? AURA_CONTEXT.RECOGNITION : auraContext);

    if (isRecognition && !recognitionFired.current) {
      recognitionFired.current = true;
      recognitionRadius.value = withDelay(
        BUILD_DURATION + 200,
        withTiming(80, { duration: 1200, easing: Easing.out(Easing.ease) }),
      );
      recognitionOpacity.value = withDelay(
        BUILD_DURATION + 200,
        withSequence(
          withTiming(0.4, { duration: 1200, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 600, easing: Easing.in(Easing.ease) }),
        ),
      );
    }
  }, [active]);

  if (Platform.OS === 'web' || !Canvas) {
    // Web fallback: boxShadow approximation, no breathing/recognition animation.
    const glow = BASE_GLOW[auraContext];
    return (
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          width,
          height,
          // @ts-ignore — web-only
          boxShadow: `0 0 ${glow.radius * intensityScale}px ${glow.color}${Math.round(
            glow.opacity * intensityScale * (surface === 'ambient' ? 0.5 : 1) * 255,
          ).toString(16).padStart(2, '0')}`,
        }}
      />
    );
  }

  const glow = BASE_GLOW[auraContext];
  const pulse = PULSE_HIGHLIGHT[avatarId][auraContext];
  const surfaceScale = surface === 'ambient' ? 0.5 : 1;
  const cx = width / 2;
  const cy = height / 2;
  const baseR = Math.max(width, height) / 2 + glow.radius * intensityScale * surfaceScale;
  const breathDelta = BREATH_PX[auraContext];

  return (
    <View pointerEvents="none" style={{ position: 'absolute', width, height, alignItems: 'center', justifyContent: 'center' }}>
      {/* Base ambient glow — radial gradient behind the card, builds in then breathes. */}
      <AuraLayer
        cx={cx}
        cy={cy}
        baseRadius={baseR}
        breathDeltaPx={breathDelta}
        breathDirection={auraContext === 'shadow' ? -1 : 1}
        color={glow.color}
        opacity={glow.opacity * intensityScale * surfaceScale}
        buildProgress={buildProgress}
        breathPhase={breathPhase}
        width={width}
        height={height}
      />

      {/* Pulse highlight — avatar accent, sits above the base glow. */}
      <AuraLayer
        cx={cx}
        cy={cy}
        baseRadius={baseR * 0.85}
        breathDeltaPx={breathDelta * 0.6}
        breathDirection={auraContext === 'shadow' ? -1 : 1}
        color={pulse.colors[0]}
        secondaryColor={pulse.colors[1]}
        opacity={pulse.opacity * intensityScale * surfaceScale}
        buildProgress={buildProgress}
        breathPhase={breathPhase}
        width={width}
        height={height}
      />

      {/* Recognition pulse — single outward ring, fires once. */}
      {isRecognition && surface === 'full' && (
        <RecognitionRing
          cx={cx}
          cy={cy}
          radius={recognitionRadius}
          opacity={recognitionOpacity}
          width={width}
          height={height}
        />
      )}
    </View>
  );
}

function AuraLayer({
  cx,
  cy,
  baseRadius,
  breathDeltaPx,
  breathDirection,
  color,
  secondaryColor,
  opacity,
  buildProgress,
  breathPhase,
  width,
  height,
}: {
  cx: number;
  cy: number;
  baseRadius: number;
  breathDeltaPx: number;
  breathDirection: 1 | -1;
  color: string;
  secondaryColor?: string;
  opacity: number;
  buildProgress: SharedValue<number>;
  breathPhase: SharedValue<number>;
  width: number;
  height: number;
}) {
  // Two static-radius canvases cross-faded by opacity simulate the radius
  // oscillation cheaply, matching this codebase's existing AvatarAura pattern
  // rather than driving Skia geometry directly from a Reanimated shared value.
  const innerOpacityStyle = useAnimatedOpacity(buildProgress, breathPhase, opacity, true);
  const outerOpacityStyle = useAnimatedOpacity(buildProgress, breathPhase, opacity, false);
  const outerRadius = baseRadius + breathDirection * breathDeltaPx;

  const colors = secondaryColor ? [color, secondaryColor] : [color, color];

  return (
    <>
      <Animated.View style={[{ position: 'absolute', width, height }, innerOpacityStyle]}>
        <Canvas style={{ width, height }}>
          <Circle cx={cx} cy={cy} r={baseRadius}>
            <RadialGradient c={vec(cx, cy)} r={baseRadius} colors={[colors[0] + 'FF', colors[1] + '00']} />
            <BlurMask blur={baseRadius * 0.25} style="normal" />
          </Circle>
        </Canvas>
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', width, height }, outerOpacityStyle]}>
        <Canvas style={{ width, height }}>
          <Circle cx={cx} cy={cy} r={outerRadius}>
            <RadialGradient c={vec(cx, cy)} r={outerRadius} colors={[colors[0] + 'FF', colors[1] + '00']} />
            <BlurMask blur={outerRadius * 0.25} style="normal" />
          </Circle>
        </Canvas>
      </Animated.View>
    </>
  );
}

// Splits build+breathe into two crossfading layers: `inner` peaks while
// breathPhase < 0, `outer` peaks while breathPhase > 0.
function useAnimatedOpacity(
  buildProgress: SharedValue<number>,
  breathPhase: SharedValue<number>,
  targetOpacity: number,
  isInner: boolean,
) {
  return useAnimatedStyle(() => {
    const breathWeight = isInner
      ? Math.max(0, -breathPhase.value)
      : Math.max(0, breathPhase.value);
    const base = isInner ? 1 - Math.max(0, breathPhase.value) * 0.3 : 0.7 + breathWeight * 0.3;
    return { opacity: buildProgress.value * targetOpacity * base };
  });
}

function RecognitionRing({
  cx,
  cy,
  radius,
  opacity,
  width,
  height,
}: {
  cx: number;
  cy: number;
  radius: SharedValue<number>;
  opacity: SharedValue<number>;
  width: number;
  height: number;
}) {
  const r = useDerivedValue(() => Math.max(1, radius.value));
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[{ position: 'absolute', width, height }, style]}>
      <Canvas style={{ width, height }}>
        <Circle cx={cx} cy={cy} r={r} color={RECOGNITION_COLOR} style="stroke" strokeWidth={2}>
          <BlurMask blur={6} style="normal" />
        </Circle>
      </Canvas>
    </Animated.View>
  );
}
