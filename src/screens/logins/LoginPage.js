import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomTheme from '../../styles/CustomThems';
import { setPhoneNumber } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const LoginPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {phoneNumber, buttonText} = useSelector(state => state.user);

  const validatePhone = () => phoneNumber.replace(/\D/g, '').length === 9;

  const handleLogin = () => {
    if (!validatePhone()) {
      Alert.alert("خطا", "لطفا یک شماره معتبر ۹ رقمی وارد کنید.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPPage', { phoneNumber: `+93${phoneNumber.replace(/\D/g, '')}` });
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Logo */}
          <Image source={require('../../../assets/app_icon.png')} style={styles.logo} />

          {/* Başlık ve açıklama */}
          <Text style={styles.title}>به بازار آنلاین خوش آمدید</Text>
          <Text style={styles.subtitle}>لطفا شماره تماس خود را وارد کنید</Text>

          {/* Telefon Giriş */}
          <CustomInput
            label="شماره تماس:"
            type="phone"
            value={phoneNumber}
            setValue={(val) => dispatch(setPhoneNumber(val))}
            placeholder="7XX XXX XXX"
            showCountryPicker={() => {}}            
            countryCode="+93"
            error={!validatePhone() && phoneNumber !== '' ? 'شماره معتبر وارد کنید' : ''}
          />

          {/* Giriş Butonu */}
          {loading ? (
            <ActivityIndicator size="large" color={CustomTheme.colors.primary} />
          ) : (
            <CustomButton
              buttonText={buttonText}
              onPress={handleLogin}
              style={styles.button}
              textStyle={styles.buttonText}
            />
          )}

          {/* Kayıt Ol Linki */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>حساب ندارید؟ ثبت نام کنید</Text>
          </TouchableOpacity>

          {/* Kullanım Şartları ve Gizlilik */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              با ادامه دادن، شما موافقت خود را با{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://example.com/terms')}
              >
                شرایط استفاده
              </Text>{' '}
              و{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://example.com/privacy')}
              >
                سیاست حفظ حریم خصوصی
              </Text>{' '}
              قبول می‌کنید.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.white,
  },
  scroll: {
    padding: 24,
    alignItems: 'center',
    
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    marginTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: CustomTheme.colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: CustomTheme.colors.placeholder,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: CustomTheme.colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 16,
  },
  buttonText: {
    color: CustomTheme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 20,
    color: CustomTheme.colors.secondary,
    fontWeight: '500',
  },
  termsContainer: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 12,
    color: CustomTheme.colors.placeholder,
    textAlign: 'center',
  },
  link: {
    color: CustomTheme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
