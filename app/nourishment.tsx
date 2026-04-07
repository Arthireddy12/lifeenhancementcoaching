import { Text, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { nutritionImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function NourishmentScreen() {
  return (
    <ScreenShell
      eyebrow="Nourishment"
      title="Nourishment"
      body="Nourishment"
      image={nutritionImage}
      showBack>
      <View style={styles.card}>
        <Text style={styles.text}>Focus on consistency, easy meals, hydration cues, and reducing decision fatigue around food.</Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: 28, borderWidth: 1, padding: 20 },
  text: { color: palette.text, fontFamily: fonts?.body, fontSize: 15, lineHeight: 23 },
});
