import { StyleSheet, Text, View } from 'react-native';

import { fonts, palette } from '@/constants/theme';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  eyebrow: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 36,
  },
  body: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
  },
});
