import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import TerminalInput from '../../src/components/onboarding/TerminalInput';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

const PROMPT = 'What do you go by?';
const REVEAL_DELAY_MS = 30; // per character

// TODO: fontFamily strings require Cinzel/Montserrat/SpaceMono fonts via expo-font.

export default function NameScreen() {
  const router = useRouter();
  const { setName } = useProfileStore();
  const [value, setValue] = useState('');
  const [visibleChars, setVisibleChars] = useState(0);
  const [showError, setShowError] = useState(false);

  // Character-by-character prompt reveal
  useEffect(() => {
    if (visibleChars >= PROMPT.length) return;
    const timer = setTimeout(() => {
      setVisibleChars((n) => n + 1);
    }, REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [visibleChars]);

  function handleChange(text: string) {
    setValue(text);
    if (showError) setShowError(false);
  }

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) {
      setShowError(true);
      return;
    }
    setName(trimmed);
    router.push('/(onboarding)/dob');
  }

  return (
    <OnboardingScreen>
      <Pressable style={styles.backLink} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ back</Text>
      </Pressable>

      <View style={styles.terminalHeader}>
        <Text style={styles.systemLine}>MAJESTIC SIGNAL DETECTED.</Text>
        <Text style={styles.systemLine}>INITIALISING.</Text>
        <Text style={styles.systemLine}>...</Text>
        <Text style={styles.systemLine}>&nbsp;</Text>
        <Text style={styles.systemLine}>Before we go further —</Text>
      </View>

      <Text style={styles.prompt}>
        {PROMPT.slice(0, visibleChars)}
      </Text>

      <View style={styles.inputRow}>
        <Text style={styles.cursor}>&gt; </Text>
        <TerminalInput
          value={value}
          onChangeText={handleChange}
          onSubmit={handleSubmit}
          autoFocus={visibleChars >= PROMPT.length}
        />
      </View>

      {showError && (
        <Text style={styles.errorLine}>// a name is needed</Text>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  backLink: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backText: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
  },
  terminalHeader: {
    marginBottom: 32,
    marginTop: 4,
  },
  systemLine: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  prompt: {
    // TODO: fontFamily: fonts.body (Montserrat)
    fontSize: typeScale.bodyL.fontSize,
    color: colors.bone,
    lineHeight: typeScale.bodyL.lineHeight,
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cursor: {
    fontFamily: fonts.terminal,
    fontSize: 20,
    color: colors.text.secondary,
  },
  errorLine: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
    marginTop: 16,
    opacity: 0.8,
  },
});
