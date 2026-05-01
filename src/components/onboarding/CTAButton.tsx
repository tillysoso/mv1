import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/tokens';
import { typeScale } from '../../theme/typography';

interface CTAButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  align?: 'left' | 'center';
}

export default function CTAButton({ label, onPress, disabled = false, align = 'left' }: CTAButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.cta,
        align === 'center' && styles.ctaCenter,
        disabled && styles.ctaDisabled,
        pressed && !disabled && styles.ctaPressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.ctaText, disabled && styles.ctaTextDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
  },
  ctaCenter: {
    alignSelf: 'center',
  },
  ctaDisabled: {
    opacity: 0.35,
  },
  ctaPressed: {
    borderColor: colors.mist,
    opacity: 0.8,
  },
  ctaText: {
    fontSize: typeScale.label.fontSize,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 2,
  },
  ctaTextDisabled: {
    color: colors.text.secondary,
  },
});
