import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import UserCard from '../../user/components/UserCard';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import CustomTheme from '../../../shared/styles/CustomThems';

import { sendGold } from '../actions/sendGoldAction';
import { validateSendGoldDto } from '../validators/validateSendGoldDto';
import { showLoading, hideLoading } from '../../../shared/slices/loadingSlice';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';
import { hideModal } from '../../../shared/slices/globalModalSlice';


export default function SendGoldToUser({ user, onClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fromUserId = useSelector(state => state.user.id);
  const balance = Number(useSelector(state => state.user.walletBalance));
  const dailyTotal = Number(useSelector(state => state.user.dailyTransferTotal));
  const toUserId = user.id;

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSend = async () => {
    const { isValid, errors: validationErrors } = validateSendGoldDto({
      fromUserId,
      toUserId,
      amount,
      description,
      dailyTotal,
      balance,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const dto = {
      fromUserId,
      toUserId,
      toUserName: user.name,
      amount: Number(amount),
      description: description.trim(),
    };

    dispatch(showLoading());

    try {
      const result = await dispatch(sendGold(dto));

      if (sendGold.fulfilled.match(result)) {
        dispatchAlert(dispatch, {
          type: 'success',
          title: t('info.success'),
          message: t('sendGold.success_message'),
          submitText: t('form.ok'),
        });

        // Başarılı işlemden sonra modalı kapat
      // ✅ Redux ile modalı kapat
        dispatch(hideModal());

        } else {
          throw new Error(result.payload || t('sendGold.fail_message'));
        }


      
    } catch (err) {
      dispatchAlert(dispatch, {
        type: 'error',
        title: t('info.error'),
        message: err.message,
        submitText: t('form.ok'),
      });
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <View style={{ gap: 20 }}>
      <UserCard user={{ name: user.name, avatar: user.avatar, phone: user.mobile }} />

      <CustomInput
        label={t('sendGold.amount_label')}
        value={amount}
        setValue={setAmount}
        placeholder={t('sendGold.amount_placeholder')}
        keyboardType="numeric"
        iconName="stream"
        error={errors.amount ? t(`validation.${errors.amount}`) : ''}
      />

      <CustomInput
        label={t('sendGold.description_label')}
        placeholder={t('sendGold.description_placeholder')}
        value={description}
        setValue={setDescription}
        multiline
        numberOfLines={5}
        inputStyle={{ minHeight: 70, textAlignVertical: 'top' }}
        iconName="description"
        error={errors.description ? t(`validation.${errors.description}`) : ''}
      />

      <CustomButton
        buttonText={t('sendGold.send_button')}
        onPress={handleSend}
        style={styles.button}        
        type="primary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 15,
  },
});
