import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as ExpoCamera from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { sendGoldByQr } from '../services/sendGoldService';
import { findUserByPhone } from '../services/userService';
import { normalizePhone } from '../../../shared/utils/normalize/normalizePhone';

import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import CustomTheme from '../../../shared/styles/CustomThems';

export default function SendGoldByQrForm({ onSuccess }) {
  const currentUser = useSelector((state) => state.user);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    const phone = normalizePhone(data);
    setLoading(true);
    try {
      const user = await findUserByPhone(phone);
      if (!user) throw new Error('Kullanıcı bulunamadı');
      if (user.id === currentUser.id) {
        Alert.alert('Uyarı', 'Kendinize gönderim yapamazsınız.');
        setLoading(false);
        return;
      }

      setFoundUser(user);
      setScannedData(user.id);
      setCameraActive(false);
    } catch {
      Alert.alert('Hata', 'Kullanıcı bulunamadı.');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!scannedData || !amount) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setLoading(true);
    const success = await sendGoldByQr({ targetId: scannedData, amount });
    setLoading(false);

    if (success) {
      Alert.alert('Başarılı', 'Altın gönderildi.');
      onSuccess?.();
    } else {
      Alert.alert('Hata', 'Gönderim sırasında bir hata oluştu.');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.centerText}>Kamera izni isteniyor...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centerText}>Kamera izni reddedildi. Ayarlardan izin veriniz.</Text>
      </View>
    );
  }

  if (cameraActive) {
    return (
      <View style={styles.cameraWrapper}>
        <ExpoCamera.Camera
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          ratio="1:1"
        />
        <TouchableOpacity
          onPress={() => setCameraActive(false)}
          style={styles.cameraCloseButton}
        >
          <Text style={styles.cameraCloseText}>İptal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scannedData ? (
        <>
          <View style={styles.qrHeader}>
            <Text style={styles.phoneText}>{currentUser?.phone || ''}</Text>
            <TouchableOpacity onPress={() => setCameraActive(true)} style={styles.iconButton}>
              <Ionicons name="scan-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.qrWrapper}>
            <QRCode
              value={currentUser?.phone || 'null'}
              size={240}
              logoBackgroundColor="transparent"
              logoSize={48}
              // logo={{ uri: 'https://yourcdn.com/logo.png' }}
            />
          </View>

          <TouchableOpacity onPress={() => setCameraActive(true)} style={styles.qrReadButton}>
            <Text style={styles.qrReadText}>QR Kod Oku</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.resultBox}>
          <Text style={styles.label}>Alıcı:</Text>
          <Text style={styles.value}>{foundUser?.fullName || 'Bilinmeyen Kullanıcı'}</Text>
          <CustomInput
            placeholder="Altın Miktarı"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <CustomButton title="Gönder" onPress={handleSend} />
          <CustomButton
            title="Yeniden Tara"
            onPress={() => {
              setScannedData(null);
              setAmount('');
              setFoundUser(null);
            }}
            type="outline"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  phoneText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 6,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 160,
    elevation: 4,
  },
  qrReadButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  qrReadText: {
    fontSize: 16,
    color: '#555',
  },
  resultBox: {
    width: '100%',
    backgroundColor: CustomTheme.colors.white,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  cameraWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  cameraCloseText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
