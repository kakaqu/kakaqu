import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';

export default function ProfileMenu({ navigation }) {
  return (
    <View style={styles.menuSection}>
      <ProfileButton icon="storefront-outline" label="Dükkana Git" onPress={() => navigation.navigate('MyShop')} />
      <ProfileButton icon="bar-chart-outline" label="Mağaza İstatistikleri" onPress={() => navigation.navigate('ShopStats')} />
      <ProfileButton icon="heart-outline" label="Favorilerim" onPress={() => navigation.navigate('Favorites')} />
      <ProfileButton icon="list-outline" label="İlanlarım" onPress={() => navigation.navigate('MyListings')} />
      <ProfileButton icon="cart-outline" label="Siparişlerim" onPress={() => navigation.navigate('MyOrders')} />
      <ProfileButton icon="settings-outline" label="Ayarlar" onPress={() => navigation.navigate('Settings')} />
      <ProfileButton icon="information-circle-outline" label="Yardım" onPress={() => navigation.navigate('Help')} />
      <View style={{ marginBottom: 48 }}>
        <ProfileButton icon="log-out-outline" label="Çıkış Yap" onPress={() => navigation.navigate('Logout')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuSection: {
    gap: 12,
  },
});
