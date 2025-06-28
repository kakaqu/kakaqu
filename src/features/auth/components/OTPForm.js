import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OTpInput from '../../../shared/components/forms/OTpInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import CustomTheme from '../../../shared/styles/CustomThems';


const OTPForm = ({
  otp,
  setOtp,
  errorMessage,
  loading,
  timer,
  handleVerifyOtp,
  onResendPress,
  t,
  styles
}) => (
  <>
    <View style={styles.otpContainer}>
      <OTpInput length={6} onChange={setOtp} />
      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>

    <View style={styles.buttonWrapper}>
      <CustomButton
        style={styles.button}
        buttonText={loading ? t('otp.checking') : t('otp.confirm')}
        onPress={handleVerifyOtp}
        disabled={loading}
      />
    </View>

    <Text style={styles.timerText}>
      {timer > 0 ? `${t('otp.time_left')} ${timer} ${t('otp.seconds')}` : t('otp.expired')}
    </Text>

    {timer === 0 && (
      <TouchableOpacity style={styles.resendContainer} onPress={onResendPress}>
        <Text style={styles.resendText}>{t('otp.resend')}</Text>
      </TouchableOpacity>
    )}
  </>
);

export default OTPForm;


const styles = StyleSheet.create({
  otpContainer: {
    alignItems: 'center',
    marginBottom: 2,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: CustomTheme.colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  timerText: {
    fontSize: 13,
    color: CustomTheme.colors.secondary,
    backgroundColor: CustomTheme.colors.backgroundColor,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
  },
  resendContainer: {
    marginTop: 14,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 13,
    color: CustomTheme.colors.primary,
    textDecorationLine: 'underline',
  },
    errorText: {
      color: 'red',
      fontSize: 13,
      marginTop: 4,
    },

  
});