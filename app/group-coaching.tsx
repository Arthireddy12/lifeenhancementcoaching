import { Text, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { groupHeroImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function GroupCoachingScreen() {
  return (
    <ScreenShell
      eyebrow="Program"
      title="Small Group Health Coaching"
      body="Small Group Health Coaching"
      image={groupHeroImage}
      showBack>
      <View style={styles.card}>
        <Text style={styles.title}>Program Structure</Text>
        <Text style={styles.text}>
          Groups meet weekly for 12 weeks, with sessions lasting 45-60 minutes and centered on
          support, accountability, education, and shared progress.
        </Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    color: palette.accent,
    fontFamily: fonts?.sans,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  text: {
    color: palette.text,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
});
