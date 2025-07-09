import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SendGoldByPhoneForm from '../components/SendGoldByPhoneForm';
import SendGoldByQrForm from '../components/SendGoldByQrForm';
import SendGoldTabs from '../components/SendGoldTabs';
import CustomTheme from '../../../shared/styles/CustomThems';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../../shared/slices/globalModalSlice';

export default function SendGoldModal() {
  const [method, setMethod] = useState('qr');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <View style={styles.modal}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("sendGold.title")}</Text>
        <TouchableOpacity onPress={() => dispatch(hideModal())}>
          <Ionicons name="close" size={24} color={CustomTheme.colors.black} />
        </TouchableOpacity>
      </View>

      <SendGoldTabs method={method} setMethod={setMethod} />

      {method === 'phone' ? <SendGoldByPhoneForm /> : <SendGoldByQrForm />}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: CustomTheme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
