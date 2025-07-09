import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';
import { useTranslation } from 'react-i18next';


export default function SendGoldTabs({ method, setMethod }) {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, method === 'qr' && styles.active]}
        onPress={() => setMethod('qr')}
      >
        <Text style={styles.text}>{t("sendGold.method_qr")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, method === 'phone' && styles.active]}
        onPress={() => setMethod('phone')}
      >
        <Text style={styles.text}>{t("sendGold.method_phone")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 12, gap: 12 },
  tab: {
    flex: 1,
    backgroundColor: CustomTheme.colors.lightGray,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  active: {
    backgroundColor: CustomTheme.colors.secondary,
  },
  text: {
    color: CustomTheme.colors.white,
    fontWeight: 'bold',
  },
});
