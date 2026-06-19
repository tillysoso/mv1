import { Tabs } from 'expo-router';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { trackNavigationClick } from '../../src/lib/analytics';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { AVATAR_IMAGES } from '../../src/constants/avatarContent';

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

// Long press opens the avatar selection modal — short press intentionally
// does nothing, to prevent accidental switches while reaching for a tab.
function AvatarEmblemButton() {
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const openAvatarModal = useAvatarStore((s) => s.openAvatarModal);
  const accentColor = avatarAccents[activeAvatar].primary;

  return (
    <Pressable
      onLongPress={openAvatarModal}
      onPress={() => {}}
      style={[styles.emblem, { borderColor: accentColor }]}
      accessibilityLabel="Switch companion (long press)"
    >
      <Image source={AVATAR_IMAGES[activeAvatar]} style={styles.emblemImage} resizeMode="cover" />
    </Pressable>
  );
}

export default function TabsLayout() {
  const { activeAvatar } = useAvatarStore();
  const accentColor = avatarAccents[activeAvatar].primary;

  return (
    <View style={{ flex: 1 }}>
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
    <AvatarEmblemButton />
    </View>
  );
}

const styles = StyleSheet.create({
  emblem: {
    position: 'absolute',
    right: 16,
    bottom: 64,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    overflow: 'hidden',
  },
  emblemImage: {
    width: '100%',
    height: '100%',
  },
});
