import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function TopBar({
  navigation,
  context = 'products', // 'products', 'shops', 'conversations'
  hasUnreadNotifications = false,
}) {
  const handleSearchPress = () => {
    switch (context) {
      case 'products':
        navigation.navigate('SearchProducts');
        break;
      case 'shops':
        navigation.navigate('SearchShops');
        break;
      case 'conversations':
        navigation.navigate('SearchMessages');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <Text style={styles.logo}>BAZAAR</Text>

        <View style={styles.iconGroup}>
          {/* Arama */}
          <TouchableOpacity onPress={handleSearchPress} style={styles.icon}>
            <Ionicons name="search" size={22} color="#333" />
          </TouchableOpacity>

          {/* Detaylı Arama (sadece ürün sayfasında görünür) */}
          {context === 'products' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('AdvancedSearch')}
              style={styles.icon}
            >
              <Feather name="filter" size={20} color="#333" />
            </TouchableOpacity>
          )}

          {/* Bildirim */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={styles.icon}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={hasUnreadNotifications ? '#FE893C' : '#333'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 999,
    elevation: 5,
    paddingTop: Platform.OS === 'ios' ? 50 : Constants.statusBarHeight + 10,
    paddingBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  inner: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#01A89E',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    marginLeft: 16,
  },
});
