import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomTheme from '../../../shared/styles/CustomThems';
import CircularQrCode from '../components/CircularQrCode';

export default function QrCodeScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const phoneNumber = route?.params?.phoneNumber || '+93 000 000 00 00';
  const name = route?.params?.name || 'GoldApp Kullanıcısı';

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <Text style={styles.title}>Telefon Numarası</Text>

      {/* Telefon baloncuğu */}
      <View style={styles.phoneBubble}>
        <Ionicons name="call-outline" size={18} color={CustomTheme.colors.primary} />
        <Text style={styles.phoneText}>{phoneNumber}</Text>
      </View>

      {/* QR kod alanı */}
      <View style={styles.qrWrapper}>
        <View style={styles.glowCircle} />
        <View style={styles.qrCircleContainer}>
          <View style={styles.qrCircle}>
            <CircularQrCode
              phone={phoneNumber}
              name={name}
            />
          </View>
        </View>
      </View>

      {/* QR okuma yönlendirme */}
      <TouchableOpacity
        style={styles.readButton}
        onPress={() => navigation.navigate('QrReaderScreen')}
        activeOpacity={0.8}
      >
        <Ionicons name="qr-code-outline" size={20} color={CustomTheme.colors.primary} />
        <Text style={styles.readButtonText}>QR Kodunu Oku</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: CustomTheme.colors.text,
    marginBottom: 12,
  },
  phoneBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CustomTheme.colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 32,
  },
  phoneText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: CustomTheme.colors.text,
  },
  qrWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  glowCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: CustomTheme.colors.primary,
    opacity: 0.05,
  },
  qrCircleContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 140,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 6,
  },
  qrCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CustomTheme.colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  readButtonText: {
    marginLeft: 8,
    color: CustomTheme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
