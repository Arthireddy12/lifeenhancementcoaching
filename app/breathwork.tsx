import { Text, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { meditationImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function BreathworkScreen() {
  return (
    <ScreenShell
      eyebrow="Breathwork"
      title="Breathwork"
      body="Breathwork"
      image={meditationImage}
      showBack>
      <View style={styles.card}>
        <Text style={styles.step}>Inhale for four, exhale for six, and repeat for two quiet minutes.</Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: 28, borderWidth: 1, padding: 20 },
  step: { color: palette.text, fontFamily: fonts?.display, fontSize: 29, lineHeight: 34 },
});
