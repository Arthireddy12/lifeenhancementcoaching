import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TopNav } from '@/components/top-nav';
import { blogFallbackImage, getRelevantImageForTopic } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

type ArticleState = {
  title: string;
  date: string;
  image?: string;
  blocks: ArticleBlock[];
};

type ArticleBlock =
  | { type: 'heading'; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'bullet'; content: string[] };

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#038;/g, '&')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatInlineHtml(value: string) {
  return value
    .replace(/<(strong|b)[^>]*>/gi, '**')
    .replace(/<\/(strong|b)>/gi, '**')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#038;/g, '&')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\*\*\s+/g, '**')
    .replace(/\s+\*\*/g, '**')
    .trim();
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getSlug(value?: string) {
  if (!value) return '';
  const clean = value.split('?')[0].replace(/\/+$/, '');
  const parts = clean.split('/');
  return parts[parts.length - 1] || '';
}

function getArticleBlocks(html: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const pattern = /<(h2|h3|p|ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;

  for (const match of html.matchAll(pattern)) {
    const tag = match[1].toLowerCase();
    const content = match[2];

    if (tag === 'h2' || tag === 'h3') {
      const heading = stripHtml(content);
      if (heading) blocks.push({ type: 'heading', content: heading });
      continue;
    }

    if (tag === 'p') {
      const paragraph = formatInlineHtml(content);
      if (paragraph) blocks.push({ type: 'paragraph', content: paragraph });
      continue;
    }

    const items = Array.from(content.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
      .map((item) => formatInlineHtml(item[1]))
      .filter(Boolean);

    if (items.length) {
      blocks.push({ type: 'bullet', content: items });
    }
  }

  return blocks.length ? blocks : [{ type: 'paragraph', content: stripHtml(html) }];
}

function renderFormattedText(value: string) {
  const parts = value.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    const isBold = part.startsWith('**') && part.endsWith('**');
    const text = isBold ? part.slice(2, -2) : part;

    return (
      <Text key={`${text}-${index}`} style={isBold ? styles.paragraphBold : undefined}>
        {text}
      </Text>
    );
  });
}

export default function BlogPostScreen() {
  const params = useLocalSearchParams<{ uri?: string; title?: string }>();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<ArticleState | null>(null);

  useEffect(() => {
    let active = true;
    const slug = getSlug(params.uri);

    if (!slug) {
      setLoading(false);
      return;
    }

    fetch(`https://lifeenhancementcoaching.us/wp-json/wp/v2/posts?slug=${slug}&_embed=1`)
      .then((response) => response.json())
      .then((data) => {
        if (!active || !data?.[0]) return;

        const post = data[0];
        const rendered = post?.content?.rendered || '';

        setArticle({
          title: stripHtml(post?.title?.rendered || params.title || 'Article'),
          date: formatDate(post?.date || new Date().toISOString()),
          image: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          blocks: getArticleBlocks(rendered),
        });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [params.title, params.uri]);

  const title = article?.title || params.title || 'Article';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.navRow}>
          <TopNav showBack />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(560)} style={styles.hero}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading Article...</Text>
          </View>
        ) : null}

        {!loading && article ? (
          <View style={styles.section}>
            <Animated.View entering={FadeInDown.duration(580)}>
              <Image
                source={article.image || getRelevantImageForTopic(title) || blogFallbackImage}
                style={styles.image}
                contentFit="cover"
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(620).delay(50)} style={styles.dateCard}>
              <Text style={styles.date}>{article.date}</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(650).delay(90)} style={styles.copyCard}>
              {article.blocks.map((block, index) => {
                if (block.type === 'heading') {
                  return (
                    <Text key={`${block.content}-${index}`} style={styles.subheading}>
                      {block.content}
                    </Text>
                  );
                }

                if (block.type === 'bullet') {
                  return (
                    <View key={`${block.content[0]}-${index}`} style={styles.bulletList}>
                      {block.content.map((item, itemIndex) => (
                        <View key={`${item}-${itemIndex}`} style={styles.bulletRow}>
                          <Text style={styles.bulletMark}>•</Text>
                          <Text style={styles.paragraph}>{renderFormattedText(item)}</Text>
                        </View>
                      ))}
                    </View>
                  );
                }

                return (
                  <Text key={`${block.content.slice(0, 20)}-${index}`} style={styles.paragraph}>
                    {renderFormattedText(block.content)}
                  </Text>
                );
              })}
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
    marginBottom: 18,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 34,
    lineHeight: 40,
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
  section: {
    gap: 14,
  },
  image: {
    borderRadius: 30,
    height: 240,
    width: '100%',
  },
  dateCard: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5E8DB',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  date: {
    color: palette.accentStrong,
    fontFamily: fonts?.sans,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  copyCard: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  subheading: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 24,
    lineHeight: 29,
    marginBottom: 10,
    marginTop: 6,
  },
  paragraph: {
    color: palette.text,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
  },
  paragraphBold: {
    color: palette.text,
    fontFamily: fonts?.sans,
    fontWeight: '700',
  },
  bulletList: {
    gap: 10,
    marginBottom: 14,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 10,
  },
  bulletMark: {
    color: palette.accentStrong,
    fontFamily: fonts?.display,
    fontSize: 18,
    lineHeight: 24,
  },
});
