import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackFormSubmit } from '../../src/lib/analytics';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { birthCardCalculator } from '../../src/features/birth-card/birthCardCalculator';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import { ROUTE } from '../../src/constants';

const CALC_LINES = ['Calculating.', '...', 'The signal is reading your pattern.'];
const CALC_LINE_DELAY_MS = 500;
const HOLD_BEFORE_NAV_MS = 700;

function isValidDate(day: number, month: number, year: number): boolean {
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

export default function DobScreen() {
  const router = useRouter();
  const { name, setDateOfBirth, setBirthCards } = useProfileStore();
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const cursorColor = avatarAccents[activeAvatar].primary;

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [calcLinesShown, setCalcLinesShown] = useState(0);

  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  function clearError() {
    if (errorMsg) setErrorMsg('');
  }

  function handleDayChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    setDay(digits);
    clearError();
    if (digits.length === 2) monthRef.current?.focus();
  }

  function handleMonthChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    setMonth(digits);
    clearError();
    if (digits.length === 2) yearRef.current?.focus();
  }

  function handleYearChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    setYear(digits);
    clearError();
  }

  function handleSubmit() {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!isValidDate(d, m, y)) {
      setErrorMsg("// that date doesn't resolve — try again");
      return;
    }

    setDateOfBirth({ day: d, month: m, year: y });
    trackFormSubmit('dob_entry', 'onboarding_date_of_birth');

    // Birth card calc runs now, during this screen's hold beat, so the
    // result is ready before Screen 04 ever renders — no loading state there.
    const cards = birthCardCalculator(d, m, y);
    setBirthCards(cards);

    setCalculating(true);
    CALC_LINES.forEach((_, i) => {
      setTimeout(() => setCalcLinesShown((n) => Math.max(n, i + 1)), i * CALC_LINE_DELAY_MS);
    });
    setTimeout(
      () => router.push(ROUTE.ONBOARDING_CALCULATING),
      CALC_LINES.length * CALC_LINE_DELAY_MS + HOLD_BEFORE_NAV_MS,
    );
  }

  const canSubmit = day.length === 2 && month.length === 2 && year.length === 4;

  return (
    <OnboardingScreen
      bottomContent={!calculating && canSubmit ? <CTAButton label="Continue" onPress={handleSubmit} /> : undefined}
    >
      {!calculating ? (
        <>
          <View style={styles.terminalHeader}>
            <Text style={styles.systemLine}>One more thing{name ? `, ${name}` : ''}.</Text>
          </View>

          <Text style={styles.prompt}>When did you arrive?</Text>

          <View style={styles.fieldsRow}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>DD</Text>
              <View style={styles.inputRow}>
                <Text style={styles.caret}>&gt; </Text>
                <TextInput
                  value={day}
                  onChangeText={handleDayChange}
                  placeholder="—"
                  placeholderTextColor={colors.text.tertiary}
                  keyboardType="number-pad"
                  maxLength={2}
                  returnKeyType="next"
                  onSubmitEditing={() => monthRef.current?.focus()}
                  autoFocus
                  selectionColor={cursorColor}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>MM</Text>
              <View style={styles.inputRow}>
                <Text style={styles.caret}>&gt; </Text>
                <TextInput
                  ref={monthRef}
                  value={month}
                  onChangeText={handleMonthChange}
                  placeholder="—"
                  placeholderTextColor={colors.text.tertiary}
                  keyboardType="number-pad"
                  maxLength={2}
                  returnKeyType="next"
                  onSubmitEditing={() => yearRef.current?.focus()}
                  selectionColor={cursorColor}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>YYYY</Text>
              <View style={styles.inputRow}>
                <Text style={styles.caret}>&gt; </Text>
                <TextInput
                  ref={yearRef}
                  value={year}
                  onChangeText={handleYearChange}
                  placeholder="——"
                  placeholderTextColor={colors.text.tertiary}
                  keyboardType="number-pad"
                  maxLength={4}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  selectionColor={cursorColor}
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          {errorMsg ? <Text style={styles.errorLine}>{errorMsg}</Text> : null}
        </>
      ) : (
        <View style={styles.terminalHeader}>
          {CALC_LINES.slice(0, calcLinesShown).map((line, i) => (
            <Text key={i} style={styles.systemLine}>
              {line}
            </Text>
          ))}
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
    marginBottom: 40,
  },
  fieldsRow: {
    flexDirection: 'row',
    gap: 32,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontFamily: fonts.terminal,
    fontSize: 11,
    color: colors.text.tertiary,
    letterSpacing: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caret: {
    fontFamily: fonts.terminal,
    fontSize: 18,
    color: colors.text.secondary,
  },
  input: {
    fontFamily: fonts.terminal,
    fontSize: 20,
    color: colors.bone,
    backgroundColor: 'transparent',
    padding: 0,
    minWidth: 48,
  },
  errorLine: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.mist,
    letterSpacing: 0.5,
    marginTop: 20,
    opacity: 0.8,
  },
});
