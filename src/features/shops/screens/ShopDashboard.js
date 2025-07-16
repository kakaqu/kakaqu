import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ShopDashboard = ({ navigation }) => {
  const { t } = useTranslation();
  const shop = useSelector(state => state.shop);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t('shop_dashboard.title')}</Text>

      <View style={styles.shopCard}>
        {shop.avatar ? (
          <Image source={{ uri: shop.avatar }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>{shop.name?.[0] || '?'}</Text>
          </View>
        )}

        <Text style={styles.shopName}>{shop.name}</Text>
        <Text style={styles.shopDescription}>{shop.description}</Text>
      </View>

      <View style={styles.menu}>
        <DashboardButton
          title={t('shop_dashboard.add_product')}
          onPress={() => navigation.navigate('AddProduct')}
        />
        <DashboardButton
          title={t('shop_dashboard.orders')}
          onPress={() => navigation.navigate('Orders')}
        />
        <DashboardButton
          title={t('shop_dashboard.notifications')}
          onPress={() => navigation.navigate('Notifications')}
        />
        <DashboardButton
          title={t('shop_dashboard.settings')}
          onPress={() => navigation.navigate('ShopSettings')}
        />
      </View>
    </ScrollView>
  );
};

const DashboardButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  shopCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    color: '#fff',
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  shopDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  menu: {
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ShopDashboard;
