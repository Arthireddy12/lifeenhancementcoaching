import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScreenShell } from '@/components/screen-shell';
import { coachingHubHeroImage, getConditionImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

type CoachingCondition = {
  title: string;
  slug: string;
};

const coachingConditions: CoachingCondition[] = [
  {
    title: 'MULTIPLE SCLEROSIS',
    slug: 'multiple-sclerosis',
  },
  {
    title: 'LUPUS',
    slug: 'lupus',
  },
  {
    title: 'ULCERATIVE COLITIS',
    slug: 'ulcerative-colitis',
  },
  {
    title: 'RHEUMATOID ARTHRITIS',
    slug: 'rheumatoid-arthritis',
  },
  {
    title: 'MYASTHENIA GRAVIS',
    slug: 'myasthenia-gravis',
  },
  {
    title: "CROHN'S DISEASE",
    slug: 'crohns-disease',
  },
  {
    title: "HASHIMOTO'S DISEASE",
    slug: 'hashimotos-disease',
  },
  {
    title: 'TYPE 1 DIABETES',
    slug: 'type-1-diabetes',
  },
  {
    title: 'OTHER AUTOIMMUNE DISEASES',
    slug: 'other-autoimmune-diseases',
  },
];

export default function CoachingHubScreen() {
  return (
    <ScreenShell title="Coaching" image={coachingHubHeroImage} showBack>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Coaching</Text>
        <Text style={styles.panelBody}>Autoimmune Conditions</Text>
      </View>

      <View style={styles.grid}>
        {coachingConditions.map((item, index) => (
          <Animated.View key={item.title} entering={FadeInDown.duration(470).delay(index * 50)}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/coaching-condition',
                  params: { title: item.title, slug: item.slug },
                })
              }
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
              <Image
                source={getConditionImage(item.slug) || coachingHubHeroImage}
                style={styles.cardImage}
                contentFit="cover"
              />
              <View style={styles.cardCopy}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: palette.panel,
    borderRadius: 28,
    padding: 18,
  },
  panelTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 30,
    lineHeight: 34,
  },
  panelBody: {
    color: palette.muted,
    fontFamily: fonts?.sans,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  grid: {
    gap: 14,
  },
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.95,
  },
  cardImage: {
    height: 160,
    width: '100%',
  },
  cardCopy: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 24,
    lineHeight: 28,
  },
});
