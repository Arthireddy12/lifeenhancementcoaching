import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { TopNav } from '@/components/top-nav';
import { resourceViewerImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

export default function ResourceViewerScreen() {
  const params = useLocalSearchParams<{ uri?: string; title?: string }>();
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInUp.duration(450)} style={styles.navRow}>
        <TopNav showBack />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(560)} style={styles.hero}>
        <Text style={styles.title}>{params.title || 'Resource'}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(580)} style={styles.imageWrap}>
        <Image source={resourceViewerImage} style={styles.image} contentFit="cover" />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(620).delay(60)} style={styles.viewerWrap}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading Resource...</Text>
          </View>
        ) : null}
        <WebView
          source={{ uri: params.uri || 'https://lifeenhancementcoaching.us/knowledge-hub/' }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
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
    height: 160,
    width: '100%',
  },
  viewerWrap: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 30,
    borderWidth: 1,
    flex: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: palette.background,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: palette.surface,
    gap: 12,
    justifyContent: 'center',
    zIndex: 1,
  },
  loaderText: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 14,
  },
});
