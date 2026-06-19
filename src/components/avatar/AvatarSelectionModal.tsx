import { useMemo, useRef, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, PanResponder } from 'react-native';
import { useAvatarStore } from '../../stores/avatarStore';
import { runAvatarSwitchTransition } from '../../lib/avatarTransition';
import AvatarPortrait from './AvatarPortrait';
import { avatarAccents, colors } from '../../theme/tokens';
import { typeScale } from '../../theme/typography';
import { AVATAR_IDS, PRESENCE_LEVEL, AURA_CONTEXT, AVATAR_STATE } from '../../constants';
import { AVATAR_NAMES, AVATAR_ELEMENTS, FIRST_WORDS } from '../../constants/avatarContent';
import type { AvatarId } from '../../types';

const CONFIRMATION_HOLD_MS = 1000;

export default function AvatarSelectionModal() {
  const avatarModalOpen = useAvatarStore((s) => s.avatarModalOpen);
  const closeAvatarModal = useAvatarStore((s) => s.closeAvatarModal);
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const [selected, setSelected] = useState<AvatarId | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleDismiss() {
    if (timer.current) clearTimeout(timer.current);
    setSelected(null);
    closeAvatarModal();
  }

  function handleSelect(id: AvatarId) {
    // Tapping the currently active avatar does nothing — no transition, no line.
    if (id === activeAvatar || selected) return;
    setSelected(id);
    timer.current = setTimeout(() => {
      closeAvatarModal();
      runAvatarSwitchTransition(id);
      setSelected(null);
    }, CONFIRMATION_HOLD_MS);
  }

  // Swipe-down-to-dismiss
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 12 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dy > 80) handleDismiss();
        },
      }),
    [],
  );

  return (
    <Modal
      visible={avatarModalOpen}
      animationType="fade"
      transparent={false}
      onRequestClose={handleDismiss}
    >
      <View style={styles.root} {...panResponder.panHandlers}>
        <Text style={styles.header}>Choose your companion.</Text>

        <View style={styles.grid}>
          {AVATAR_IDS.map((id) => {
            const accent = avatarAccents[id];
            const isActive = id === activeAvatar;
            const isSelected = id === selected;
            return (
              <Pressable
                key={id}
                style={[
                  styles.panel,
                  { borderColor: isActive || isSelected ? accent.primary : 'transparent' },
                ]}
                onPress={() => handleSelect(id)}
              >
                <View style={styles.portraitWrap}>
                  <AvatarPortrait
                    avatarId={id}
                    presenceLevel={PRESENCE_LEVEL.PRESENCE}
                    auraContext={AURA_CONTEXT.NEUTRAL}
                    imageState={AVATAR_STATE.NEUTRAL}
                  />
                </View>
                <Text style={styles.name}>{AVATAR_NAMES[id]}</Text>
                <Text style={[styles.element, { color: accent.primary }]}>
                  {AVATAR_ELEMENTS[id].toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {selected && (
          <Text style={[styles.confirmLine, { color: avatarAccents[selected].secondary }]}>
            "{FIRST_WORDS[selected]}"
          </Text>
        )}
      </View>
    </Modal>
  );
}

const PORTRAIT_SCALE = 120 / 200;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.obsidian,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: typeScale.displayM.fontSize,
    color: colors.bone,
    textAlign: 'center',
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  panel: {
    width: 150,
    alignItems: 'center',
    paddingVertical: 16,
    margin: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  portraitWrap: {
    width: 200 * PORTRAIT_SCALE,
    height: 200 * PORTRAIT_SCALE,
    transform: [{ scale: PORTRAIT_SCALE }],
    marginBottom: -200 * (1 - PORTRAIT_SCALE) * 0.5,
  },
  name: {
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    marginTop: 12,
  },
  element: {
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 4,
  },
  confirmLine: {
    fontSize: typeScale.bodyM.fontSize,
    textAlign: 'center',
    marginTop: 32,
  },
});
