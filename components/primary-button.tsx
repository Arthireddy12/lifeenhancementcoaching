import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { appShadow, fonts, palette } from '@/constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  variant = 'solid',
  style,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Animated.View entering={FadeInUp.duration(420)}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          variant === 'ghost' ? styles.ghost : styles.solid,
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}>
        <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  solid: {
    backgroundColor: palette.accentStrong,
    ...appShadow,
  },
  ghost: {
    backgroundColor: palette.surfaceElevated,
    borderColor: palette.line,
    borderWidth: 1,
  },
  label: {
    color: palette.dark,
    fontFamily: fonts?.sans,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  ghostLabel: {
    color: palette.text,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.6,
  },
});
