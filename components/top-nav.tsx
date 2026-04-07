import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { palette } from '@/constants/theme';
import { useSidebar } from '@/hooks/use-sidebar';

type TopNavProps = {
  showBack?: boolean;
};

export function TopNav({ showBack = true }: TopNavProps) {
  const { toggle } = useSidebar();
  const navigation = useNavigation();

  const onBack = () => {
    if (navigation.canGoBack()) {
      router.back();
      return;
    }
    router.push('/(tabs)');
  };

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.button}>
            <Ionicons name="chevron-back" size={22} color={palette.text} />
          </Pressable>
        ) : null}
      </View>
      <Pressable onPress={toggle} style={styles.button}>
        <Ionicons name="menu" size={22} color={palette.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    alignItems: 'flex-start',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 249, 242, 0.92)',
    borderColor: palette.line,
    borderRadius: 999,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    width: 46,
    shadowColor: '#7A4A34',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
});
