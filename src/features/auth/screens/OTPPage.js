import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import OTpInput from '../../../shared/components/forms/OTpInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import { verifyUser } from '../services/otpService';
import styles from '../styles/otpStyles';
import { setPhoneNumber } from '../../user/slices/userSlice';


const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const otpInputRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const phone = route.params?.phoneNumber;
  const expectedOtp = phone?.slice(-6);

  // Sayaç başlat
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);


  const handleVerifyOtp = async () => {
  if (otp.length !== 6) {
    return setErrorMessage(t('otp.enter_6_digits'));
  }

  if (otp !== expectedOtp) {
    return setErrorMessage(t('otp.invalid_code'));
  }
  dispatch(setPhoneNumber(phone));
  setLoading(true);
  setErrorMessage('');

  try {
    await verifyUser(phone, dispatch, navigation);
  } catch (err) {
    const key = err?.message || 'error_checking_user';
    setErrorMessage(t(`otp.${key}`) || t('otp.error_checking_user'));
  } finally {
    setLoading(false);
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{t('otp.title')}</Text>
        <Text style={styles.subtitle}>{t('otp.enter_code')}</Text>

        <View style={styles.otpContainer}>
          <OTpInput length={6} onChange={setOtp} ref={otpInputRef} />
        </View>

        {errorMessage !== '' && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <View style={styles.buttonWrapper}>
          <CustomButton
            style={styles.button}
            buttonText={loading ? t('otp.checking') : t('otp.confirm')}
            onPress={handleVerifyOtp}
            disabled={loading}
          />
        </View>

        <Text style={styles.timerText}>
          {timer > 0
            ? `${t('otp.time_left')} ${timer} ${t('otp.seconds')}`
            : t('otp.expired')}
        </Text>

        {timer === 0 && (
          <TouchableOpacity style={styles.resendContainer} onPress={() => setTimer(60)}>
            <Text style={styles.resendText}>{t('otp.resend')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPPage;

