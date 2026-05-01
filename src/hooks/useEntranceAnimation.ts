import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

export function useEntranceAnimation() {
  const translateY = useSharedValue(60);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
    opacity.value = withDelay(100, withTiming(1, { duration: 500 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}
