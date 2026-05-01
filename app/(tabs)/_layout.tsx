import { Tabs } from 'expo-router';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts } from '../../src/theme/typography';

export default function TabsLayout() {
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const accent = avatarAccents[activeAvatar];
import { View } from 'react-native';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { avatarAccents, colors } from '../../src/theme/tokens';

// Minimal dot icon — avoids @expo/vector-icons dependency
function TabDot({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: focused ? color : 'transparent',
      borderWidth: 1,
      borderColor: color,
    }} />
  );
}

export default function TabsLayout() {
  const { activeAvatar } = useAvatarStore();
  const accentColor = avatarAccents[activeAvatar].primary;

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
        tabBarActiveTintColor: accentColor,
        tabBarInactiveTintColor: colors.mist,
        tabBarStyle: {
          backgroundColor: colors.bg.secondary,
          borderTopColor: colors.ash,
          borderTopWidth: 0.5,
          height: 56,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          letterSpacing: 2,
          marginTop: -2,
          textTransform: 'uppercase',
        },
      }}
      screenListeners={{
        tabPress: (e) => {
          trackNavigationClick('tab_bar', e.target ?? 'unknown_tab');
        },
      }}
    />
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Draw',
          tabBarLabel: 'Draw',
          title: 'Today',
          tabBarIcon: ({ color, focused }) => <TabDot focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reading"
        options={{
          title: 'Reading',
          tabBarLabel: 'Reading',
          tabBarIcon: ({ color, focused }) => <TabDot focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabDot focused={focused} color={color} />,
        }}
      />
    </Tabs>
  );
}
