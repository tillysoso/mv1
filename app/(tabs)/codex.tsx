import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/tokens';
import { typeScale } from '../../src/theme/typography';

// Placeholder — see src/features/codex/README.md for what's built vs. not.
// Spec: docs/03-experience-and-feature-specs/majestic-codex-spec.md
export default function CodexScreen() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Text style={styles.label}>Codex</Text>
        <Text style={styles.body}>The full deck lives here. Not built yet.</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.obsidian,
  },
  safe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  label: {
    fontSize: 10,
    letterSpacing: 4,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  body: {
    fontSize: typeScale.bodyM.fontSize,
    lineHeight: typeScale.bodyM.lineHeight,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
