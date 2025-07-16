import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import styles from '../styles/shopReasonModalStyles';
import { hideModal } from '../../../shared/slices/globalModalSlice';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import CustomTheme from '../../../shared/styles/CustomThems';
import CancelButton from '../../../shared/components/buttons/CancelButton';
import { useTranslation } from 'react-i18next';



export default function ShopReasonModal({ type = 'block', shop, onSubmit }) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const isBlock = type === 'block';
  const isReport = type === 'report';

  const validateReason = (value) => {
    if (!value.trim()) return t('validation.empty');
    if (value.trim().length < 15) return t('validation.minLength');
    return '';
  };

  const handleChange = (value) => {
    setReason(value);
    const validationError = validateReason(value);
    setError(validationError);
  };

  const handleConfirm = () => {
    const validationError = validateReason(reason);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(reason.trim()); // dışarıdan gelen callback
    dispatch(hideModal());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.shopTitle}>{shop.name}</Text>

      <Text style={styles.question}>
        {isBlock && t('shop_reason_modal.blockQuestion')}
        {isReport && t('shop_reason_modal.reportQuestion')}
      </Text>

      <CustomInput
        value={reason}
        setValue={handleChange}
        label={isBlock ? t('shop_reason_modal.blockLabel') : t('shop_reason_modal.reportLabel')}
        placeholder={isBlock ? t('shop_reason_modal.blockPlaceholder') : t('shop_reason_modal.reportPlaceholder')}
        iconName={isBlock ? 'block' : 'report'}
        error={error}
      />
      <View style={{ flexDirection: 'row', marginTop: 24, gap: 12 }}>
        
      <View style={{ flex: 0.4 }}>
        <CancelButton onPress={() => dispatch(hideModal())} buttonText={t('shop_reason_modal.cancelButton')} />
      </View>


      <View style={{ flex: 0.6 }}>
        <CustomButton
          buttonText={t('shop_reason_modal.confirmButton')}
          onPress={handleConfirm}
          style={{
            backgroundColor: CustomTheme.colors.primary,
            height: 36,
          }}
          textStyle={{
            color: '#fff',
            fontWeight: '600',
            fontSize: 14,
          }}
        />
      </View>
    </View>


    </View>
  );
}
