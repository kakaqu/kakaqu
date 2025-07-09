import React from 'react';
import { ActivityIndicator, TouchableOpacity, Text, View } from 'react-native';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import CustomTheme from '../../../shared/styles/CustomThems';
import { useSelector } from 'react-redux';


const LoginForm = ({
  phoneNumber,
  setPhoneNumber,
  validatePhone,
  handleLogin,
  t,
  styles,
  navigation,
}) => {
  return (
    <>
      <CustomInput
        label={t('fields.phone')}
        type="phone"
        value={phoneNumber}
        setValue={setPhoneNumber}
        placeholder="7XX XXX XXX"
        showCountryPicker={() => {}}
        countryCode="+93"
        error={
          !validatePhone() && phoneNumber !== ''
            ? t('validation.phone')
            : ''
        }
      />
        <CustomButton
          buttonText={t('form.phoneSubmit')}
          onPress={handleLogin}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.registerBox}
      >
        <Text style={styles.registerLink}>{t('login.have_account')}</Text>
      </TouchableOpacity>
    </>
  );
};

export default LoginForm;
