import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InfoCard } from '@/components/info-card';
import { PrimaryButton } from '@/components/primary-button';
import { TopNav } from '@/components/top-nav';
import {
  calmImage,
  communityImage,
  detailScreens,
  focusImage,
  homeHeroImage,
  homeMsFeatureImage,
  homeFeatures,
  nutritionImage,
  resourceImage,
  routineImage,
  stats,
} from '@/constants/content';
import { appShadow, fonts, palette } from '@/constants/theme';

const featureImages = [
  focusImage,
  communityImage,
  calmImage,
  routineImage,
  nutritionImage,
  resourceImage,
];

export default function HomeScreen() {
  const exploreScreens = detailScreens.filter(
    (item) =>
      ![
        'One-on-One Personalized Autoimmune Health Coaching Program',
        'Multiple Sclerosis Wellness Coaching',
        '10-Week Power-Up Energy Program',
        'Small Group Health Coaching',
      ].includes(item.title)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.menuRow}>
          <TopNav showBack={false} />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(620)} style={styles.heroShell}>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Life Enhancement Coaching</Text>
            <Text style={styles.title}>Life Enhancement Coaching</Text>
            <Text style={styles.body}>
              Health and life coaching for autoimmune disease, multiple sclerosis, and chronic
              illness with practical support for energy, stress, resilience, and daily balance.
            </Text>
            <View style={styles.actions}>
              <PrimaryButton label="Book Session" onPress={() => router.push('/book-session')} />
              <PrimaryButton
                label="Open Homepage"
                onPress={() => router.push('/site-home')}
                variant="ghost"
              />
            </View>
          </View>

          <View style={styles.heroVisuals}>
            <Image source={homeHeroImage} style={styles.heroMainImage} contentFit="cover" />
            <Animated.View entering={FadeInDown.duration(680).delay(120)} style={styles.floatingCard}>
              <Text style={styles.floatingEyebrow}>Free Introductory Session</Text>
              <Text style={styles.floatingTitle}>
                Book a free 45 minutes introductory session from here.
              </Text>
            </Animated.View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(620).delay(60)} style={styles.statsRow}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Coaching Features</Text>
          </View>
          <View style={styles.mosaic}>
            {homeFeatures.map((item, index) => (
              <Animated.View
                key={item.title}
                entering={FadeInDown.duration(520).delay(index * 70)}
                style={[styles.mosaicCard, index === 0 && styles.mosaicCardLarge]}>
                <Image
                  source={featureImages[index % featureImages.length]}
                  style={styles.mosaicImage}
                  contentFit="cover"
                />
                <View style={styles.mosaicOverlay}>
                  <Text style={styles.mosaicTitle}>{item.title}</Text>
                  <Text style={styles.mosaicBody}>{item.body}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        <Animated.View entering={FadeInDown.duration(640).delay(120)} style={styles.featureBand}>
          <View style={styles.featureCopy}>
            <Text style={styles.featureEyebrow}>Multiple Sclerosis Wellness Coaching</Text>
            <Text style={styles.featureTitle}>
              Personalized plans tailored to symptoms, goals, lifestyle, and energy levels.
            </Text>
            <PrimaryButton
              label="Open MS Coaching"
              onPress={() => router.push('/ms-support')}
              style={styles.featureButton}
            />
          </View>
          <Image source={homeMsFeatureImage} style={styles.featureImage} contentFit="cover" />
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <View style={styles.cardList}>
            <InfoCard title="Homepage" body="Life Enhancement Coaching" href="/site-home" />
            {exploreScreens.map((item) => (
              <InfoCard key={item.title} title={item.title} body={item.body} href={item.href} />
            ))}
          </View>
        </View>
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
    paddingBottom: 72,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuRow: {
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  heroShell: {
    gap: 18,
  },
  heroCopy: {
    ...appShadow,
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 34,
    borderWidth: 1,
    gap: 14,
    padding: 22,
  },
  kicker: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 38,
    lineHeight: 43,
  },
  body: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  heroVisuals: {
    minHeight: 360,
    position: 'relative',
  },
  heroMainImage: {
    borderRadius: 38,
    height: 360,
    width: '100%',
  },
  floatingCard: {
    ...appShadow,
    backgroundColor: 'rgba(255, 249, 242, 0.94)',
    borderRadius: 24,
    bottom: 16,
    gap: 8,
    left: 16,
    padding: 16,
    position: 'absolute',
    right: 16,
  },
  floatingEyebrow: {
    color: palette.accentStrong,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  floatingTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 23,
    lineHeight: 27,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    backgroundColor: palette.panel,
    borderRadius: 24,
    minHeight: 108,
    width: '48%',
    paddingHorizontal: 16,
    paddingVertical: 18,
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
    gap: 16,
    marginTop: 30,
  },
  sectionHeadingRow: {
    gap: 12,
  },
  sectionTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 34,
  },
  mosaic: {
    gap: 14,
  },
  mosaicCard: {
    borderRadius: 30,
    height: 210,
    overflow: 'hidden',
    position: 'relative',
  },
  mosaicCardLarge: {
    height: 290,
  },
  mosaicImage: {
    height: '100%',
    width: '100%',
  },
  mosaicOverlay: {
    backgroundColor: 'rgba(29, 20, 15, 0.28)',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    padding: 18,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  mosaicTitle: {
    color: palette.white,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
  },
  mosaicBody: {
    color: '#FFF2E9',
    fontFamily: fonts?.body,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: '90%',
  },
  cardList: {
    gap: 14,
    paddingBottom: 28,
  },
  featureBand: {
    ...appShadow,
    backgroundColor: '#F9F1E8',
    borderRadius: 36,
    gap: 16,
    marginTop: 32,
    overflow: 'hidden',
    padding: 16,
  },
  featureCopy: {
    gap: 10,
    paddingHorizontal: 6,
    paddingTop: 4,
  },
  featureEyebrow: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  featureTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 35,
  },
  featureButton: {
    marginTop: 6,
  },
  featureImage: {
    borderRadius: 28,
    height: 220,
    width: '100%',
  },
});
