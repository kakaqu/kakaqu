import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import supabase from '../../../../supabase';
import { setPhoneNumber } from '../../user/slices/userSlice';
import { setLanguages, setSelectedLanguage } from '../../language/slices/languageSlice';
import LanguagePicker from '../../../shared/components/pickers/languagePicker';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';
import LoginForm from '../components/LoginForm';
import TermsAndConditions from '../components/TermsAndConditions';
import styles from '../styles/loginStyles';
import { normalizePhone } from '../../../shared/utils/normalize/normalizePhone'
import { hideLoading, showLoading } from '../../../shared/slices/loadingSlice'

const LoginPage = ({ navigation }) => {

  const { phoneNumber } = useSelector(state => state.user);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { languages, selected } = useSelector((state) => state.language);
  
  

  const validatePhone = () => phoneNumber.replace(/\D/g, '').length === 9;

  const handleLogin = () => {
    if (!validatePhone()) {
      dispatchAlert(dispatch, {
        type: 'warning',
        title: t('messages.error'),
        message: t('validation.invalid_phone'),
        submitText: 'Ok',
      });
      
      return;
    }
    const normalized = normalizePhone(phoneNumber);
    dispatch(showLoading());
    setTimeout(() => {
      dispatch(hideLoading());
      navigation.navigate('OTPPage', {
        phoneNumber: normalized,
      });
    }, 1200);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        dispatch(setLanguages(data));
        const defaultLang = data.find(l => l.is_default) || data[0];
        dispatch(setSelectedLanguage(defaultLang));
        i18n.changeLanguage(defaultLang.code);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Image
            source={require('../../../assets/logo/app_icon.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>{t('login.welcome')}</Text>
          <Text style={styles.subtitle}>{t('login.enter_phone')}</Text>

          <LoginForm
            phoneNumber={phoneNumber}
            setPhoneNumber={val => dispatch(setPhoneNumber(val))}
            validatePhone={validatePhone}
            handleLogin={handleLogin}
            t={t}
            styles={styles}
            navigation={navigation}
          />

          <LanguagePicker
            options={languages}
            selectedValue={selected.code}
            setSelectedValue={(code) => {
              const selectedLangObj = languages.find(l => l.code === code);
              if (selectedLangObj) {
                dispatch(setSelectedLanguage(selectedLangObj));
                i18n.changeLanguage(code);
              }
            }}
          />

          <TermsAndConditions t={t} styles={styles} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage;
