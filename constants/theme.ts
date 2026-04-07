import { Platform } from 'react-native';

export const palette = {
  background: '#F4EFE7',
  surface: '#FFF9F2',
  surfaceElevated: '#F8EEE2',
  panel: '#EDE1D2',
  text: '#261A12',
  muted: '#7A685E',
  accent: '#C76844',
  accentStrong: '#A44727',
  mint: '#5D8B7E',
  line: '#DECDBB',
  white: '#FFFFFF',
  dark: '#1D140F',
};

export const fonts = Platform.select({
  ios: {
    sans: 'Avenir Next',
    body: 'Avenir Next',
    display: 'Georgia',
  },
  android: {
    sans: 'sans-serif-medium',
    body: 'sans-serif',
    display: 'serif',
  },
  default: {
    sans: 'System',
    body: 'System',
    display: 'serif',
  },
});

export const appShadow = {
  shadowColor: '#4B2E1F',
  shadowOffset: { width: 0, height: 14 },
  shadowOpacity: 0.12,
  shadowRadius: 22,
  elevation: 7,
};

export const Colors = {
  light: {
    text: palette.text,
    background: palette.background,
    tint: palette.accent,
    icon: palette.muted,
    tabIconDefault: '#A59287',
    tabIconSelected: palette.accent,
  },
  dark: {
    text: palette.text,
    background: palette.background,
    tint: palette.accent,
    icon: palette.muted,
    tabIconDefault: '#A59287',
    tabIconSelected: palette.accent,
  },
};
