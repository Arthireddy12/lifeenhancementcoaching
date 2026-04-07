import { StyleSheet, Text, View } from 'react-native';

import { fonts, palette } from '@/constants/theme';

type TagProps = {
  label: string;
};

export function Tag({ label }: TagProps) {
  return (
    <View style={styles.tag}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: palette.surfaceElevated,
    borderColor: palette.line,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  label: {
    color: palette.text,
    fontFamily: fonts?.sans,
    fontSize: 13,
    fontWeight: '600',
  },
});
