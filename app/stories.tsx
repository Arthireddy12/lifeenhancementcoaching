import { Text, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScreenShell } from '@/components/screen-shell';
import { storiesHeroImage, storyQuotes } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function StoriesScreen() {
  return (
    <ScreenShell
      eyebrow="Client Stories"
      title="Client Stories"
      body="Client Stories"
      image={storiesHeroImage}
      showBack>
      {storyQuotes.map((item, index) => (
        <Animated.View
          key={item.quote}
          entering={FadeInDown.duration(500).delay(index * 70)}
          style={styles.card}>
          <View style={styles.copy}>
            <Text style={styles.quote}>{item.quote}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </Animated.View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  copy: {
    gap: 10,
  },
  quote: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 24,
    lineHeight: 30,
  },
  name: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 12,
  },
});
