import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import TopBar from '../../navigation/TopBar';
import styles from '../styles/HomeScreenStyles'; // mevcut genel stiller

export default function HomeScreen({ navigation }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
  }, [isAuth, user]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} context="products" hasUnreadNotifications={true} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.body}>
          <Text style={styles.heading}>Ana Sayfa</Text>

          {isAuth && (
            <View style={localStyles.card}>
              <Text style={localStyles.title}>👤 Kullanıcı Bilgileri</Text>

              <Text style={localStyles.label}>Ad:</Text>
              <Text style={localStyles.value}>{user.name}</Text>
              <Text style={localStyles.label}>ID:</Text>
              <Text style={localStyles.value}>{user.id}</Text>

              <Text style={localStyles.label}>Telefon:</Text>
              <Text style={localStyles.value}>{user.phoneNumber}</Text>

              <Text style={localStyles.label}>Bakiye:</Text>
              <Text style={localStyles.value}>{user.walletBalance} Altın</Text>

              <Text style={localStyles.label}>Adres:</Text>
              <Text style={localStyles.value}>{isAuth}</Text>

              <Text style={localStyles.label}>Dil ID:</Text>
              <Text style={localStyles.value}>{user.languageId}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ✅ CSS benzeri local stil dosyası bu sayfanın sonunda tanımlandı
const localStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, // Android için gölge
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#111',
  },
});
