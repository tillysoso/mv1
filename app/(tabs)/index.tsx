import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/tokens';

// TODO: Replace with main app home screen in Step 5 (card draw feature).
export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Threshold City</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.secondary,
    fontSize: 16,
    letterSpacing: 2,
  },
});
