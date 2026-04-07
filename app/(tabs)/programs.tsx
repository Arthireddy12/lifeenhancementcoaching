import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';

import { TopNav } from '@/components/top-nav';
import { programsHeroImage, programsSecondaryImage } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

type ProgramItem = {
  title: string;
  subtitle: string;
  body: string;
  href: string;
};

const targets: ProgramItem[] = [
  {
    title: 'One-on-One Personalized Autoimmune Health Coaching Program',
    subtitle: 'Program',
    body: '',
    href: '/reset',
  },
  {
    title: '10-Week Power-Up Energy Program',
    subtitle: 'Program',
    body: '',
    href: '/renewal',
  },
  {
    title: 'Small Group Health Coaching',
    subtitle: 'Program',
    body: '',
    href: '/group-coaching',
  },
  {
    title: '1 Day V.I.P. Coaching Session',
    subtitle: 'Program',
    body: '',
    href: '/coaching',
  },
];

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSectionBody(html: string, heading: string) {
  const pattern = new RegExp(`${escapeRegex(heading)}[\\s\\S]*?(?=<h2|<h1|$)`, 'i');
  const match = html.match(pattern);

  if (!match) return '';

  const paragraphs = Array.from(match[0].matchAll(/<p>([\s\S]*?)<\/p>/gi))
    .map((item) => stripHtml(item[1]))
    .filter(Boolean);

  return paragraphs.slice(0, 2).join(' ');
}

export default function ProgramsScreen() {
  const [programs, setPrograms] = useState<ProgramItem[]>(targets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('https://lifeenhancementcoaching.us/wp-json/wp/v2/pages?slug=services')
      .then((response) => response.json())
      .then((data) => {
        if (!active || !data?.[0]?.content?.rendered) return;

        const html = data[0].content.rendered as string;
        const mapped = targets.map((item) => ({
          ...item,
          body: getSectionBody(html, item.title) || item.body,
        }));

        setPrograms(mapped);
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
          <TopNav />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(560)} style={styles.hero}>
          <Text style={styles.title}>Programs</Text>
        </Animated.View>

        <View style={styles.imageRow}>
          <Image source={programsHeroImage} style={styles.imageLarge} contentFit="cover" />
          <Image source={programsSecondaryImage} style={styles.imageSmall} contentFit="cover" />
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading Programs...</Text>
          </View>
        ) : null}

        {!loading ? (
          <View style={styles.list}>
            {programs.map((program, index) => (
              <Animated.View
                key={program.title}
                entering={FadeInDown.duration(500).delay(index * 60)}>
                <Pressable onPress={() => router.push(program.href as never)} style={styles.card}>
                  <Text style={styles.cardEyebrow}>{program.subtitle}</Text>
                  <Text style={styles.cardTitle}>{program.title}</Text>
                  <Text style={styles.cardBody}>{program.body}</Text>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: palette.background, flex: 1 },
  content: { paddingBottom: 132, paddingHorizontal: 20, paddingTop: 10 },
  navRow: { alignItems: 'flex-end', marginBottom: 16 },
  hero: { gap: 10, marginBottom: 18 },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 36,
    lineHeight: 41,
  },
  imageRow: {
    gap: 12,
    marginBottom: 24,
  },
  imageLarge: {
    borderRadius: 30,
    height: 220,
    width: '100%',
  },
  imageSmall: {
    borderRadius: 30,
    height: 180,
    width: '100%',
  },
  loader: { alignItems: 'center', gap: 12, paddingVertical: 60 },
  loaderText: { color: palette.muted, fontFamily: fonts?.body, fontSize: 14 },
  list: { gap: 14 },
  card: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 30,
    borderWidth: 1,
    padding: 20,
  },
  cardEyebrow: {
    color: palette.accentStrong,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
    marginTop: 8,
  },
  cardBody: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
});
