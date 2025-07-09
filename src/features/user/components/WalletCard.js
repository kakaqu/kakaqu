import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import CustomTheme from '../../../shared/styles/CustomThems';
// import SendGoldModal from '../modals/SendGoldModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../../shared/slices/globalModalSlice';


export default function WalletCard({ navigation, gold }) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const showModalState = useSelector(state => state.globalModal.visible);

  return (
    <View style={styles.walletCard}>
      <Text style={styles.walletLabel}>{t("wallet.title")}</Text>
      <Text style={styles.goldAmount}>{gold} {t("wallet.gold_unit")}</Text>

      <View style={styles.walletButtons}>
        <TouchableOpacity
          style={styles.walletButton}
          onPress={() => dispatch(showModal({ content: 'LAST_TRANSACTIONS' }))}>
          <Ionicons name="list-outline" size={18} color={CustomTheme.colors.white} />
          <Text style={styles.walletButtonText}>{t("wallet.history")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.walletButton}
          onPress={() =>  dispatch(showModal({ content: 'SEND_GOLD' }))} // 🔁 modal aç
        >
          <Feather name="send" size={18} color={CustomTheme.colors.white} />
          <Text style={styles.walletButtonText}>{t("wallet.send")}</Text>
        </TouchableOpacity>
      </View>

      {/* 🔁 Modal bileşeni */}
      {/* <SendGoldModal visible={showModalState} onClose={() => dispatch(hideModal())} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  walletCard: {
    backgroundColor: CustomTheme.colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  walletLabel: {
    color: CustomTheme.colors.black,
    fontSize: 16,
    marginBottom: 4,
  },
  goldAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: CustomTheme.colors.secondary,
    marginBottom: 12,
  },
  walletButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  walletButton: {
    flex: 1,
    backgroundColor: CustomTheme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  walletButtonText: {
    color: CustomTheme.colors.white,
    fontWeight: 'bold',
  },
});
