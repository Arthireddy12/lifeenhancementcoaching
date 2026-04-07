import { router } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Image } from 'expo-image';

import { InfoCard } from '@/components/info-card';
import { PrimaryButton } from '@/components/primary-button';
import { ScreenShell } from '@/components/screen-shell';
import { contactInfo } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

const connectHeroImage =
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1200';
const connectMainImage =
  'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1200';
const connectSecondaryImage =
  'https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function ConnectScreen() {
  return (
    <ScreenShell
      eyebrow="Connect"
      title="Connect"
      body="Connect"
      image={connectHeroImage}>
      <Animated.View entering={FadeInUp.duration(520)} style={styles.panel}>
        <Text style={styles.title}>Connect</Text>
        <Text style={styles.body}>
          Book a free 45 minutes introductory session from here, or contact Life Enhancement
          Coaching directly by email or phone.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(560).delay(40)} style={styles.quickActions}>
        <PrimaryButton label="Book Session" onPress={() => router.push('/book-session')} />
        <PrimaryButton
          label="Send Email"
          onPress={() => Linking.openURL(`mailto:${contactInfo.email}`)}
          variant="ghost"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(580).delay(80)} style={styles.imageRow}>
        <Image source={connectMainImage} style={styles.imageCardLarge} contentFit="cover" />
        <Image source={connectSecondaryImage} style={styles.imageCardSmall} contentFit="cover" />
      </Animated.View>

      <View style={styles.infoGrid}>
        <InfoCard
          title="Free 45-Min Intro Session"
          body="Book a free 45 minutes introductory session from here."
          href="/book-session"
        />
        <InfoCard
          title="Explore Programs"
          body="Review the coaching paths and choose the level of support that fits your season."
          href="/(tabs)/programs"
        />
        <InfoCard
          title="Read FAQ"
          body="Get clear answers about fit, coaching style, and what happens during your first call."
          href="/faq"
        />
        <InfoCard
          title="Contact Us"
          body="Open the dedicated contact page for direct details and quick next steps."
          href="/contact-us"
        />
        <InfoCard
          title="Client Stories"
          body="See the kinds of changes clients describe after building steadier routines and support."
          href="/stories"
        />
      </View>

      <Animated.View entering={FadeInDown.duration(620).delay(110)} style={styles.contactCard}>
        <Text style={styles.contactEyebrow}>Contact</Text>
        <Text style={styles.contactTitle}>Life Enhancement Coaching</Text>
        <Pressable onPress={() => Linking.openURL(`mailto:${contactInfo.email}`)}>
          <Text style={styles.contactLink}>{contactInfo.email}</Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL(`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`)}>
          <Text style={styles.contactLink}>{contactInfo.phone}</Text>
        </Pressable>
        <Text style={styles.contactBody}>{contactInfo.address}</Text>
        <Text style={styles.contactBody}>
          Discovery calls, program questions, and general inquiries all start here.
        </Text>
        <Pressable onPress={() => router.push('/coaching')} style={styles.inlineAction}>
          <Text style={styles.inlineActionText}>See what coaching includes</Text>
        </Pressable>
      </Animated.View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: palette.panel,
    borderRadius: 28,
    padding: 20,
  },
  quickActions: {
    gap: 12,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  imageCardLarge: {
    borderRadius: 28,
    flex: 1.2,
    height: 190,
  },
  imageCardSmall: {
    borderRadius: 28,
    flex: 0.8,
    height: 190,
  },
  infoGrid: {
    gap: 14,
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
  },
  body: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  contactCard: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
    paddingBottom: 44,
  },
  contactEyebrow: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  contactTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
    marginTop: 8,
  },
  contactLink: {
    color: palette.accent,
    fontFamily: fonts?.sans,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 12,
  },
  contactBody: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  inlineAction: {
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  inlineActionText: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 13,
    fontWeight: '700',
  },
});
