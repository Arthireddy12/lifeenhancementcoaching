import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { TopNav } from '@/components/top-nav';
import { homeFeatures, siteHomeBannerImage, siteHomeHeroImage, stats } from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

export default function SiteHomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.navRow}>
          <TopNav showBack />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(560)} style={styles.hero}>
          <Text style={styles.title}>Life Enhancement Coaching</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600)} style={styles.imageWrap}>
          <Image source={siteHomeHeroImage} style={styles.heroImage} contentFit="cover" />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(620).delay(40)} style={styles.statsRow}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coaching Features</Text>
          <View style={styles.featureList}>
            {homeFeatures.map((item, index) => (
              <Animated.View
                key={item.title}
                entering={FadeInDown.duration(480).delay(index * 50)}
                style={styles.featureCard}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureBody}>{item.body}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        <Animated.View entering={FadeInDown.duration(640).delay(80)} style={styles.banner}>
          <Image source={siteHomeBannerImage} style={styles.bannerImage} contentFit="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Multiple Sclerosis Wellness Coaching</Text>
            <PrimaryButton label="Open MS Coaching" onPress={() => router.push('/ms-support')} />
          </View>
        </Animated.View>
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
    fontSize: 36,
    lineHeight: 42,
  },
  imageWrap: {
    marginBottom: 18,
  },
  heroImage: {
    borderRadius: 30,
    height: 230,
    width: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: palette.panel,
    borderRadius: 24,
    minHeight: 108,
    paddingHorizontal: 16,
    paddingVertical: 18,
    width: '48%',
  },
  statValue: {
    color: palette.accentStrong,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
  },
  statLabel: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
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
  featureList: {
    gap: 12,
  },
  featureCard: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 26,
    borderWidth: 1,
    padding: 16,
  },
  featureTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 24,
    lineHeight: 28,
  },
  featureBody: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  banner: {
    borderRadius: 30,
    marginTop: 26,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    height: 230,
    width: '100%',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(30, 21, 15, 0.36)',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bannerTitle: {
    color: palette.white,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 34,
    marginBottom: 12,
  },
});
