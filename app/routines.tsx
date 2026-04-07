import { Text, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { routinesHeroImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function RoutinesScreen() {
  return (
    <ScreenShell
      eyebrow="Routines"
      title="Routines"
      body="Routines"
      image={routinesHeroImage}
      showBack>
      {['Morning check-in', 'Midday reset', 'Evening closeout'].map((item) => (
        <View key={item} style={styles.card}>
          <Text style={styles.title}>{item}</Text>
          <Text style={styles.body}>A short sequence of hydration, breath, planning, and realistic review.</Text>
        </View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: 28, borderWidth: 1, padding: 20 },
  title: { color: palette.text, fontFamily: fonts?.sans, fontSize: 16, fontWeight: '700' },
  body: { color: palette.muted, fontFamily: fonts?.body, fontSize: 14, lineHeight: 22, marginTop: 8 },
});
