import React, { useEffect, useRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useAvatarStore } from '../../stores/avatarStore';
import { avatarAccents } from '../../theme/tokens';
import { fonts } from '../../theme/typography';

interface TerminalInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
  maxLength?: number;
  keyboardType?: TextInput['props']['keyboardType'];
}

export default function TerminalInput({
  value,
  onChangeText,
  onSubmit,
  autoFocus = false,
  placeholder,
  maxLength,
  keyboardType = 'default',
}: TerminalInputProps) {
  const inputRef = useRef<TextInput>(null);
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const cursorColor = avatarAccents[activeAvatar].primary;

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <TextInput
      ref={inputRef}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit}
      placeholder={placeholder}
      placeholderTextColor="#3A3A4A"
      autoFocus={autoFocus}
      maxLength={maxLength}
      keyboardType={keyboardType}
      returnKeyType="done"
      autoCapitalize="none"
      autoCorrect={false}
      selectionColor={cursorColor}
      cursorColor={cursorColor}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.terminal,
    fontSize: 20,
    color: '#F0EDE8',
    backgroundColor: 'transparent',
    padding: 0,
    minWidth: 40,
  },
});
