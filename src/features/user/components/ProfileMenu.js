import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/slices/authSlice';
import { resetUser } from '../slices/userSlice';




export default function ProfileMenu({ navigation }) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const shop = useSelector(state => state.shop);

  const handleLogout = () => {
    dispatch(logout());      
    dispatch(resetUser());  
  };

  const handleGoToShop = () => {
    if (shop?.id) {
      navigation.navigate('ShopDashboard');
    } else {
      navigation.navigate('AddShop');
    }
  };

  return (
    <View style={styles.menuSection}>
    <ProfileButton icon="storefront-outline" label={t("profileMenu.goToShop")} onPress={handleGoToShop} />
    <ProfileButton icon="bar-chart-outline" label={t("profileMenu.shopStats")} onPress={() => navigation.navigate('ShopStats')} />
    <ProfileButton icon="heart-outline" label={t("profileMenu.favorites")} onPress={() => navigation.navigate('Favorites')} />
    <ProfileButton icon="list-outline" label={t("profileMenu.myListings")} onPress={() => navigation.navigate('MyListings')} />
    <ProfileButton icon="cart-outline" label={t("profileMenu.myOrders")} onPress={() => navigation.navigate('MyOrders')} />
    <ProfileButton icon="settings-outline" label={t("profileMenu.settings")} onPress={() => navigation.navigate('Settings')} />
    <ProfileButton icon="information-circle-outline" label={t("profileMenu.help")} onPress={() => navigation.navigate('Help')} />
    <View style={{ marginBottom: 48 }}>
      <ProfileButton icon="log-out-outline" label={t("profileMenu.logout")} onPress={handleLogout} />
    </View>
  </View>

  );
}

const styles = StyleSheet.create({
  menuSection: {
    gap: 12,
  },
});
