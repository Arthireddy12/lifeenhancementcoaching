import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TopNav } from '@/components/top-nav';
import { msHeroImage } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

type MsContent = {
  title: string;
  paragraphs: string[];
};

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getParagraphs(html: string) {
  return Array.from(html.matchAll(/<p>([\s\S]*?)<\/p>/gi))
    .map((item) => stripHtml(item[1]))
    .filter(Boolean);
}

export default function MsSupportScreen() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<MsContent | null>(null);

  useEffect(() => {
    let active = true;

    fetch('https://lifeenhancementcoaching.us/wp-json/wp/v2/pages?slug=multiple-sclerosis')
      .then((response) => response.json())
      .then((data) => {
        if (!active || !data?.[0]?.content?.rendered) return;

        const page = data[0];
        const paragraphs = getParagraphs(page.content.rendered).slice(0, 8);

        setContent({
          title: stripHtml(page?.title?.rendered || 'Multiple Sclerosis Wellness Coaching'),
          paragraphs,
        });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.navRow}>
          <TopNav showBack />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(540)} style={styles.hero}>
          <Text style={styles.title}>Multiple Sclerosis Wellness Coaching</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(580)} style={styles.imageWrap}>
          <Image source={msHeroImage} style={styles.image} contentFit="cover" />
        </Animated.View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading Multiple Sclerosis Wellness Coaching...</Text>
          </View>
        ) : null}

        {!loading && content ? (
          <View style={styles.section}>
            <Animated.View entering={FadeInDown.duration(620).delay(70)} style={styles.copyCard}>
              <Text style={styles.cardTitle}>{content.title}</Text>
              {content.paragraphs.map((paragraph, index) => (
                <Text key={`${paragraph.slice(0, 20)}-${index}`} style={styles.paragraph}>
                  {paragraph}
                </Text>
              ))}
            </Animated.View>
          </View>
        ) : null}
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
    paddingBottom: 132,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  navRow: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  hero: {
    marginBottom: 16,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 34,
    lineHeight: 40,
  },
  imageWrap: {
    marginBottom: 14,
  },
  image: {
    borderRadius: 30,
    height: 180,
    width: '100%',
  },
  loader: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 40,
  },
  loaderText: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    gap: 14,
  },
  copyCard: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  cardTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
    marginBottom: 8,
  },
  paragraph: {
    color: palette.text,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
});
