import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import { findUserByMobile } from '../../user/services/userService';
import CustomTheme from '../../../shared/styles/CustomThems';
import { normalizePhone } from '../../../shared/utils/normalize/normalizePhone';
import SendGoldToUser from './SendGoldToUser';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../../shared/slices/loadingSlice';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';

export default function SendGoldByPhoneForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentUserPhone = useSelector((state) => state.user.phoneNumber);

  const isAllSameDigits = (str) => /^(\d)\1{8}$/.test(str);
  const isInvalidPrefix = (str) => !/^7\d{8}$/.test(str);
  const isOwnNumber = (normalized) => normalized === currentUserPhone;

  const validatePhone = () => {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length !== 9) return { valid: false, reason: 'phone' };
    if (isAllSameDigits(digits)) return { valid: false, reason: 'fake_phone' };
    if (isInvalidPrefix(digits)) return { valid: false, reason: 'invalid_prefix' };

    const normalized = normalizePhone(phoneNumber);
    if (isOwnNumber(normalized)) return { valid: false, reason: 'own_phone' };

    return { valid: true };
  };

  const handleVerify = async () => {
    const validation = validatePhone();
    if (!validation.valid) return;

    const normalized = normalizePhone(phoneNumber);
    if (isOwnNumber(normalized)) return;

    dispatch(showLoading());

    try {
      const user = await findUserByMobile(normalized);
      if (user) {
        setFoundUser(user);
      } else {
        dispatchAlert(dispatch, {
          type: 'error',
          title: t('validation.userNotFound'),
          message: t('validation.invalid_phone'),
          submitText: t('form.ok'),
        });
      }
    } catch (error) {
      dispatchAlert(dispatch, {
        type: 'error',
        title: t('info.error'),
        message: error.message || t('info.repeat'),
        submitText: t('form.ok'),
      });
    } finally {
      dispatch(hideLoading());
    }
  };

  const validationResult = validatePhone();

  return (
    <View style={styles.form}>
      {!foundUser ? (
        <>
          <Text style={styles.title}>{t('sendGold.phone_title')}</Text>

          <CustomInput
            label={t('fields.phone')}
            type="phone"
            value={phoneNumber}
            setValue={setPhoneNumber}
            placeholder="7XX XXX XXX"
            showCountryPicker={() => {}}
            countryCode="+93"
            error={
              phoneNumber !== '' && !validationResult.valid
                ? t(`validation.${validationResult.reason}`)
                : ''
            }
          />

          <CustomButton
            buttonText={t('sendGold.check_account')}
            onPress={handleVerify}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </>
      ) : (
        <SendGoldToUser user={foundUser} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: CustomTheme.colors.primary,
  },
});
