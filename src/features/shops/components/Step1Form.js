import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import AvatarPicker from './AvatarPicker';
import { setName, setDescription, setMobile, setAvatar } from '../slices/shopSlice';
import styles from '../styles/step1FormStyles';

const Step1Form = ({ submitted, errors, onNext }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const shop = useSelector(state => state.shop);

  const handleContinue = () => {
    const dto = {
      name: shop.name,
      description: shop.description,
      mobile: shop.mobile,
    };
    onNext(dto); // ❗ Sadece dto gönderiyoruz, validasyon yukarıda yapılacak
  };

  return (
    <View>
      <AvatarPicker
        uri={shop.avatar}
        onSelect={(uri) => dispatch(setAvatar(uri))}
        hint={t('shop_register.avatar_hint')}
      />

      <CustomInput
        value={shop.name}
        setValue={(val) => dispatch(setName(val))}
        label={t('shop_register.name')}
        placeholder={t('shop_register.name_placeholder')}
        iconName="store"
        error={submitted ? errors?.name : ''}
      />

      <CustomInput
        type="phone"
        value={shop.mobile}
        setValue={(val) => dispatch(setMobile(val))}
        label={t('fields.phone')}
        placeholder="7XX XXX XXX"
        keyboardType="phone-pad"
        showCountryPicker={() => {}}
        countryCode="+93"
        error={submitted ? errors?.mobile : ''}
      />

      <CustomInput
        value={shop.description}
        setValue={(val) => dispatch(setDescription(val))}
        label={t('sendGold.description_label')}
        placeholder={t('sendGold.description_placeholder')}
        iconName="description"
        error={submitted ? errors?.description : ''}
        multiline
        numberOfLines={5}
        inputStyle={{ minHeight: 70, textAlignVertical: 'top' }}
      />

      <CustomButton
        style={styles.button}
        buttonText={t('form.continue')}
        onPress={handleContinue}
        type="primary"
        iconName="arrow-back-sharp"
        iconLibrary="Ionicons"
      />
    </View>
  );
};


export default Step1Form;
