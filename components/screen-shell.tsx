import { Image } from 'expo-image';
import { ReactNode, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts, palette } from '@/constants/theme';
import { TopNav } from '@/components/top-nav';
import { heroImage } from '@/constants/content';

type ScreenShellProps = {
  title: string;
  eyebrow?: string;
  body?: string;
  image?: string;
  children: ReactNode;
  showBack?: boolean;
};

export function ScreenShell({
  title,
  image,
  children,
  showBack = true,
}: ScreenShellProps) {
  const [resolvedImage, setResolvedImage] = useState(image || heroImage);

  useEffect(() => {
    setResolvedImage(image || heroImage);
  }, [image]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.menuRow}>
          <TopNav showBack={showBack} />
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(550)} style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
        {image ? (
          <Animated.View entering={FadeInDown.duration(600).delay(80)}>
            <Image
              source={resolvedImage}
              style={styles.image}
              contentFit="cover"
              onError={() => setResolvedImage(heroImage)}
            />
          </Animated.View>
        ) : null}
        <Animated.View entering={FadeInDown.duration(650).delay(120)} style={styles.children}>
          {children}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
  content: {
    paddingBottom: 72,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    gap: 10,
  },
  menuRow: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 36,
    lineHeight: 42,
  },
  image: {
    borderRadius: 30,
    height: 220,
    marginTop: 22,
    width: '100%',
  },
  children: {
    gap: 16,
    marginTop: 24,
  },
});
