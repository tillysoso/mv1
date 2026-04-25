import { Tabs } from 'expo-router';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts } from '../../src/theme/typography';

export default function TabsLayout() {
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const accent = avatarAccents[activeAvatar];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.obsidian,
          borderTopWidth: 1,
          borderTopColor: colors.charcoal,
          height: 56,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: accent.primary,
        tabBarInactiveTintColor: colors.mist,
        tabBarLabelStyle: {
          fontFamily: fonts.bodySemiBold,
          fontSize: 10,
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Draw',
          tabBarLabel: 'Draw',
        }}
      />
      <Tabs.Screen
        name="reading"
        options={{
          title: 'Reading',
          tabBarLabel: 'Reading',
        }}
      />
    </Tabs>
  );
}
