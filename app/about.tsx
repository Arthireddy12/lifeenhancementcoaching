import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { TopNav } from '@/components/top-nav';
import { calmImage, focusImage, storyImage } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

type StoryContent = {
  heading: string;
  intro: string;
  bodyOne: string;
  bodyTwo: string;
  experience: string;
};

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function getParagraphs(html: string) {
  return Array.from(html.matchAll(/<p>([\s\S]*?)<\/p>/gi))
    .map((item) => stripHtml(item[1]))
    .filter(Boolean);
}

export default function AboutScreen() {
  const [content, setContent] = useState<StoryContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('https://lifeenhancementcoaching.us/wp-json/wp/v2/pages?slug=my-story')
      .then((response) => response.json())
      .then((data) => {
        if (!active || !data?.[0]?.content?.rendered) return;

        const html = data[0].content.rendered as string;
        const headingMatch = html.match(
          /<h2 class="ekit-heading--title elementskit-section-title ">([\s\S]*?)<\/h2>/i
        );
        const paragraphs = getParagraphs(html);
        const experienceMatch = html.match(
          /<h2 class="elementor-heading-title elementor-size-default">([\s\S]*?)<\/h2>/i
        );

        setContent({
          heading: stripHtml(headingMatch?.[1] || 'My Story'),
          intro: paragraphs[0] || '',
          bodyOne: paragraphs[1] || '',
          bodyTwo: paragraphs[2] || '',
          experience: stripHtml(experienceMatch?.[1] || ''),
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

        <Animated.View entering={FadeInUp.duration(560)} style={styles.hero}>
          <Text style={styles.title}>My Story</Text>
        </Animated.View>

        <View style={styles.imageRow}>
          <Image source={storyImage} style={styles.imageLarge} contentFit="cover" />
          <View style={styles.imageStack}>
            <Image source={focusImage} style={styles.imageSmall} contentFit="cover" />
            <Image source={calmImage} style={styles.imageSmall} contentFit="cover" />
          </View>
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading My Story...</Text>
          </View>
        ) : null}

        {!loading && content ? (
          <View style={styles.section}>
            <Animated.View entering={FadeInDown.duration(540)} style={styles.storyCard}>
              <Text style={styles.storyHeading}>{content.heading}</Text>
              <Text style={styles.storyText}>{content.intro}</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(560).delay(60)} style={styles.splitCard}>
              <View style={styles.splitLeft}>
                <Text style={styles.splitEyebrow}>Experience</Text>
                <Text style={styles.splitTitle}>{content.experience}</Text>
              </View>
              <View style={styles.splitRight}>
                <Text style={styles.storyText}>{content.bodyOne}</Text>
                <Text style={styles.storyText}>{content.bodyTwo}</Text>
              </View>
            </Animated.View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: palette.background, flex: 1 },
  content: { flexGrow: 1, paddingBottom: 24, paddingHorizontal: 20, paddingTop: 10 },
  navRow: { alignItems: 'flex-end', marginBottom: 16 },
  hero: { gap: 10, marginBottom: 18 },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 35,
    lineHeight: 40,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  imageLarge: {
    borderRadius: 30,
    flex: 1.1,
    height: 280,
  },
  imageStack: {
    flex: 0.9,
    gap: 12,
  },
  imageSmall: {
    borderRadius: 30,
    flex: 1,
  },
  loader: { alignItems: 'center', gap: 12, paddingVertical: 60 },
  loaderText: { color: palette.muted, fontFamily: fonts?.body, fontSize: 14 },
  section: { gap: 14, marginTop: 'auto' },
  storyCard: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 30,
    borderWidth: 1,
    padding: 20,
  },
  storyHeading: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 35,
  },
  storyText: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  splitCard: {
    ...appShadow,
    backgroundColor: '#FBF5EE',
    borderColor: palette.line,
    borderRadius: 32,
    borderWidth: 1,
    gap: 18,
    padding: 20,
    paddingBottom: 44,
  },
  splitLeft: {
    gap: 8,
  },
  splitEyebrow: {
    color: palette.accentStrong,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  splitTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
  },
  splitRight: {
    gap: 2,
  },
});
