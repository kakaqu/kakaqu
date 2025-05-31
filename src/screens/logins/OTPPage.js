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
import CustomTheme from '../../styles/CustomThems';
import CustomButton from '../../components/CustomButton';
import OTPInput from '../../components/OTpInput';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice'; // yolu senin yapına göre düzelt


const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigation = useNavigation();
  const route = useRoute();
  const otpInputRef = useRef(null);
  const dispatch = useDispatch();


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
  }, [timer]); // timer değiştiğinde yeniden başlat
  

  const handleVerifyOtp = async () => {
    const expectedOtp = route.params?.phoneNumber?.slice(-6);
  
    if (otp.length === 6) {
      if (otp === expectedOtp) {
        setLoading(true); // geçici loading başlat
        setTimeout(() => {
          dispatch(loginSuccess()); // auth durumunu Redux’a aktar
          setLoading(false); // animasyonu kapat (gerekirse)

          //navigation.navigate('LoginConfirm');


          // navigation.navigate('LoginConfirmPage', {
          //   phoneNumber: route.params.phoneNumber,
          // });
        }, 1000); // 1 saniyelik loading efekti
      } else {
        alert('کد وارد شده اشتباه است.');
      }
    } else {
      alert('لطفاً یک کد ۶ رقمی وارد کنید.');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>تأیید شماره تماس</Text>
        <Text style={styles.subtitle}>کد شش‌رقمی ارسال‌شده را وارد کنید</Text>

        <View style={styles.otpContainer}>
          <OTPInput length={6} onChange={setOtp} ref={otpInputRef} />
        </View>
        
        <View style={styles.buttonWrapper}>
          <CustomButton
            style={styles.button}
            buttonText={loading ? 'در حال بررسی...' : 'تأیید کد'}
            onPress={handleVerifyOtp}
            disabled={loading} // opsiyonel: loading sırasında tekrar basılmasın
          />
        </View>


        <Text style={styles.timerText}>
          {timer > 0 ? `⏱ زمان باقی‌مانده: ${timer} ثانیه` : '⏱ زمان به پایان رسید'}
        </Text>

        {timer === 0 && (
          <TouchableOpacity style={styles.resendContainer} onPress={() => setTimer(60)}>
            <Text style={styles.resendText}>ارسال مجدد کد</Text>
          </TouchableOpacity>
        )}

      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.inputBacgournd || '#f4f6f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: CustomTheme.colors.primary || '#2C3E50',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 24,
  },
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
    backgroundColor: CustomTheme.colors.primary || '#3498DB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  timerText: {
    fontSize: 13,
    color: CustomTheme.colors.secondary || '#e74c3c',
    backgroundColor: '#fdecea',
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
    color: CustomTheme.colors.primary || '#2980B9',
    textDecorationLine: 'underline',
  },
});
