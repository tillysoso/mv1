import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackFormSubmit } from '../../src/lib/analytics';
import TerminalInput from '../../src/components/onboarding/TerminalInput';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { ROUTE } from '../../src/constants';

// System boot lines, revealed one at a time before the prompt appears
const SYSTEM_LINES = [
  'MAJESTIC SIGNAL DETECTED.',
  'INITIALISING.',
  '...',
  'Before we go further —',
];
const PROMPT = 'What do you go by?';
const REVEAL_DELAY_MS = 30; // per character

export default function NameScreen() {
  const router = useRouter();
  const { setName } = useProfileStore();
  const [value, setValue] = useState('');
  const [linesShown, setLinesShown] = useState(0);
  const [promptChars, setPromptChars] = useState(0);
  const [showError, setShowError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedName, setConfirmedName] = useState('');
  const [showAcknowledged, setShowAcknowledged] = useState(false);

  // Reveal system lines one at a time
  useEffect(() => {
    if (linesShown >= SYSTEM_LINES.length) return;
    const timer = setTimeout(() => setLinesShown((n) => n + 1), LINE_PAUSE_MS);
    return () => clearTimeout(timer);
  }, [linesShown]);

  // Once system lines are done, reveal the prompt character-by-character
  useEffect(() => {
    if (linesShown < SYSTEM_LINES.length) return;
    if (promptChars >= PROMPT.length) return;
    const timer = setTimeout(() => setPromptChars((n) => n + 1), CHAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, [linesShown, promptChars]);

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
    trackFormSubmit('name_entry', 'onboarding_name');
    setName(trimmed);
    trackFormSubmit('name_entry', 'onboarding_name');
    router.push(ROUTE.ONBOARDING_DOB);
  }

  const canSubmit = value.trim().length > 0;

  return (
    <OnboardingScreen
      bottomContent={
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
    router.push(ROUTE.ONBOARDING_DOB);
  }

  const isReady = value.trim().length > 0;

  return (
    <OnboardingScreen
      bottomContent={isReady && <CTAButton label="Continue" onPress={handleSubmit} />}
    >
      <Pressable style={styles.backLink} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ back</Text>
      </Pressable>

      <View style={styles.terminalHeader}>
        <Text style={styles.systemLine}>MAJESTIC SIGNAL DETECTED.</Text>
        <Text style={styles.systemLine}>INITIALISING.</Text>
        <Text style={styles.systemLine}>...</Text>
        <Text style={styles.systemLine}>Before we go further —</Text>
      </View>

      {promptRevealed && !confirmed && (
        <>
          <Text style={styles.prompt}>{PROMPT.slice(0, promptChars)}</Text>

          <View style={styles.inputRow}>
            <Text style={styles.cursor}>&gt; </Text>
            <TerminalInput value={value} onChangeText={handleChange} onSubmit={handleSubmit} autoFocus />
          </View>

          {showError && <Text style={styles.errorLine}>// a name is needed</Text>}
        </>
      )}

      {confirmed && (
        <View style={styles.terminalHeader}>
          <Text style={styles.systemLine}>{confirmedName}.</Text>
          {showAcknowledged && <Text style={styles.systemLine}>Good. The signal has you now.</Text>}
        </View>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
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
  errorLine: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
    marginTop: 16,
    opacity: 0.8,
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
