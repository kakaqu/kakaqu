import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import CustomTheme from '../../../shared/styles/CustomThems';

export default function QrCodeScreen() {
  const route = useRoute();
  const phoneNumber = route?.params?.phoneNumber || '+93 000 000 00 00';

  return (
    <View style={styles.container}>
      {/* Phone Info */}
      <Text style={styles.title}>Telefon Numarası</Text>
      <View style={styles.phoneBubble}>
        <Ionicons name="call-outline" size={18} color={CustomTheme.colors.primary} />
        <Text style={styles.phoneText}>{phoneNumber}</Text>
      </View>

      {/* QR Kod Alanı */}
      <View style={styles.qrWrapper}>
        <View style={styles.glowCircle} />
        <View style={styles.qrContainer}>
          <QRCode
            value={phoneNumber}
            size={200}
            color={CustomTheme.colors.primary}
            backgroundColor="transparent"
            logo={require('../../../assets/logo/app_icon.png')}
            logoSize={50}
            logoBackgroundColor="transparent"
          />
        </View>
      </View>

      {/* Oku Butonu */}
      <TouchableOpacity style={styles.readButton}>
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
    opacity: 0.06,
  },
  qrContainer: {
    width: 220,
    height: 220,
    backgroundColor: CustomTheme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
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
