import { View, Text, StyleSheet } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { vipHeroImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

const steps = [
  'This 8-hour V.I.P. session focuses on one urgent problem area and is designed to create identity-level change.',
  'The format includes coaching, reflection, strategy, and practical action around the issue you most want to solve.',
  'A 1-hour lunch break is built into the day, making it a focused single-day intensive experience.',
];

export default function CoachingScreen() {
  return (
    <ScreenShell
      eyebrow="Program"
      title="1 Day V.I.P. Coaching Session"
      body="1 Day V.I.P. Coaching Session"
      image={vipHeroImage}
      showBack>
      {steps.map((step, index) => (
        <View key={step} style={styles.row}>
          <Text style={styles.count}>0{index + 1}</Text>
          <Text style={styles.text}>{step}</Text>
        </View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: 26, borderWidth: 1, flexDirection: 'row', gap: 14, padding: 18 },
  count: { color: palette.accent, fontFamily: fonts?.display, fontSize: 28, lineHeight: 32 },
  text: { color: palette.text, flex: 1, fontFamily: fonts?.body, fontSize: 15, lineHeight: 23, paddingTop: 4 },
});
