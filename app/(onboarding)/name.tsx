import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackFormSubmit } from '../../src/lib/analytics';
import CTAButton from '../../src/components/onboarding/CTAButton';
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
const CHAR_DELAY_MS = 40;
const LINE_PAUSE_MS = 350;
const ECHO_PAUSE_MS = 900;

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
    setName(trimmed);
    trackFormSubmit('name_entry', 'onboarding_name');
    setConfirmedName(trimmed);
    setConfirmed(true);

    // Echo-back is the first proof the app is "paying attention" — give it
    // an intentional pause rather than resolving instantly.
    setTimeout(() => setShowAcknowledged(true), ECHO_PAUSE_MS);
    setTimeout(() => router.push(ROUTE.ONBOARDING_DOB), ECHO_PAUSE_MS + 1400);
  }

  const promptRevealed = linesShown >= SYSTEM_LINES.length;
  const canSubmit = value.trim().length > 0;

  return (
    <OnboardingScreen
      bottomContent={
        !confirmed && canSubmit ? <CTAButton label="Continue" onPress={handleSubmit} /> : undefined
      }
    >
      <View style={styles.terminalHeader}>
        {SYSTEM_LINES.slice(0, linesShown).map((line, i) => (
          <Text key={i} style={styles.systemLine}>
            {line}
          </Text>
        ))}
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
});
