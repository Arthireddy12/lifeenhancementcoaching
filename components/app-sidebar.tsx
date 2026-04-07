import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';

import { fonts, palette } from '@/constants/theme';
import { useSidebar } from '@/hooks/use-sidebar';

const sidebarLinks = [
  { label: 'Home', href: '/(tabs)' },
  { label: 'Coaching', href: '/coaching-hub' },
  { label: 'Programs', href: '/(tabs)/programs' },
  { label: 'Knowledge Hub', href: '/(tabs)/practices' },
  { label: 'Blogs & Resources', href: '/(tabs)/journal' },
  { label: 'Connect', href: '/(tabs)/connect' },
];

const supportLinks = [
  { label: 'Book Session', href: '/book-session' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'My Story', href: '/about' },
  { label: 'Client Stories', href: '/stories' },
  { label: 'FAQ', href: '/faq' },
];

export function AppSidebar() {
  const { isOpen, close } = useSidebar();
  const progress = useSharedValue(0);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, { duration: 260 });
  }, [isOpen, progress]);

  useEffect(() => {
    if (!isOpen) {
      setIsMoreOpen(false);
    }
  }, [isOpen]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [-340, 0]) }],
  }));

  return (
    <View pointerEvents={isOpen ? 'auto' : 'none'} style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable onPress={close} style={StyleSheet.absoluteFill} />
      </Animated.View>
      <Animated.View style={[styles.panel, panelStyle]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Life Enhancement Coaching</Text>
            <Text style={styles.title}>Explore</Text>
          </View>
          <Pressable onPress={close} style={styles.closeButton}>
            <Ionicons name="close" size={20} color={palette.text} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>Main Navigation</Text>
          <View style={styles.links}>
            {sidebarLinks.map((item) => (
              <Animated.View key={item.label}>
                <Pressable
                  onPress={() => {
                    close();
                    router.push(item.href as never);
                  }}
                  style={styles.link}>
                  <Text style={styles.linkText}>{item.label}</Text>
                  <Ionicons name="arrow-forward" size={16} color={palette.mint} />
                </Pressable>
              </Animated.View>
            ))}
          </View>

          <Pressable onPress={() => setIsMoreOpen((value) => !value)} style={styles.dropdownHeader}>
            <Text style={styles.sectionLabelDropdown}>More</Text>
            <Ionicons
              name={isMoreOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={palette.accentStrong}
            />
          </Pressable>
          {isMoreOpen ? (
            <View style={styles.linksSecondary}>
              {supportLinks.map((item) => (
                <Animated.View key={item.label}>
                  <Pressable
                    onPress={() => {
                      close();
                      router.push(item.href as never);
                    }}
                    style={styles.linkSecondary}>
                    <Text style={styles.linkText}>{item.label}</Text>
                    <Ionicons name="chevron-forward" size={16} color={palette.accentStrong} />
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          ) : null}

          <Pressable
            onPress={() => {
              close();
              router.push('/(tabs)/connect');
            }}
            style={styles.footer}>
            <Text style={styles.footerTitle}>Book a free 45-minute introductory session.</Text>
            <Text style={styles.footerBody}>
              Open Connect to book your free 45-minute introductory session.
            </Text>
          </Pressable>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(52, 32, 21, 0.35)',
  },
  panel: {
    backgroundColor: '#F8F0E6',
    bottom: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingTop: 68,
    position: 'absolute',
    top: 0,
    width: 320,
  },
  scrollContent: {
    paddingBottom: 26,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: palette.mint,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 34,
    marginTop: 6,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderWidth: 1,
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  links: {
    gap: 12,
    marginTop: 28,
  },
  linksSecondary: {
    gap: 10,
    marginTop: 12,
  },
  link: {
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderColor: palette.line,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  linkSecondary: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomColor: palette.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 14,
  },
  linkText: {
    color: palette.text,
    fontFamily: fonts?.sans,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionLabel: {
    color: palette.muted,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginTop: 24,
    textTransform: 'uppercase',
  },
  dropdownHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  sectionLabelDropdown: {
    color: palette.muted,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  footer: {
    backgroundColor: palette.accentStrong,
    borderRadius: 24,
    marginTop: 26,
    padding: 18,
  },
  footerTitle: {
    color: palette.white,
    fontFamily: fonts?.display,
    fontSize: 24,
    lineHeight: 28,
  },
  footerBody: {
    color: '#F9E7DE',
    fontFamily: fonts?.body,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
});
