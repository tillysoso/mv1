import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import CTAButton from '../../src/components/onboarding/CTAButton';
import TerminalInput from '../../src/components/onboarding/TerminalInput';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

const PROMPT = 'What do you go by?';
const REVEAL_DELAY_MS = 30; // per character

export default function NameScreen() {
  const router = useRouter();
  const { setName } = useProfileStore();
  const [value, setValue] = useState('');
  const [visibleChars, setVisibleChars] = useState(0);

  // Character-by-character prompt reveal
  useEffect(() => {
    if (visibleChars >= PROMPT.length) return;
    const timer = setTimeout(() => {
      setVisibleChars((n) => n + 1);
    }, REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [visibleChars]);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    setName(trimmed);
    router.push('/(onboarding)/dob');
  }

  const isReady = value.trim().length > 0;
  const canSubmit = value.trim().length > 0;

  return (
    <OnboardingScreen
      bottomContent={
        isReady ? <CTAButton label="Continue" onPress={handleSubmit} /> : undefined
        <Pressable
          style={({ pressed }) => [
            styles.cta,
            !canSubmit && styles.ctaDisabled,
            pressed && canSubmit && { opacity: 0.7 },
          ]}
          onPress={handleSubmit}
        >
          <Text style={[styles.ctaText, !canSubmit && styles.ctaTextDisabled]}>Continue</Text>
        </Pressable>
      }
    >
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
          onChangeText={setValue}
          onSubmit={handleSubmit}
          autoFocus
        />
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  terminalHeader: {
    marginBottom: 32,
    marginTop: 20,
  },
  systemLine: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  prompt: {
    fontFamily: fonts.body,
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
  cta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
  },
  ctaDisabled: {
    borderColor: colors.bg.tertiary,
    opacity: 0.4,
  },
  ctaText: {
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 2,
  },
  ctaTextDisabled: {
    color: colors.text.tertiary,
  },
});
