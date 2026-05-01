import { View, Text, StyleSheet } from 'react-native';
import { toRoman } from '../../utils/roman';
import { colors } from '../../theme/tokens';

export default function NumberCardPlaceholder({ number }: { number: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.roman}>{toRoman(number)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 220,
    backgroundColor: colors.bg.tertiary,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  roman: {
    fontSize: 28,
    color: colors.mist,
    letterSpacing: 2,
  },
});
