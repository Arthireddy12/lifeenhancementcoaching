import { Text, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { renewalImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function RenewalScreen() {
  return (
    <ScreenShell
      eyebrow="Program"
      title="10-Week Power-Up Energy Program"
      body="10-Week Power-Up Energy Program"
      image={renewalImage}
      showBack>
      <View style={styles.card}>
        <Text style={styles.title}>Included</Text>
        <Text style={styles.text}>
          Baseline Energy/Fatigue Self-Assessment Questionnaire, exercises, actions, checklists,
          tools, materials to keep, and information about energy food, supplements, and
          energy-boosting recipes.
        </Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.panel, borderRadius: 28, padding: 20 },
  title: { color: palette.mint, fontFamily: fonts?.sans, fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  text: { color: palette.text, fontFamily: fonts?.display, fontSize: 29, lineHeight: 34, marginTop: 10 },
});
