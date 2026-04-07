import { LinkProps, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { appShadow, fonts, palette } from '@/constants/theme';

type InfoCardProps = {
  title: string;
  subtitle?: string;
  body: string;
  href?: LinkProps['href'];
};

export function InfoCard({ title, subtitle, body, href }: InfoCardProps) {
  return (
    <Animated.View entering={FadeInDown.duration(450)}>
      <Pressable
        onPress={() => {
          if (href) {
            router.push(href);
          }
        }}
        style={({ pressed }) => [styles.card, pressed && href ? styles.pressed : undefined]}>
        <View style={styles.top}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <Text style={styles.body}>{body}</Text>
        {href ? <Text style={styles.link}>Open screen</Text> : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    gap: 12,
    padding: 20,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  top: {
    gap: 6,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 27,
    lineHeight: 31,
  },
  subtitle: {
    color: palette.accent,
    fontFamily: fonts?.sans,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  body: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 22,
  },
  link: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 13,
    fontWeight: '700',
  },
});
