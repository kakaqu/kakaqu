import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function CircularQrGenerator({ value, logo }) {
  return (
    <View style={styles.qrWrapper}>
      <QRCode
        value={value}
        size={220}
        color="#2B70E4"
        backgroundColor="white"
        logo={logo}
        logoSize={64}
        logoBackgroundColor="white"
        logoBorderRadius={32}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  qrWrapper: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
});
