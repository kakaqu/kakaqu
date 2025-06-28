import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import CustomTheme from '../../../shared/styles/CustomThems';
import SendGoldModal from '../modals/SendGoldModal';


export default function WalletCard({ navigation, gold }) {
  const [showModal, setShowModal] = useState(false); // 🔁 modal açık mı?

  return (
    <View style={styles.walletCard}>
      <Text style={styles.walletLabel}>Cüzdanım</Text>
      <Text style={styles.goldAmount}>{gold} Altın</Text>

      <View style={styles.walletButtons}>
        <TouchableOpacity
          style={styles.walletButton}
          onPress={() => navigation.navigate('WalletHistory')}
        >
          <Ionicons name="list-outline" size={18} color={CustomTheme.colors.white} />
          <Text style={styles.walletButtonText}>Hareketler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.walletButton}
          onPress={() => setShowModal(true)} // 🔁 modal aç
        >
          <Feather name="send" size={18} color={CustomTheme.colors.white} />
          <Text style={styles.walletButtonText}>Altın Gönder</Text>
        </TouchableOpacity>
      </View>

      {/* 🔁 Modal bileşeni */}
      <SendGoldModal visible={showModal} onClose={() => setShowModal(false)} />
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
    color: CustomTheme.colors.primary,
    marginBottom: 12,
  },
  walletButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  walletButton: {
    flex: 1,
    backgroundColor: CustomTheme.colors.secondary,
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
