import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { WebView } from 'react-native-webview';

import { TopNav } from '@/components/top-nav';
import { fonts, palette } from '@/constants/theme';

const injectedCss = `
  (function() {
    var style = document.createElement('style');
    style.innerHTML = \`
      body {
        background: #f7efe5 !important;
        color: #261a12 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      }
      .site, .site-content, .content-area, .elementor-section, .elementor-container, .elementor-widget-wrap {
        background: transparent !important;
      }
      h1,h2,h3,h4,h5,h6 {
        color: #261a12 !important;
        letter-spacing: -0.02em !important;
      }
      p, li, span, a, div {
        color: inherit;
      }
      .elementor-button, .wp-block-button__link, button, input[type=submit] {
        background: #c76844 !important;
        border-radius: 999px !important;
        border: none !important;
        box-shadow: 0 12px 24px rgba(145, 79, 46, 0.14) !important;
      }
      img {
        border-radius: 24px !important;
      }
      .elementor-widget, .elementor-column, .elementor-widget-container, .post, article {
        border-radius: 28px !important;
      }
      header.site-header, footer.site-footer, .elementskit-navbar-nav, .ekit-template-content-header, .site-branding {
        display: none !important;
      }
      .site-content, #content, main {
        padding-top: 0 !important;
      }
    \`;
    document.head.appendChild(style);
  })();
  true;
`;

type SitePageProps = {
  title: string;
  eyebrow?: string;
  body?: string;
  uri: string;
  showBack?: boolean;
};

export function SitePage({ title, uri, showBack = true }: SitePageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInUp.duration(450)} style={styles.navRow}>
        <TopNav showBack={showBack} />
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(520)} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
      <View style={styles.chrome}>
        <View style={styles.dot} />
        <View style={styles.dotMuted} />
        <View style={styles.dotMuted} />
      </View>
      <Animated.View entering={FadeInDown.duration(620).delay(60)} style={styles.webviewWrap}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
            <Text style={styles.loaderText}>Loading live website content...</Text>
          </View>
        ) : null}
        <WebView
          source={{ uri }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          injectedJavaScript={injectedCss}
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
    marginBottom: 16,
  },
  header: {
    gap: 10,
    marginBottom: 14,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 32,
    lineHeight: 38,
  },
  webviewWrap: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 34,
    borderWidth: 1,
    flex: 1,
    marginBottom: 10,
    marginHorizontal: -8,
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
  chrome: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    paddingLeft: 4,
  },
  dot: {
    backgroundColor: palette.accent,
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  dotMuted: {
    backgroundColor: '#D7C4B3',
    borderRadius: 999,
    height: 10,
    width: 10,
  },
});
