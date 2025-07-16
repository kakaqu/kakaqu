import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TopBar from '../../navigation/TopBar';
import styles from '../styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.user);

  const [data] = useState([
    'Ürün 1',
    'Ürün 2',
    'Ürün 3',
    'Örnek Ürün',
    'Demo Ürün',
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [dismissSearchOnScroll, setDismissSearchOnScroll] = useState(false);

  const handleSearch = (text) => {
    if (text === '') {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => item.toLowerCase().includes(text.toLowerCase()))
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TopBar
          title={t('BAZAAR')}
          showSearch
          onSearch={handleSearch}
          dismissSearchOnScroll={dismissSearchOnScroll}
          showAdvancedSearch
          onAdvancedSearchPress={() => Alert.alert(t('Detaylı Arama'))}
          showNotification
          onNotificationPress={() => Alert.alert(t('Bildirimler'))}
          showMoreOptions
          moreOptionsItems={[
            { label: t('Profil'), icon: 'person-circle-outline', value: 'profile' },
            { label: t('Ayarlar'), icon: 'settings-outline', value: 'settings' },
            { label: t('Yardım'), icon: 'help-circle-outline', value: 'help' },
          ]}
          onMoreOptionSelect={(item) =>
            Alert.alert(`${t('Seçilen seçenek')}: ${item.label}`)
          }
         // moreOptionsIcon="ellipsis-horizontal" // ekran özel ikon
        />


        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
          onScrollBeginDrag={() =>
            setDismissSearchOnScroll((prev) => !prev)
          }
          scrollEventThrottle={16}
        >
          <Text style={styles.heading}>{t('BAZAAR')}</Text>

          {isAuth && (
            <View style={localStyles.card}>
              <Text style={localStyles.title}>👤 {t('Kullanıcı Bilgileri')}</Text>
              <Text style={localStyles.label}>{t('Ad')}:</Text>
              <Text style={localStyles.value}>{user.name}</Text>
              <Text style={localStyles.label}>ID:</Text>
              <Text style={localStyles.value}>{user.id}</Text>
              <Text style={localStyles.label}>{t('Telefon')}:</Text>
              <Text style={localStyles.value}>{user.phoneNumber}</Text>
              <Text style={localStyles.label}>{t('Bakiye')}:</Text>
              <Text style={localStyles.value}>
                {user.walletBalance} {t('Altın')}
              </Text>
              <Text style={localStyles.label}>{t('Adres')}:</Text>
              <Text style={localStyles.value}>{user.address || '-'}</Text>
              <Text style={localStyles.label}>{t('Dil ID')}:</Text>
              <Text style={localStyles.value}>{user.languageId}</Text>
            </View>
          )}

          <View style={{ marginTop: 24 }}>
            <Text style={localStyles.title}>{t('Ürün Listesi')}</Text>
            {filteredData.length === 0 ? (
              <Text>{t('Arama sonucunda ürün bulunamadı.')}</Text>
            ) : (
              filteredData.map((item, idx) => (
                <Text key={idx} style={{ paddingVertical: 6 }}>
                  • {item}
                </Text>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    elevation: 4,
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
