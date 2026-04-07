import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

import { bookingUrl } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';
import { TopNav } from '@/components/top-nav';

export default function BookSessionScreen() {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInUp.duration(450)} style={styles.headerWrap}>
        <TopNav showBack />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(550)} style={styles.header}>
        <Text style={styles.title}>Book Session</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(650).delay(80)} style={styles.webviewWrap}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading booking calendar...</Text>
          </View>
        ) : null}
        <WebView
          source={{ uri: bookingUrl }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          allowsInlineMediaPlayback
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
  headerWrap: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  header: {
    gap: 10,
    marginBottom: 20,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 34,
    lineHeight: 40,
  },
  webviewWrap: {
    flex: 1,
    marginBottom: 0,
    marginHorizontal: -20,
    marginTop: 8,
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
