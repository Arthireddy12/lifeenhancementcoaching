import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { faqImage, faqItems } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function FaqScreen() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqItems[0]?.question ?? null);

  return (
    <ScreenShell
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      body="Frequently Asked Questions"
      image={faqImage}
      showBack>
      {faqItems.map((item) => (
        <View key={item.question} style={styles.row}>
          <Pressable
            onPress={() =>
              setOpenQuestion((current) => (current === item.question ? null : item.question))
            }
            style={styles.trigger}>
            <Text style={styles.question}>{item.question}</Text>
            <Ionicons
              name={openQuestion === item.question ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={palette.accentStrong}
            />
          </Pressable>
          {openQuestion === item.question ? <Text style={styles.answer}>{item.answer}</Text> : null}
        </View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: 26, borderWidth: 1, gap: 10, padding: 18 },
  trigger: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  question: { color: palette.text, flex: 1, fontFamily: fonts?.sans, fontSize: 16, fontWeight: '700', lineHeight: 22 },
  answer: { color: palette.muted, fontFamily: fonts?.body, fontSize: 14, lineHeight: 22 },
});
