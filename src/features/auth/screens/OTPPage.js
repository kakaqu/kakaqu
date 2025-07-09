import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import OTPForm from '../components/OTPForm';
import { verifyUser } from '../services/otpService';
import { setPhoneNumber } from '../../user/slices/userSlice';
import { showLoading, hideLoading } from '../../../shared/slices/loadingSlice';
import styles from '../styles/otpStyles';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [errorMessage, setErrorMessage] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const phone = route.params?.phoneNumber;
  const expectedOtp = phone?.slice(-6); // demo ortamı için son 6 hane

  // Sayaç işlemi
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return setErrorMessage(t('otp.enter_6_digits'));
    if (otp !== expectedOtp) return setErrorMessage(t('otp.invalid_code'));

    setErrorMessage('');
    dispatch(showLoading());

    try {
      dispatch(setPhoneNumber(phone));
      await verifyUser(phone, dispatch, navigation);
    } catch (err) {
      const key = err?.message || 'error_checking_user';
      setErrorMessage(t(`otp.${key}`) || t('otp.error_checking_user'));
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <OTPForm
          t={t}
          timer={timer}
          errorMessage={errorMessage}
          onChange={setOtp}
          onSubmit={handleVerifyOtp}
          onResend={() => setTimer(60)}
          styles={styles}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPPage;