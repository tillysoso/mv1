import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackFormSubmit } from '../../src/lib/analytics';
import CTAButton from '../../src/components/onboarding/CTAButton';
import { useProfileStore } from '../../src/stores/profileStore';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { avatarAccents, colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';

function isValidDate(day: number, month: number, year: number): boolean {
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

export default function DobScreen() {
  const router = useRouter();
  const { name, setDateOfBirth } = useProfileStore();
  const activeAvatar = useAvatarStore((s) => s.activeAvatar);
  const cursorColor = avatarAccents[activeAvatar].primary;

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');

  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  const isReady = day.length === 2 && month.length === 2 && year.length === 4;

  function handleDayChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    setDay(digits);
    setError('');
    setDateError('');
    if (digits.length === 2) monthRef.current?.focus();
  }

  function handleMonthChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    setMonth(digits);
    setError('');
    setDateError('');
    if (digits.length === 2) yearRef.current?.focus();
  }

  function handleYearChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    setYear(digits);
    setError('');
    setDateError('');
  }

  function handleSubmit() {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!isValidDate(d, m, y)) {
      setError("— that date doesn't exist.");
      setDateError('> That date does not compute. Try again.');
      return;
    }

    setDateOfBirth({ day: d, month: m, year: y });
    trackFormSubmit('dob_entry', 'onboarding_date_of_birth');
    router.push('/(onboarding)/calculating');
  }

  const canSubmit = day.length === 2 && month.length === 2 && year.length === 4;

  return (
    <OnboardingScreen
      bottomContent={
        canSubmit ? (
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
            onPress={handleSubmit}
          >
            <Text style={styles.ctaText}>Continue</Text>
          </Pressable>
        ) : null
        <CTAButton label="Continue" onPress={handleSubmit} disabled={!isReady} />
      }
    >
      <View style={styles.terminalHeader}>
        <Text style={styles.systemLine}>
          {name ? `${name}.` : ''}
        </Text>
        <Text style={styles.systemLine}>Good. The signal has you now.</Text>
        <Text style={styles.systemLine}>&nbsp;</Text>
        <Text style={styles.systemLine}>One more thing.</Text>
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

      {error ? <Text style={styles.errorLine}>{error}</Text> : null}
      {dateError ? (
        <Text style={styles.errorLine}>{dateError}</Text>
      ) : null}

      <Pressable
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
        onPress={handleSubmit}
      >
        <Text style={styles.ctaText}>Continue</Text>
      </Pressable>
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
  cta: {
    paddingVertical: 16,
    alignSelf: 'flex-start',
  },
  ctaText: {
    // TODO: fontFamily: fonts.body (Montserrat)
  errorLine: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: '#C94B2C',
    letterSpacing: 0.5,
    marginTop: 20,
    color: colors.mist,
    letterSpacing: 0.5,
    marginTop: 24,
  },
  cta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  ctaText: {
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 2,
  },
});
