import { Tabs } from 'expo-router';
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
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, focused }) => <TabDot focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reading"
        options={{
          title: 'Reading',
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
