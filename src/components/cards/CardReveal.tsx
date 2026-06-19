import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { toRoman } from '../../utils/roman';
import { colors } from '../../theme/tokens';

interface CardRevealProps {
  number: number;
  /** 'taut' = personality (truth landing); 'expansive' = soul (horizon opening) */
  tone?: 'taut' | 'expansive';
  /** Delay before the reveal sequence starts, in ms. */
  startDelay?: number;
  onSettled?: () => void;
}

// Magical Relic reveal — compressed: lift, elemental rings, 3D flip with
// energy bloom, face resolve, settle into a breathing pulse. 'expansive'
// stretches every stage and softens the bloom for the soul card's
// "horizon opening" quality rather than the personality card's "truth landing".
export default function CardReveal({ number, tone = 'taut', startDelay = 0, onSettled }: CardRevealProps) {
  const expansive = tone === 'expansive';

  const liftY = useSharedValue(40);
  const liftOpacity = useSharedValue(0);
  const ringOpacity = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const bloomOpacity = useSharedValue(0);
  const breathScale = useSharedValue(1);

  useEffect(() => {
    const liftMs = expansive ? 700 : 500;
    const flipMs = expansive ? 900 : 700;
    const breathPeriod = 4000;

    liftY.value = withDelay(startDelay, withTiming(0, { duration: liftMs, easing: Easing.out(Easing.cubic) }));
    liftOpacity.value = withDelay(startDelay, withTiming(1, { duration: liftMs }));
    ringOpacity.value = withDelay(startDelay + liftMs * 0.4, withTiming(expansive ? 0.5 : 0.35, { duration: liftMs }));

    rotateY.value = withDelay(
      startDelay + liftMs,
      withSequence(
        withTiming(180, { duration: flipMs, easing: Easing.inOut(Easing.cubic) })
      )
    );

    bloomOpacity.value = withDelay(
      startDelay + liftMs + flipMs * 0.45,
      withSequence(
        withTiming(expansive ? 0.45 : 0.7, { duration: flipMs * 0.2 }),
        withTiming(0, { duration: flipMs * 0.5 })
      )
    );

    const settleDelay = startDelay + liftMs + flipMs + 150;
    breathScale.value = withDelay(
      settleDelay,
      withRepeat(
        withSequence(
          withTiming(expansive ? 1.012 : 1.02, { duration: breathPeriod / 2, easing: Easing.inOut(Easing.sin) }),
          withTiming(1, { duration: breathPeriod / 2, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        false
      )
    );

    if (onSettled) {
      const t = setTimeout(onSettled, settleDelay);
      return () => clearTimeout(t);
    }
  }, []);

  const liftStyle = useAnimatedStyle(() => ({
    opacity: liftOpacity.value,
    transform: [{ translateY: liftY.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({ opacity: ringOpacity.value }));

  const flipStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotateY.value}deg` }, { scale: breathScale.value }],
  }));

  const faceOpacity = useAnimatedStyle(() => ({
    opacity: rotateY.value > 90 ? 1 : 0,
  }));

  const bloomStyle = useAnimatedStyle(() => ({ opacity: bloomOpacity.value }));

  return (
    <Animated.View style={[styles.wrap, liftStyle]}>
      <Animated.View style={[styles.ring, styles.ringOuter, ringStyle, expansive && styles.ringOuterExpansive]} />
      <Animated.View style={[styles.ring, styles.ringInner, ringStyle, expansive && styles.ringInnerExpansive]} />
      <Animated.View style={[styles.card, flipStyle]}>
        <Animated.View style={[styles.bloom, bloomStyle]} />
        <Animated.View style={[styles.face, faceOpacity]}>
          <Text style={styles.roman}>{toRoman(number)}</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.bg.signal,
  },
  ringOuter: {
    width: 220,
    height: 220,
  },
  ringOuterExpansive: {
    width: 260,
    height: 260,
    borderColor: colors.bg.dusk,
  },
  ringInner: {
    width: 170,
    height: 170,
  },
  ringInnerExpansive: {
    width: 200,
    height: 200,
    borderColor: colors.bg.canal,
  },
  card: {
    width: 140,
    height: 220,
    backgroundColor: colors.bg.tertiary,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bloom: {
    position: 'absolute',
    top: -40,
    left: -40,
    right: -40,
    bottom: -40,
    backgroundColor: colors.bone,
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roman: {
    fontSize: 28,
    color: colors.mist,
    letterSpacing: 2,
  },
});
