import { Tabs } from 'expo-router';
import { trackNavigationClick } from '../../src/lib/analytics';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      screenListeners={{
        tabPress: (e) => {
          trackNavigationClick('tab_bar', e.target ?? 'unknown_tab');
        },
      }}
    />
  );
}
