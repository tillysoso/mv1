import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts } from '../../src/theme/typography';

// Minimal dot icon — avoids @expo/vector-icons dependency
function TabDot({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View
      style={{
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: focused ? color : 'transparent',
        borderWidth: 1,
        borderColor: color,
      }}
    />
  );
}

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
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarLabel: 'Draw',
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
