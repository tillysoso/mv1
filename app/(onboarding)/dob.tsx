import { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
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

  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  function handleDayChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    setDay(digits);
    if (digits.length === 2) monthRef.current?.focus();
  }

  function handleMonthChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 2);
    setMonth(digits);
    if (digits.length === 2) yearRef.current?.focus();
  }

  function handleYearChange(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    setYear(digits);
  }

  function handleSubmit() {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!isValidDate(d, m, y)) {
      Alert.alert('Invalid date', 'Please enter a real date.');
      return;
    }

    setDateOfBirth({ day: d, month: m, year: y });
    router.push('/(onboarding)/calculating');
  }

  return (
    <OnboardingScreen>
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
});
