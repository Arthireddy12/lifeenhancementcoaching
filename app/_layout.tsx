import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppSidebar } from '@/components/app-sidebar';
import { palette } from '@/constants/theme';
import { SidebarProvider } from '@/hooks/use-sidebar';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <SidebarProvider>
      <ThemeProvider
        value={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: palette.background,
            card: palette.surface,
            primary: palette.accent,
            text: palette.text,
            border: palette.line,
          },
        }}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: palette.background },
            headerShown: false,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="about" options={{ title: 'About' }} />
          <Stack.Screen name="coaching" options={{ title: 'Coaching' }} />
          <Stack.Screen name="group-coaching" options={{ title: 'Group Coaching' }} />
          <Stack.Screen name="stories" options={{ title: 'Stories' }} />
          <Stack.Screen name="faq" options={{ title: 'FAQ' }} />
          <Stack.Screen name="reset" options={{ title: 'Reset Program' }} />
          <Stack.Screen name="ms-support" options={{ title: 'MS Support' }} />
          <Stack.Screen name="renewal" options={{ title: 'Renewal' }} />
          <Stack.Screen name="breathwork" options={{ title: 'Breathwork' }} />
          <Stack.Screen name="routines" options={{ title: 'Routines' }} />
          <Stack.Screen name="nourishment" options={{ title: 'Nourishment' }} />
          <Stack.Screen name="coaching-hub" options={{ title: 'Coaching' }} />
          <Stack.Screen name="coaching-condition" options={{ title: 'Coaching' }} />
          <Stack.Screen name="book-session" options={{ title: 'Book Session' }} />
          <Stack.Screen name="contact-us" options={{ title: 'Contact Us' }} />
          <Stack.Screen name="blog-post" options={{ title: 'Blog Post' }} />
          <Stack.Screen name="resource-viewer" options={{ title: 'Resource' }} />
          <Stack.Screen name="site-home" options={{ title: 'Homepage' }} />
        </Stack>
        <AppSidebar />
        <StatusBar style="light" />
      </ThemeProvider>
    </SidebarProvider>
  );
}
