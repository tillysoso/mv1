import { useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { trackScrollDepth } from './index';

const THRESHOLDS = [25, 50, 75, 100] as const;
type Threshold = (typeof THRESHOLDS)[number];

/**
 * Tracks scroll depth milestones (25 / 50 / 75 / 100 %) and fires
 * `trackScrollDepth` events for GA4.
 *
 * Usage — two modes:
 *
 * 1. Web window scroll (automatic when Platform.OS === 'web'):
 *    Just call the hook; it attaches a passive window scroll listener.
 *
 * 2. Native ScrollView (spread the returned props onto a <ScrollView>):
 *    <ScrollView {...scrollDepthProps}>…</ScrollView>
 *
 * Both modes fire the same GA4 `scroll_depth` event. Milestones are tracked
 * once per mount — navigating to a new screen resets the counters.
 */
export function useScrollDepth(pagePath: string) {
  const tracked = useRef(new Set<Threshold>());

  // Reset counters whenever the tracked page changes
  useEffect(() => {
    tracked.current.clear();
  }, [pagePath]);

  // Web: passive window scroll listener
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    function handleWindowScroll() {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (scrollTop / scrollable) * 100;
      fireThresholds(pct);
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [pagePath]);

  function fireThresholds(pct: number) {
    for (const threshold of THRESHOLDS) {
      if (pct >= threshold && !tracked.current.has(threshold)) {
        tracked.current.add(threshold);
        trackScrollDepth(threshold, pagePath);
      }
    }
  }

  // Native: onScroll handler to spread onto <ScrollView>
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const scrollable = contentSize.height - layoutMeasurement.height;
      if (scrollable <= 0) return;
      const pct = (contentOffset.y / scrollable) * 100;
      fireThresholds(pct);
    },
    [pagePath],
  );

  return { onScroll, scrollEventThrottle: 400 } as const;
}
