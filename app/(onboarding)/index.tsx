import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { trackNavigationClick } from '../../src/lib/analytics';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { ROUTE } from '../../src/constants';

const LINE_1 = 'Something in this city reads patterns.';
const LINE_2 = 'It always has. Not everyone notices.';
const TAP_CUE_DELAY_MS = 3600;
const DISSOLVE_DURATION_MS = 700;

export default function EntryScreen() {
  const router = useRouter();
  const [tapCueVisible, setTapCueVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const emblemOpacity = useSharedValue(0.35);
  const emblemScale = useSharedValue(1);
  const line1Opacity = useSharedValue(0);
  const line2Opacity = useSharedValue(0);
  const cueOpacity = useSharedValue(0);
  const worldOpacity = useSharedValue(1);

  useEffect(() => {
    // Emblem breathes faintly in the distance, unidentifiable
    emblemOpacity.value = withRepeat(
      withSequence(
        withTiming(0.85, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.35, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    // Headline fades in slowly, line by line
    line1Opacity.value = withDelay(600, withTiming(1, { duration: 1400 }));
    line2Opacity.value = withDelay(2000, withTiming(1, { duration: 1400 }));

    // After a beat, a subtle tap-anywhere breath appears (not a CTA button)
    cueOpacity.value = withDelay(
      TAP_CUE_DELAY_MS,
      withRepeat(
        withSequence(
          withTiming(0.85, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.25, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      ),
    );

    const cueTimer = setTimeout(() => setTapCueVisible(true), TAP_CUE_DELAY_MS);
    return () => clearTimeout(cueTimer);
  }, []);

  function handleTap() {
    if (dismissed) return;
    setDismissed(true);
    trackNavigationClick('signal_tap', ROUTE.ONBOARDING_NAME);

    // Emblem drifts toward the user as the screen dissolves into Screen 02
    emblemScale.value = withTiming(6, { duration: DISSOLVE_DURATION_MS, easing: Easing.in(Easing.ease) });
    emblemOpacity.value = withTiming(0, { duration: DISSOLVE_DURATION_MS });
    worldOpacity.value = withTiming(0, { duration: DISSOLVE_DURATION_MS }, () => {
      runOnJS(router.push)(ROUTE.ONBOARDING_NAME);
    });
  }

  const worldStyle = useAnimatedStyle(() => ({ opacity: worldOpacity.value }));
  const emblemStyle = useAnimatedStyle(() => ({
    opacity: emblemOpacity.value,
    transform: [{ scale: emblemScale.value }],
  }));
  const line1Style = useAnimatedStyle(() => ({ opacity: line1Opacity.value }));
  const line2Style = useAnimatedStyle(() => ({ opacity: line2Opacity.value }));
  const cueStyle = useAnimatedStyle(() => ({ opacity: cueOpacity.value }));

  return (
    <Pressable style={styles.root} onPress={handleTap}>
      {/* TODO: world background asset (rain on glass / canal reflection / rooftop
          mist) not yet delivered — full-bleed environment image/Skia canvas
          should replace this flat obsidian fill once an asset exists. */}
      <Animated.View style={[styles.world, worldStyle]}>
        {/* TODO: emblem-majestic.svg exists in assets/emblems/ but react-native-svg
            is not installed, so the real emblem can't be rendered yet — this is a
            placeholder glyph standing in for "a single unidentifiable emblem." */}
        <Animated.View style={[styles.emblem, emblemStyle]} />

        <View style={styles.textBlock}>
          <Animated.Text style={[styles.headline, line1Style]}>{LINE_1}</Animated.Text>
          <Animated.Text style={[styles.headline, styles.headlineSecondary, line2Style]}>
            {LINE_2}
          </Animated.Text>
        </View>

        {tapCueVisible && (
          <Animated.View style={[styles.cue, cueStyle]}>
            <View style={styles.cueDot} />
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.obsidian,
  },
  world: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.bg.dusk,
    marginBottom: 64,
  },
  textBlock: {
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  headline: {
    fontFamily: fonts.displaySemiBold,
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    lineHeight: 28,
    textAlign: 'center',
  },
  headlineSecondary: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyM.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyM.lineHeight,
    marginTop: 12,
  },
  cue: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  cueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.mist,
  },
});
