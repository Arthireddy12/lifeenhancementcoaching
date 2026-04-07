import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TopNav } from '@/components/top-nav';
import { blogFallbackImage } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  link: string;
};

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function JournalScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('https://lifeenhancementcoaching.us/wp-json/wp/v2/posts?per_page=6&_embed=1')
      .then((response) => response.json())
      .then((data) => {
        if (!active) return;

        const mapped = data.map((item: any) => ({
          id: item.id,
          title: stripHtml(item.title.rendered),
          excerpt: stripHtml(item.excerpt.rendered),
          date: formatDate(item.date),
          image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          link: item.link,
        }));

        setPosts(mapped);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.menuRow}>
          <TopNav />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(560)} style={styles.hero}>
          <Text style={styles.title}>Blogs & Resources</Text>
        </Animated.View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading Blogs & Resources...</Text>
          </View>
        ) : null}

        {!loading && featured ? (
          <Animated.View entering={FadeInDown.duration(620).delay(60)} style={styles.featuredWrap}>
            <Image
              source={featured.image || blogFallbackImage}
              style={styles.featuredImage}
              contentFit="cover"
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredDate}>{featured.date}</Text>
              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <Text style={styles.featuredExcerpt} numberOfLines={4}>
                {featured.excerpt}
              </Text>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/blog-post',
                    params: { uri: featured.link, title: featured.title },
                  })
                }
                style={styles.featuredButton}>
                <Text style={styles.featuredButtonText}>Read Article</Text>
              </Pressable>
            </View>
          </Animated.View>
        ) : null}

        {!loading ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Articles</Text>
            <View style={styles.list}>
              {rest.map((post, index) => (
                <Animated.View
                  key={post.id}
                  entering={FadeInDown.duration(500).delay(100 + index * 60)}>
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: '/blog-post',
                        params: { uri: post.link, title: post.title },
                      })
                    }
                    style={styles.postCard}>
                    <Image
                      source={post.image || blogFallbackImage}
                      style={styles.postImage}
                      contentFit="cover"
                    />
                    <View style={styles.postCopy}>
                      <Text style={styles.postDate}>{post.date}</Text>
                      <Text style={styles.postTitle}>{post.title}</Text>
                      <Text style={styles.postExcerpt} numberOfLines={3}>
                        {post.excerpt}
                      </Text>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
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
  menuRow: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  hero: {
    gap: 10,
    marginBottom: 18,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 36,
    lineHeight: 41,
  },
  loader: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 60,
  },
  loaderText: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 14,
  },
  featuredWrap: {
    borderRadius: 34,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    height: 430,
    width: '100%',
  },
  featuredOverlay: {
    backgroundColor: 'rgba(29, 20, 15, 0.38)',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    padding: 22,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  featuredDate: {
    color: '#FDE6D6',
    fontFamily: fonts?.sans,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: palette.white,
    fontFamily: fonts?.display,
    fontSize: 31,
    lineHeight: 36,
    marginTop: 10,
  },
  featuredExcerpt: {
    color: '#FFF4EC',
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
    maxWidth: '92%',
  },
  featuredButton: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accent,
    borderRadius: 999,
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  featuredButtonText: {
    color: palette.white,
    fontFamily: fonts?.sans,
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    gap: 14,
    marginTop: 28,
  },
  sectionTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 34,
  },
  list: {
    gap: 14,
  },
  postCard: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
  },
  postImage: {
    height: 200,
    width: '100%',
  },
  postCopy: {
    gap: 8,
    padding: 18,
  },
  postDate: {
    color: palette.accentStrong,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  postTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 27,
    lineHeight: 31,
  },
  postExcerpt: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 14,
    lineHeight: 22,
  },
});
