import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import OTpInput from '../../../shared/components/forms/OTpInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';



const OTPForm = ({
  t,
  timer,
  errorMessage,
  onChange,
  onSubmit,
  onResend,
  styles,
}) => {
  const loading = useSelector((state) => state.loading.isLoading);

  return (
    <>
      <Text style={styles.title}>{t('otp.title')}</Text>
      <Text style={styles.subtitle}>{t('otp.enter_code')}</Text>

      <View style={styles.otpContainer}>
        <OTpInput length={6} onChange={onChange} />
        {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>

      <View style={styles.buttonWrapper}>

      <CustomButton
        buttonText={loading ? t('otp.checking') : t('otp.confirm')}
        type="primary"
        iconName="check-circle"
        iconLibrary="Feather"
        onPress={onSubmit}
        disabled={loading}       
        style={styles.button}
      />

      </View>

      <Text style={styles.timerText}>
        {timer > 0
          ? `${t('otp.time_left')} ${timer} ${t('otp.seconds')}`
          : t('otp.expired')}
      </Text>

      {timer === 0 && (
        <TouchableOpacity style={styles.resendContainer} onPress={onResend}>
          <Text style={styles.resendText}>{t('otp.resend')}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default OTPForm;