import { Text, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { resetHeroImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function ResetScreen() {
  return (
    <ScreenShell
      eyebrow="Program"
      title="One-on-One Personalized Autoimmune Health Coaching Program"
      body="One-on-One Personalized Autoimmune Health Coaching Program"
      image={resetHeroImage}
      showBack>
      <View style={styles.card}>
        <Text style={styles.title}>Program Focus</Text>
        <Text style={styles.text}>
          Physical, mental, emotional, social, vocational, financial, and spiritual wellbeing,
          with exercises and assignments tailored to your individual goals.
        </Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: 28, borderWidth: 1, padding: 20 },
  title: { color: palette.accent, fontFamily: fonts?.sans, fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  text: { color: palette.text, fontFamily: fonts?.display, fontSize: 28, lineHeight: 33, marginTop: 10 },
});
