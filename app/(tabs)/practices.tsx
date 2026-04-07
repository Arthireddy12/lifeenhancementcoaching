import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';

import { TopNav } from '@/components/top-nav';
import { knowledgeHeroImage, knowledgeSecondaryImage } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

type ResourceItem = {
  title: string;
  fileUrl: string;
};

function decodeUrl(value: string) {
  return value.replace(/&amp;/g, '&').replace(/\\\//g, '/');
}

export default function PracticesScreen() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('https://lifeenhancementcoaching.us/wp-json/wp/v2/pages?slug=knowledge-hub')
      .then((response) => response.json())
      .then((data) => {
        if (!active || !data?.[0]?.content?.rendered) return;

        const html = data[0].content.rendered as string;
        const matches = Array.from(
          html.matchAll(/<iframe title="([^"]+)"[\s\S]*?url=(http[^"]+?\.pdf)/gi)
        );

        const mapped = matches.map((match) => ({
          title: match[1],
          fileUrl: decodeUrl(match[2]),
        }));

        setResources(mapped);
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
          <Text style={styles.title}>Knowledge Hub</Text>
        </Animated.View>

        <View style={styles.imageRow}>
          <Image source={knowledgeHeroImage} style={styles.imageLarge} contentFit="cover" />
          <Image source={knowledgeSecondaryImage} style={styles.imageSmall} contentFit="cover" />
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading Knowledge Hub...</Text>
          </View>
        ) : null}

        {!loading ? (
          <View style={styles.list}>
            {resources.map((resource, index) => (
              <Animated.View
                key={resource.fileUrl}
                entering={FadeInDown.duration(500).delay(index * 70)}>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: '/resource-viewer',
                      params: { uri: resource.fileUrl, title: resource.title },
                    })
                  }
                  style={styles.card}>
                  <Text style={styles.cardEyebrow}>Resource</Text>
                  <Text style={styles.cardTitle}>{resource.title}</Text>
                  <Text style={styles.cardBody}>Open this resource.</Text>
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
