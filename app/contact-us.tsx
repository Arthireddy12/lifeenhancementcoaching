import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { ScreenShell } from '@/components/screen-shell';
import { contactInfo, supportImage } from '@/constants/content';
import { fonts, palette } from '@/constants/theme';

const contactApiUrl =
  process.env.EXPO_PUBLIC_CONTACT_API_URL ||
  (Platform.OS === 'web'
    ? '/api/contact'
    : Platform.OS === 'android'
      ? 'http://10.0.2.2:4000/api/contact'
      : 'http://localhost:4000/api/contact');

export default function ContactUsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !note.trim()) {
      Alert.alert('Missing Details', 'Please fill in name, email, phone number, and note.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          note: note.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to submit contact form right now.');
      }

      setName('');
      setEmail('');
      setPhone('');
      setNote('');
      Alert.alert('Submitted', 'Your message has been sent successfully.');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to submit contact form right now.';
      Alert.alert('Submission Failed', message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenShell title="Contact Us" image={supportImage} showBack>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Send Us a Message</Text>
        <Text style={styles.heroBody}>
          Fill out the form below and we&apos;ll have everything needed to follow up with you.
        </Text>
      </View>

      <View style={styles.formCard}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            placeholderTextColor="#A38F84"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
            placeholderTextColor="#A38F84"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Your phone number"
            placeholderTextColor="#A38F84"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="How can we help you?"
            placeholderTextColor="#A38F84"
            multiline
            textAlignVertical="top"
            style={styles.noteInput}
          />
        </View>

        <PrimaryButton
          disabled={submitting}
          label={submitting ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit}
        />
        <PrimaryButton
          label="Open Connect"
          onPress={() => router.push('/(tabs)/connect')}
          variant="ghost"
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Direct Contact</Text>
        <Text style={styles.infoText}>{contactInfo.email}</Text>
        <Text style={styles.infoText}>{contactInfo.phone}</Text>
        <Text style={styles.infoText}>{contactInfo.address}</Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: palette.panel,
    borderRadius: 28,
    padding: 20,
  },
  heroTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 28,
    lineHeight: 32,
  },
  heroBody: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  formCard: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    borderRadius: 28,
    borderWidth: 1,
    gap: 16,
    padding: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: palette.accentStrong,
    fontFamily: fonts?.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#FFF8F1',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    color: palette.text,
    fontFamily: fonts?.body,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  noteInput: {
    backgroundColor: '#FFF8F1',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    color: palette.text,
    fontFamily: fonts?.body,
    fontSize: 15,
    minHeight: 140,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  infoCard: {
    backgroundColor: palette.panel,
    borderRadius: 28,
    padding: 20,
  },
  infoTitle: {
    color: palette.text,
    fontFamily: fonts?.display,
    fontSize: 24,
    lineHeight: 28,
  },
  infoText: {
    color: palette.muted,
    fontFamily: fonts?.body,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
});
