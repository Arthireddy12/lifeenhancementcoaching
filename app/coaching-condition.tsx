import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TopNav } from '@/components/top-nav';
import { coachingHubHeroImage, getConditionImage, getRelevantImageForTopic } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

type ConditionContent = {
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
  const parsed = Array.from(html.matchAll(/<p>([\s\S]*?)<\/p>/gi))
    .map((item) => stripHtml(item[1]))
    .filter(Boolean);
  return parsed.length ? parsed : [stripHtml(html)];
}

export default function CoachingConditionScreen() {
  const params = useLocalSearchParams<{ title?: string; slug?: string }>();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ConditionContent | null>(null);

  useEffect(() => {
    let active = true;
    const slug = params.slug || '';

    if (!slug) {
      setLoading(false);
      return;
    }

    fetch(`https://lifeenhancementcoaching.us/wp-json/wp/v2/pages?slug=${slug}`)
      .then((response) => response.json())
      .then((data) => {
        if (!active || !data?.[0]?.content?.rendered) return;

        const page = data[0];
        setContent({
          title: stripHtml(page?.title?.rendered || params.title || 'Coaching'),
          paragraphs: getParagraphs(page.content.rendered).slice(0, 8),
        });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [params.slug, params.title]);

  const title = content?.title || params.title || 'Coaching';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.navRow}>
          <TopNav showBack />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(540)} style={styles.hero}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(580)} style={styles.imageWrap}>
          <Image
            source={
              getConditionImage(params.slug) ||
              getRelevantImageForTopic(`${params.title} ${params.slug}`) ||
              coachingHubHeroImage
            }
            style={styles.image}
            contentFit="cover"
          />
        </Animated.View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading Coaching...</Text>
          </View>
        ) : null}

        {!loading && content ? (
          <Animated.View entering={FadeInDown.duration(620).delay(70)} style={styles.copyCard}>
            {content.paragraphs.map((paragraph, index) => (
              <Text key={`${paragraph.slice(0, 20)}-${index}`} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </Animated.View>
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
  },
  copyCard: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  paragraph: {
    color: palette.text,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
  },
});
