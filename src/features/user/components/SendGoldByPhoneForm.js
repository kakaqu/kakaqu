import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { sendGoldByPhone } from '../services/sendGoldService';
import { validatePhoneGoldForm } from '../validators/sendGoldValidator';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import { findUserByMobile } from '../services/userService';
import CustomTheme from '../../../shared/styles/CustomThems';
import { normalizePhone } from '../../../shared/utils/normalize/normalizePhone';

export default function SendGoldByPhoneForm({ onSuccess }) {
  const currentUserId = useSelector((state) => state.user.id);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription]= useState('');
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  

  
  const validatePhone = () => phoneNumber.replace(/\D/g, '').length === 9;

  const handleVerify = async () => {
    if (!validatePhone()) {
      Alert.alert(t('validation.phone'));
      return;
    }
    const normalized = normalizePhone(phoneNumber); 
    console.log("normalze")
    console.log(normalized)

    setLoading(true);
    const user = await findUserByMobile(normalized);
    setLoading(false);

    if (user) {
      setFoundUser(user);
    } else {
      Alert.alert(t('validation.userNotFound'), t('validation.invalid_phone'));
    }
  };

  const handleSend = async () => {
    const error = validatePhoneGoldForm({ phone: phoneNumber, amount });
    if (error) return Alert.alert(t('validation.error'), error);

    const success = await sendGoldByPhone({
      fromUserId: currentUserId,
      phone: phoneNumber,
      amount,
    });

    if (success) {
      Alert.alert(t('success.goldSent'));
      onSuccess?.();
    } else {
      Alert.alert(t('error.goldTransferFailed'));
    }
  };

  return (
    <View style={styles.form}>
      {!foundUser && (
        <>
        <Text style={styles.title}>
        ارسال التن با شماره تماس
        </Text>
        <CustomInput
          label="شماره"
          type="phone"
          value={phoneNumber}
          setValue={setPhoneNumber}
          placeholder="7XX XXX XXX"
          showCountryPicker={() => {}}
          countryCode="+93"
          error={
            !validatePhone() && phoneNumber !== ''
              ? "t(validation.phone)"
              : ''
          }
        />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={CustomTheme.colors.primary}
              style={styles.loader}
            />
          ) : (
            <CustomButton
              buttonText='چیک حساب'
              onPress={handleVerify}
              style={styles.button}
              textStyle={styles.buttonText}
            />
          )}
        </>
      )}

      {foundUser && (
        <>
          <View
            style={[
              styles.profileCard,
              {
                backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9',
                borderColor: isDark ? '#333' : '#eee',
              },
            ]}
          >
            <Image
              source={
                foundUser.avatar
                  ? { uri: foundUser.avatar }
                  : require('../../../assets/photo/user_avatar.png')
              }
              style={styles.avatar}
            />
            <View>
              <Text style={[styles.name, { color: isDark ? '#fff' : '#333' }]}>
                {foundUser.name}
              </Text>
              {foundUser.mobile && (
                <Text
                  style={[styles.meta, { color: isDark ? '#ccc' : '#666' }]}
                >
                  {foundUser.mobile}
                </Text>
              )}
            </View>
          </View>

          <CustomInput
            label="مقدار"
            value={amount}
            setValue={setAmount}
            placeholder="مقدارالتن"
            keyboardType="numeric"
            iconName="grid-goldenratio"
          />
            <CustomInput
              label="توضیحات:"
              placeholder="تشریح"
              value={description}
              setValue={setDescription}
              multiline
              numberOfLines={5}
              inputStyle={{ minHeight: 100, textAlignVertical: 'top' }}
              iconName="description"
            />

          <CustomButton
            buttonText="ارسال التین"
            onPress={handleSend}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </>
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
  button: {
    backgroundColor: CustomTheme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: CustomTheme.colors.white,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: CustomTheme.colors.primary,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc', // daha ince ve soft bir kenarlık
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: CustomTheme.colors.primary
  },

});
