import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SendGoldByPhoneForm from '../components/SendGoldByPhoneForm';
import SendGoldByQrForm from '../components/SendGoldByQrForm';
import SendGoldTabs from '../components/SendGoldTabs';
import CustomTheme from '../../../shared/styles/CustomThems';


export default function SendGoldModal({ visible, onClose }) {
  const [method, setMethod] = useState('phone'); // 'phone' or 'qr'

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Altın Gönder</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={CustomTheme.colors.black} />
            </TouchableOpacity>
          </View>

          <SendGoldTabs method={method} setMethod={setMethod} />

          {method === 'phone' ? (
            <SendGoldByPhoneForm onSuccess={onClose} />
          ) : (
            <SendGoldByQrForm onSuccess={onClose} />
          )}
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: CustomTheme.colors.white,
    borderRadius: 12,
    padding: 16,
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
