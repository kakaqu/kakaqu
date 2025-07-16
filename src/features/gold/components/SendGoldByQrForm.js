import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import CircularQrCode from './CircularQrCode';
import SendGoldToUser from '../../gold/components/SendGoldToUser';
import CustomTheme from '../../../shared/styles/CustomThems';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';
import { useTranslation } from 'react-i18next';



export default function SendGoldByQrForm({ onSuccess }) {
  const navigation = useNavigation();
  const currentUserId = useSelector((state) => state.user.id);
  const phoneNumber = useSelector((state) => state.user.mobile);
  const name = useSelector((state) => state.user.name || 'GoldApp Kullanıcısı');
  const [scannedData, setScannedData] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleScanComplete = async (scannedPhone) => {
      dispatchAlert(dispatch, {
        type: 'success',
        title: t("info.successTitle"),
        message: t("messages.successMessage"),
        submitText: t("form.ok"),
        onSubmit: () => {
          onSuccess?.();
        },
      });
  };
  const validatePhoneGoldForm = {};

// Altın gönderme örneği
const handleSend = async () => {
  const error = validatePhoneGoldForm({ phone: scannedData?.mobile, amount });
  if (error) {
    dispatchAlert(dispatch, {
      type: 'error',
      title: t("info.error"),
      message: error,
      submitText: t("form.ok"),
    });
    return;
  }

  try {
    const success = true;

    if (success) {
      dispatchAlert(dispatch, {
        type: 'success',
        title: t("info.successTitle"),
        message: t("messages.successMessage"),
        submitText: t("form.ok"),
        onSubmit: () => {
          onSuccess?.();
        },
      });
    } else {
      dispatchAlert(dispatch, {
        type: 'error',
        title: t("info.error"),
        message: t("messages.errorMessage"),
        submitText: t("form.ok"),
      });
    }
  } catch (err) {
    console.error('❌ Altın gönderme hatası:', err);

    dispatchAlert(dispatch, {
      type: 'error',
      title: t("info.error"),
      message: t("messages.tryAgainMessage"),
      submitText: t("form.ok"),
    });
  }
};


  return (
    <View style={styles.form}>
      {!scannedData ? (
        <>
          <Text style={styles.title}>{t("sendGold.qr_title")}</Text>

          <View style={styles.qrWrapper}>
            <View style={styles.glowCircle} />
            <View style={styles.qrCircleContainer}>
              <View style={styles.qrCircle}>
                <CircularQrCode phone={phoneNumber} name={name} />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.qrButton}
            onPress={handleScanComplete}
            activeOpacity={0.8}
          >
            <Ionicons name="qr-code-outline" size={20} color={CustomTheme.colors.white} />
            <Text style={styles.qrButtonText}>{t("sendGold.qr_scan")}</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator
              size="large"
              color={CustomTheme.colors.primary}
              style={styles.loader}
            />
          )}
        </>
      ) : (
        <SendGoldToUser
          user={scannedData}
          amount={amount}
          setAmount={setAmount}
          onSend={handleSend}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
    padding: 20,
    backgroundColor: CustomTheme.colors.background,
    borderRadius: 16,
  },
  loader: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: CustomTheme.colors.primary,
  },
  qrWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
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
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CustomTheme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    alignSelf: 'center',
    gap: 8,
  },
  qrButtonText: {
    color: CustomTheme.colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
